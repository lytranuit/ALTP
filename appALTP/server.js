
var mysql = require('mysql');
var http = require('http');
var port = process.env.PORT || 8080;
var express = require('express')
        , app = express();
var path = require('path');
//connect mysql
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ALTP"
});
connection.connect(function (e) {
    if (e)
        console.log(e);
});
//create server 
var server = http.createServer(app);
server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

const io = require('socket.io')(server);

// routing
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});
app.get('/user', function (req, res) {
    res.sendfile(__dirname + '/public/user.html');
});

var status = 'wait';
var master = "tran";
var users = [];
var players = [];
var current_question;
var correct_answer;
var question, sttquestion;
var A, B, C, D;
var timer;
var count;
var questions = [];
var help = {"trogiup50": "trogiup50", "khangia": "khangia", "goidt": "goidt"};
io.on('connection', function (client) {
    console.log("New client !");
    client.on('register', function (data) {
        connection.query("select * from user where username='" + data.user + "'", function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (rows.length != 0) {
                    client.emit('fail register');
                } else {
                    connection.query("INSERT INTO user VALUES (NULL, '" + data.user + "', '" + data.pass + "', 'nguoixem')");
                    client.emit('success register');
                }
            }
        });
    });
    client.on('login', function (data) {
        if (!using(users, data.user)) {
            connection.query("select * from user where username='" + data.user + "' and password='" + data.pass + "'", function (err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    if (rows.length != 0) {
                        client.emit('success login', {user: rows[0].username, level: rows[0].level});
                    } else {
                        client.emit('fail login');
                    }
                }
            });
        } else {
            client.emit('user using');
        }
    });
    client.on('add user', function (data) {
        //add user vao socket session
        if (data.level == 'giamkhao') {
            master = data.user;
            console.log(master + " Connect master game");
            client.join('master');
        } else if (using(players, data.user)) {
            data.level = 'nguoichoi';
            client.join('nguoichoi');
        } else {
            data.level = 'nguoixem';
        }
        var user = new Object();
        user.user = data.user;
        user.socket = client.id;
        user.level = data.level;
        users.push(user);
        client.emit('list user', {users: users});
        client.emit('level', {level: user.level});
        client.emit('status', {status: status});
        client.broadcast.emit('add user', {user: user.user, level: user.level});
        console.log(user.user + " Connect");
        if (status == 'chon user' || status == 'in game') {
            client.emit('question', {sttquestion: sttquestion, question: question, A: A, B: B, C: C, D: D});
            client.emit('help', {help: help});
            if (data.level == 'nguoichoi') {
                client.emit('nguoichoi');
                client.emit('help nguoichoi');
            }
        }
    });

    client.on('join game', function (data) {
        if (status == 'wait') {
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.user == data.user) {
                    user.level = 'nguoichoi';
                    client.join('nguoichoi');
                    client.emit('level', {level: user.level});
                    client.emit('status', {status: status});
                    io.emit('add user', {user: user.user, level: user.level});
                    break;
                }
            }
            var player = new Object();
            player.user = data.user;
            player.answer = '';
            player.timer = 0;
            players.push(player);
        }
    });
    client.on('leave nguoichoi', function (data) {
        client.leave('nguoichoi');
        client.emit('level', {level: data.level});
        io.emit('add user', {user: data.user, level: data.level});
    });
    client.on('start game', function () {
        if (players.length != 0) {
            status = 'load game';
            io.emit('status', {status: status});
            count = 10;
            timer = setInterval(function () {
                count--;
                io.emit('timer', {timer: count});
                if (count <= 0) {
                    clearInterval(timer);
                    client.emit('begin');
                }
            }, 1000);
        } else {
            client.emit('no player');
        }
    });
    client.on('chon user', function () {
        status = 'chon user';
        io.emit('status', {status: status});
        connection.query("select * from question where level = 0", function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                var length = rows.length;
                selector = getRandomInt(0, length - 1);
                current_question = 0;
                correct_answer = rows[selector].correct;
                question = rows[selector].question;
                questions.push(rows[selector].id);
                sttquestion = 0;
                A = rows[selector].answer1;
                B = rows[selector].answer2;
                C = rows[selector].answer3;
                D = rows[selector].answer4;
                io.emit('question', {sttquestion: sttquestion, question: question, A: A, B: B, C: C, D: D});
                io.to('nguoichoi').emit('nguoichoi');
            }
        });
        count = 0;
        timer = setInterval(function () {
            count++;
            io.emit('timer', {timer: count});
            if (count >= 100) {
                clearInterval(timer);
                //client.emit('begin');
                io.emit('player sorce', {players: players});
                var minsorce = 100;
                var minplayer = null;
                for (i = 0; i < players.length; i++) {
                    var player = players[i];
                    if (player.answer == correct_answer && player.timer < minsorce) {
                        minsorce = player.timer;
                        minplayer = player;
                    }
                }
                if (minplayer != null) {
                    players = [];
                    players.push(minplayer);
                    io.emit('player select', {player: minplayer});
                } else {
                    players = [];
                    status = 'wait';
                    io.emit('end game');
                }
            }
        }, 100);
    });
    client.on('start', function () {
        status = 'load game';
        io.emit('status', {status: status});
        count = 10;
        timer = setInterval(function () {
            io.emit('timer', {timer: count});
            count--;
            if (count <= 0) {
                clearInterval(timer);
                status = 'in game';
                io.emit('status', {status: status});
                io.to('master').emit('next question');
            }
        }, 1000);

    });
    client.on('answer', function (data) {
        if (status == 'chon user') {
            for (i = 0; i < players.length; i++) {
                var player = players[i];
                if (player.user == data.user) {
                    player.answer = data.answer;
                    player.timer = count;
                    break;
                }
            }
        } else {
            clearInterval(timer);
            client.broadcast.emit('user select', {answer: data.answer});
            setTimeout(function () {
                if (correct_answer == data.answer) {
                    io.emit('success', {correct_answer: correct_answer});
                } else {
                    io.emit('fail', {correct_answer: correct_answer});
                }
                setTimeout(function () {
                    io.emit('clear timer');
                    client.emit('correct answer', {correct_answer: correct_answer});
                }, 3000);
            }, 3000);
        }
    });
    client.on('next question', function () {
        if (sttquestion == 15) {
            var sorce = '120.000.000'
            players = [];
            status = 'wait';
            io.emit('winner', {sorce: sorce});
        } else {
            next_question();
        }
    });
    client.on('fail', function () {
        var sorce;
        if (sttquestion >= 1 && sttquestion < 5) {
            sorce = '0';
        } else if (sttquestion >= 5 && sttquestion < 10) {
            sorce = '1.000.000';
        } else {
            sorce = '15.000.000';
        }
        players = [];
        status = 'wait';
        io.emit('end', {sorce: sorce});
    });
    client.on('trogiup50', function (data) {
        if (status == 'in game') {
            clearInterval(timer);
            delete help["trogiup50"];
            io.emit('help', {help: help});
            var array = ["A", "B", "C", "D"];
            var array_random = [];
            var c = 0;
            while (c < 2) {
                var r = getRandomInt(0, 3);
                if (array[r] != correct_answer && array[r] != null) {
                    array_random[c] = array[r];
                    delete array[r];
                    c++;
                }
            }
            io.emit('trogiup50', {array_random: array_random});
            hetgio();
        }
    });
    client.on('khangia', function (data) {
        if (status == 'in game') {
            delete help["khangia"];
            io.emit('help', {help: help});
        }
    });
    client.on('goidt', function (data) {
        if (status == 'in game') {
            delete help["goidt"];
            io.emit('help', {help: help});
        }
    });
    client.on('stop game', function (data) {
        var sorce;
        switch (sttquestion) {
            case 1:
                sorce = '0';
                break;
            case 2:
                sorce = '100.000';
                break;
            case 3:
                sorce = '200.000';
                break;
            case 4:
                sorce = '300.000';
                break;
            case 5:
                sorce = '500.000';
                break;
            case 6:
                sorce = '1.000.000';
                break;
            case 7:
                sorce = '2.000.000';
                break;
            case 8:
                sorce = '3.000.000';
                break;
            case 9:
                sorce = '6.000.000';
                break;
            case 10:
                sorce = '9.000.000';
                break;
            case 11:
                sorce = '15.000.000';
                break;
            case 12:
                sorce = '25.000.000';
                break;
            case 13:
                sorce = '35.000.000';
                break;
            case 14:
                sorce = '50.000.000';
                break;
            case 15:
                sorce = '80.000.000';
                break;
        }
        clearInterval(timer);
        players = [];
        status = 'wait';
        io.emit('end', {sorce: sorce});
    });
    client.on('disconnect', function () {
        console.log("Disconect");
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user.socket == client.id) {
                users.splice(i, 1);
                client.broadcast.emit('user left', {user: user.user});
                break;
            }
        }
    });
    client.on('reconnecting', function (data) {
        console.log("reconnecting");
    });
    client.on('reconnect', function (data) {
        console.log('reconnect');
    });
});
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function using(array, user) {
    var re = false;
    for (var i = 0; i < array.length; i++) {
        var a = array[i];
        if (a.user == user) {
            re = true;
            break;
        } else {
            re = false;
        }
    }
    return re;
}
function next_question() {
    io.emit('reset answer');
    var level_question = 1;
    sttquestion++;
    if (sttquestion >= 1 && sttquestion <= 5) {
        level_question = 1;
    } else if (sttquestion > 5 && sttquestion <= 10) {
        level_question = 2;
    } else {
        level_question = 3;
    }
    var select_question = "select * from question where level=" + level_question + un_question();
    connection.query(select_question, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            var length = rows.length;
            selector = getRandomInt(0, length - 1);
            current_question = 0;
            correct_answer = rows[selector].correct;
            question = rows[selector].question;
            questions.push(rows[selector].id);
            A = rows[selector].answer1;
            B = rows[selector].answer2;
            C = rows[selector].answer3;
            D = rows[selector].answer4;
            io.emit('question', {sttquestion: sttquestion, question: question, A: A, B: B, C: C, D: D});
            io.to('nguoichoi').emit('nguoichoi');
            io.to('nguoichoi').emit('help nguoichoi');
            io.to('master').emit('correct', {correct_answer: correct_answer});
        }
    });
    hetgio();

}
function un_question() {
    var re = '';
    for (var i = 0; i < questions.length; i++) {
        re += (' and id<>' + questions[i]);
    }
    return re;
}
function hetgio() {
    count = 10;
    timer = setInterval(function () {
        io.emit('timer', {timer: count});
        count--;
        if (count <= 0) {
            clearInterval(timer);
            setTimeout(function () {
                io.emit('fail', {correct_answer: correct_answer});
                setTimeout(function () {
                    io.emit('clear timer');
                    io.to('nguoichoi').emit('correct answer', {correct_answer: correct_answer});
                }, 3000);
            }, 3000);
        }
    }, 1000);
}