// File: seed.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const questionsSource = [
  {
    q: "Lớp nào trong Java được sử dụng để tạo Server TCP?",
    opts: ["Socket", "ServerSocket", "DatagramSocket", "Server"],
    ans: 1 // ServerSocket
  },
  {
    q: "Phương thức nào của ServerSocket dùng để lắng nghe kết nối từ Client?",
    opts: ["listen()", "connect()", "accept()", "bind()"],
    ans: 2 // accept()
  },
  {
    q: "Giao thức TCP là giao thức thuộc tầng nào trong mô hình OSI?",
    opts: ["Tầng Ứng dụng", "Tầng Giao vận (Transport)", "Tầng Mạng", "Tầng Liên kết dữ liệu"],
    ans: 1 // Transport
  },
  {
    q: "Đặc điểm chính của giao thức UDP là gì?",
    opts: ["Hướng kết nối, tin cậy", "Không hướng kết nối, không tin cậy", "Hướng kết nối, không tin cậy", "Chỉ dùng cho truyền file"],
    ans: 1 // Không hướng kết nối...
  },
  {
    q: "Cổng (Port) mặc định của giao thức HTTP là bao nhiêu?",
    opts: ["8080", "21", "443", "80"],
    ans: 3 // 80
  },
  {
    q: "Địa chỉ IP Loopback (Localhost) IPv4 là gì?",
    opts: ["192.168.1.1", "127.0.0.1", "0.0.0.0", "255.255.255.0"],
    ans: 1 // 127.0.0.1
  },
  {
    q: "Lớp nào dùng để gửi gói tin UDP trong Java?",
    opts: ["DatagramPacket", "DatagramSocket", "UDPPacket", "SocketPacket"],
    ans: 0 // DatagramPacket
  },
  {
    q: "Để luồng chính (Main Thread) không bị chặn khi xử lý giao diện, ta nên dùng?",
    opts: ["Thread.sleep()", "Đa luồng (Multi-threading)", "Vòng lặp while(true)", "Gọi hàm đệ quy"],
    ans: 1 // Đa luồng
  },
  {
    q: "Phương thức getInputStream() của đối tượng Socket dùng để làm gì?",
    opts: ["Gửi dữ liệu đi", "Nhận dữ liệu về", "Đóng kết nối", "Kiểm tra lỗi"],
    ans: 1 // Nhận dữ liệu về
  },
  {
    q: "Trong mô hình Client-Server, ai là người chủ động mở kết nối?",
    opts: ["Server", "Client", "Cả hai cùng lúc", "Không ai cả"],
    ans: 1 // Client
  },
  {
    q: "DNS là viết tắt của?",
    opts: ["Domain Name System", "Data Network Service", "Dynamic Network System", "Direct Name Server"],
    ans: 0
  },
  {
    q: "Cổng 443 thường được sử dụng cho giao thức nào?",
    opts: ["FTP", "HTTP", "HTTPS", "SSH"],
    ans: 2
  },
  {
    q: "Lệnh nào trong Java dùng để đóng kết nối Socket?",
    opts: ["exit()", "stop()", "close()", "terminate()"],
    ans: 2
  },
  {
    q: "Giao thức nào dùng để truyền tải file tin cậy?",
    opts: ["UDP", "FTP", "ICMP", "DHCP"],
    ans: 1
  },
  {
    q: "Để xác định một tiến trình trên mạng, ta cần cặp thông tin nào?",
    opts: ["IP và MAC", "IP và Port", "MAC và Port", "Tên miền và IP"],
    ans: 1
  },
  {
    q: "Constructor `new Socket('localhost', 9999)` sẽ thực hiện hành động gì?",
    opts: ["Tạo Server lắng nghe cổng 9999", "Gửi dữ liệu tới cổng 9999", "Yêu cầu kết nối tới Server tại cổng 9999", "Kiểm tra cổng 9999 có mở không"],
    ans: 2
  },
  {
    q: "Khi phương thức `read()` của InputStream trả về -1, điều đó có nghĩa là gì?",
    opts: ["Đã nhận được 1 byte", "Kết nối đã bị đóng (End of Stream)", "Lỗi mạng", "Dữ liệu đang chờ"],
    ans: 1
  },
  {
    q: "Trong Java, để bọc (wrap) một InputStream để đọc theo dòng, ta dùng lớp nào?",
    opts: ["FileReader", "BufferedReader", "ObjectInputStream", "DataInputStream"],
    ans: 1
  },
  {
    q: "Mô hình OSI có bao nhiêu tầng?",
    opts: ["4", "5", "6", "7"],
    ans: 3
  },
  {
    q: "Lớp InetAddress trong Java dùng để làm gì?",
    opts: ["Đại diện cho địa chỉ IP (Hostname/IP)", "Tạo kết nối TCP", "Gửi gói tin UDP", "Quản lý URL"],
    ans: 0
  },
  {
    q: "Trong kiến trúc TCP Server đa luồng, mỗi Client kết nối tới sẽ được xử lý bởi?",
    opts: ["Một tiến trình mới", "Một luồng (Thread) riêng biệt", "Luồng chính (Main Thread)", "Hệ điều hành"],
    ans: 1
  },
  {
    q: "Giao thức ICMP thường được dùng trong lệnh nào?",
    opts: ["telnet", "ping", "ftp", "ssh"],
    ans: 1
  },
  {
    q: "PrintWriter trong Java có tác dụng gì khi làm việc với Socket?",
    opts: ["Gửi dữ liệu dạng văn bản (Text) tiện lợi", "Gửi dữ liệu nhị phân", "Mã hóa dữ liệu", "Nén dữ liệu"],
    ans: 0
  },
  {
    q: "Để gửi một đối tượng (Object) qua mạng trong Java, đối tượng đó phải implements interface nào?",
    opts: ["Runnable", "Cloneable", "Serializable", "Comparable"],
    ans: 2
  },
  {
    q: "Hàm `accept()` của ServerSocket có đặc điểm gì?",
    opts: ["Không chặn (Non-blocking)", "Chặn (Blocking) cho đến khi có Client kết nối", "Trả về null nếu không có ai kết nối", "Tự động ngắt sau 5s"],
    ans: 1
  },
  {
    q: "Địa chỉ IPv4 có độ dài bao nhiêu bit?",
    opts: ["16 bit", "32 bit", "64 bit", "128 bit"],
    ans: 1
  },
  {
    q: "URL là viết tắt của?",
    opts: ["Universal Resource Locator", "Uniform Resource Locator", "Unified Resource Link", "Uniform Reference Link"],
    ans: 1
  },
  {
    q: "Socket ngoại lệ `ConnectException` thường xảy ra khi nào?",
    opts: ["Server từ chối kết nối (hoặc chưa chạy)", "Mạng bị ngắt", "Sai định dạng dữ liệu", "Hết bộ nhớ"],
    ans: 0
  },
  {
    q: "Giao thức tầng ứng dụng nào dùng để gửi email?",
    opts: ["POP3", "IMAP", "SMTP", "Cả 3 đều liên quan (gửi/nhận)"],
    ans: 3
  },
  {
    q: "Trong Java, Thread.start() dùng để làm gì?",
    opts: ["Chạy ngay lập tức mã trong run()", "Khởi tạo tài nguyên và gọi run() trong một luồng mới", "Tạm dừng luồng", "Kiểm tra trạng thái luồng"],
    ans: 1
  }
];

async function main() {
  console.log(">>> Đang bắt đầu khởi tạo dữ liệu (Seeding)...");
  const s1 = await prisma.student.upsert({
    where: { studentCode: '23IT109' },
    update: {},
    create: {
      studentCode: '23IT109',
      fullName: 'Trần Quang Huy',
      classParams: '23SE2'
    },
  });

  const s2 = await prisma.student.upsert({
    where: { studentCode: '23IT102' },
    update: {},
    create: {
      studentCode: '23IT102',
      fullName: 'lê Nhật Huy',
      classParams: '23SE2'
    },
  });

  const s3 = await prisma.student.upsert({
    where: { studentCode: '23IT264' },
    update: {},
    create: {
      studentCode: '23IT264',
      fullName: 'Trần Kim Thịnh',
      classParams: '23SE1'
    },
  });

  const s4 = await prisma.student.upsert({
    where: { studentCode: '1' },
    update: {},
    create: {
      studentCode: '1',
      fullName: 'a',
      classParams: 'c'
    },
  });


  // 2. Tạo Bộ đề thi
  const quizTitle = "Giữa Kỳ 2025-2026";
  
  // Kiểm tra xem đề đã tồn tại chưa để tránh tạo trùng
  let quiz = await prisma.quiz.findFirst({
    where: { title: quizTitle }
  });

  if (!quiz) {
    quiz = await prisma.quiz.create({
      data: {
        title: quizTitle,
        subject: "Lập Trình Mạng",
        timeLimit: 45 // 45 phút
      }
    });
    console.log(`✅ Đã tạo bộ đề mới: ${quizTitle} (ID: ${quiz.id})`);
  } else {
    console.log(`ℹ️ Bộ đề "${quizTitle}" đã tồn tại (ID: ${quiz.id}). Sẽ thêm câu hỏi vào đây.`);
  }

  // 3. Thêm 30 câu hỏi vào bộ đề
  let count = 0;
  for (const item of questionsSource) {
    // Kiểm tra xem câu hỏi này đã có trong bộ đề chưa (tránh duplicate khi chạy seed nhiều lần)
    const exist = await prisma.question.findFirst({
        where: {
            quizId: quiz.id,
            questionText: item.q
        }
    });

    if (!exist) {
        await prisma.question.create({
          data: {
            questionText: item.q,
            options: JSON.stringify(item.opts), // Prisma schema của bạn lưu options dạng String (JSON)
            correctAnswerIndex: item.ans,
            quizId: quiz.id
          }
        });
        count++;
    }
  }

  console.log(`✅ Đã thêm thành công ${count} câu hỏi vào bộ đề "${quizTitle}".`);
}

main()
  .catch((e) => {
    console.error("❌ Có lỗi xảy ra:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });