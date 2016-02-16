-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2014 at 11:59 AM
-- Server version: 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `altp`
--

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE IF NOT EXISTS `question` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `question` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `answer1` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `answer2` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `answer3` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `answer4` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `level` int(255) NOT NULL,
  `correct` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=45 ;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `question`, `answer1`, `answer2`, `answer3`, `answer4`, `level`, `correct`) VALUES
(1, 'Hệ điệu hành nào sau đây là hệ điều hành mã nguồn mở ', 'Linux', 'Windown XP', 'Windown 7', 'Window 8', 1, 'A'),
(2, 'Access là gì?', 'Là phần cứng ', 'Là hệ QTCSDL do hãng Mcrosoft sản xuất', 'Là phần mềm ứng dụng', 'Là phần mềm công cụ', 1, 'B'),
(3, 'Trong các mạng sau đây mạng nào thể hiện rộng nhất?', 'WPAN', 'WLAN', 'WAN', 'WMAN', 1, 'D'),
(4, 'Mạng không dây được chia ra làm máy loại chính?', '5', '1', '2', '4', 2, 'C'),
(5, 'Mạng wifi được hấp thụ bởi yếu tố nào sau đây?', 'Nước ', 'Nước,không khí', 'Nước,kim loai', 'Cơ thể người , không khí', 1, 'C'),
(6, 'Trong PHP để in ra dòng chữ “Hello word” dùng lệnh gì ?', 'Cout<<”Hello word “;', 'Echo ”Hello word”;', 'Cin>>Hello word ;', 'System.out.printf(“Hello word”);', 1, 'B'),
(7, 'Trong Ajax khi server trả lời về thì định dạng file nào sẽ được gởi cho Ajax bên client?', 'XML,text', 'Word,text', 'Word ,XML.', 'Excel ,XML', 1, 'A'),
(8, 'Có địa chỉ IP là 192.168.1.0 để chia ip trên thành 6 mạng con thì tốt nhất nên mượn máy bit?', '6', '3', '4', '5', 1, 'B'),
(9, 'Lập trình hướng đối tượng có những đặt điểm nào nổi bật nhất?', 'Đa hình, đóng gói, kế thừa', 'Đóng gói,đa hình', 'Đa hình ,kế thừa', 'Đóng gói, đa hình.', 1, 'A'),
(10, 'Điền vào chỗ trống “ trong lập trình java không có khái niệm …… “?', 'Đóng gói.', 'Kế thừa.', 'Đa hình.', 'Con trỏ.', 2, 'D'),
(11, 'Trong dãy IP 192.168.1.0-192.168.1.255 thì router tốt nhất nên dùng địa chỉ nào sau đây?', '192.168.1.1.', '192.168.1.0.', '192.168.1.2.', '192.168.1.3.', 1, 'A'),
(12, '“Có thể dùng trùng tên của các phương thức cùng 1 class hay khác class “ biểu hiện khái niệm nào sau đây ?', 'Kế thừa.', 'Đa hình.', 'Đóng gói.', 'Không có đáp án đúng', 1, 'B'),
(13, 'Giao thức ARP dùng làm gì?', 'Phân giả IP sang đại chỉ MAC.', 'Phân giải địa chỉ MAC sang IP.', 'Phân giải tên miền.', 'Cấp phát IP.', 1, 'A'),
(14, 'Trong tấn công DOS attacker dùng giao thức nào?', 'telnet.', 'Tcp.', 'Udp.', 'http.', 1, 'C'),
(15, 'Giao thức TCP, UDP ở tầng nào trong mô hình TCP/IP?', 'Network.', 'Data link', 'Transport.', 'Application.', 1, 'C'),
(16, 'DNS chạy ở port nào sau đây?', '110', '80', '21', '53', 1, 'D'),
(17, 'Khi dữ liệu xuống tầng data link thì đơn vị dữ liệu là?', 'Packet.', 'Bit', 'Byte.', 'Frame.', 1, 'D'),
(18, 'Có máy loại DNS?', '3', '1', '2', '4', 1, 'C'),
(19, 'HUB và Switch nằm ở tầng nào?', 'Data link', 'Transport', 'Application', 'Network.', 1, 'A'),
(20, 'Cách thức tấn công nào sau đây sử dụng IP fracment?', 'DOS.', 'Ping of death', 'Giả mạo ARP request.', 'TCP syn flood', 1, 'B'),
(21, 'Sắp xếp hệ điều hành sau theo thời gian phát triển', 'Window xp.', 'Window 98.', 'Window 8.', 'Window 7', 0, 'BADC'),
(22, 'Sắp xếp các mạng sau sắp xếp từ mạng nhỏ đến lớn.', 'WAN', 'WPAN.', 'WLAN', 'WMAN.', 0, 'BCDA'),
(23, 'Trong song điện từ  ta có định nghĩa “ Bước sóng càng …. Thì đi ….. và đi …. Càng ….. hơn” điều vào theo thứ tự', 'Xuyên.', 'Vòng.', 'Dài.', 'Tốt.', 0, 'CBAD'),
(24, 'Trong mô hình tcp/ip theo thứ tự từ trên xuống là : ', 'Internet.', 'Transport.', 'Application.', 'Data link.', 0, 'CBAD'),
(25, 'API có nghĩa là gì .', 'Là một ngôn ngữ lập trình.', 'Là một giao diện.', 'Là một giao diện lập trình ứng dụng.', 'Là tên một giao thức.', 2, 'C'),
(26, 'DNS sử dụng giao thứ nào .', 'TCP.', 'UDP.', 'SMTP.', 'HTTP.', 2, 'B'),
(27, 'Thiết bị HUB nằm ở tầng nào trong mô hình OSI', 'Transport.', 'Data link.', 'Network.', 'Application.', 2, 'B'),
(28, 'Trong tầng Data link các gói tin truyền như thế nào.', 'Đơn vị dữ liệu là bit ,truyền giữa các host –to-host.', 'Đơn vị dữ liệu là packet, truyền giữa host-to-host.', 'Đơn vị dữ liệu là frame ,truyền giữa các host-to-host', 'Đơn vị dữ liệu là data,truyền giữa host-to-host.', 2, 'C'),
(29, 'Giao thức ARP và RARP nằm ở tầng nào trong mô hình OSI.', 'Data link.', 'Physical.', 'Network.', 'Application.', 2, 'B'),
(30, 'Thiết bị nào sau đây có chức năng định tuyến.', 'HUB.', 'Switch', 'Router.', 'Modem.', 2, 'C'),
(31, 'Địa chỉ IP nào sau đây thuộc lớp C.', '10.0.0.5', '127.10.0.3', '127.0.0.1', '192.168.100.3', 2, 'D'),
(32, 'Với địa chỉ ip 192.168.1.0 /24, để chia thành 4 mạng con thì mượn bao nhiêu bít , và mỗi mạng con có bao nhiêu địa chỉ dùng host.', '1 bit,62 địa chỉ.', '2 bit ,62 địa chỉ', '3 bit, 62 địa chỉ.', '4 bit , 62 dịa chỉ.', 2, 'B'),
(33, 'Mạng di động là ví dụ của mạng  nào sau đây.', 'WAN', 'WPAN', 'WLAN', 'WMAN.', 2, 'A'),
(34, 'Đài AM có bang thông và tầng số như thế nào.', 'Băng thông cao, tầng số cao.', 'Băng thông cao , tầng số thấp', 'Băng thông thấp , tầng số thấp', 'Băng thông thấp , tầng số cao', 2, 'C'),
(35, 'Vì sao FM có chất lượng tốt nhưng phạm vi phủ  song lại kém hơn AM.', 'Băng thông cao hơn AM,tầng số thấp hơn AM,bước song ngắn hơn AM.', 'Băng thông thâp hơn AM,tầng số thấp hơn AM,bước sóng dài hơn AM.', 'Băng thông cao hơn AM,tầng số thấp cao AM,bước sóng ngắn hơn AM.', 'Băng thông cao hơn AM,tầng số cao hơn AM,bước sóng cao hơn AM.', 3, 'C'),
(36, 'Trong kiểu tấn công TCP syn flood thì gói fin sẽ được gởi khi nào.', 'Khi kết thúc quá trình tấn công.', 'Ngay khi gói syn đầu tiên được gởi.', 'Không bao giờ gởi ra gói fin.', 'Cứ mỗi gói fin được gỏi ra khi gói syn được gỏi ra.', 3, 'C'),
(37, 'Trong wifi vì sao 802.11g lại phát triển.', 'Vì nó tương thức với 802.11a.', 'Vì nó tương thức với 802.11b.', 'Vì nó tương thức với 802.11c.', 'Vì nó tương thức với 802.11n.', 3, 'B'),
(38, 'Trong blutouth ở dạng tầng số bao nhiêu là đúng nhất.', '200hz.', '100hz.', '300hz.', 'Tầng số luôn nhảy.', 3, 'D'),
(39, 'Đặt điểm nào sau đây không thuộc mô hình client-sever.', 'Dễ quản lý.', 'Có 1 điểm chết thì cả hệ thống đều die.', 'Các ap phát triển nên dùng môn hình client –sever.', 'Nặng và tốn chi phí.', 3, 'C'),
(40, 'Đơn vị truyền dữ liệu tầng physical là gì .', 'Data.', 'Bit.', 'Packet.', 'Frame.', 3, 'B'),
(41, 'Đơn vị truyền dữ liệu tầng data link là gì ?', 'Data.', 'Bit', 'Packet.', 'Frame', 3, 'D'),
(42, 'Đơn vị dữ  liệu tầng network là gì ?', 'Data.', 'Bit.', 'Packet.', 'Frame', 3, 'C'),
(43, 'Bluetouth có máy loại .', '1', '2', '3', '4', 3, 'B'),
(44, 'Loại piconet trong bluetouth có bào nhiêu slaver.', '5', '6', '7', '8', 3, 'C');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `level` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `level`) VALUES
(1, 'tran', 'tran', 'giamkhao'),
(2, 'lytran', 'lytran', 'nguoixem'),
(3, 'vohinhca', 'vohinhca', 'nguoixem'),
(4, 'altp', 'altp', 'nguoixem'),
(5, 'daolytran', 'daolytran', 'nguoixem');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
