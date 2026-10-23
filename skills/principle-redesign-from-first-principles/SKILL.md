---
name: principle-redesign-from-first-principles
description: "Áp dụng khi đưa một yêu cầu mới vào quy trình kế toán đang chạy, như văn bản mới về hóa đơn điện tử, chuyển chế độ kế toán sang TT99, hay một loại thuế mới. Thiết kế lại như thể yêu cầu đó có từ ngày đầu, không vá thêm vào."
disable-model-invocation: true
---

# Thiết kế lại từ gốc

Khi đưa một thay đổi vào, đừng vá nó lên quy trình cũ. Thiết kế lại như thể yêu cầu đó đã có từ đầu.

**Vì sao:** Một quy định mới vá thêm thành một cột phụ, một bước làm tay, một ghi chú "từ kỳ này nhớ làm thêm". Sau vài kỳ không ai nhớ vì sao có nó, và kỳ so sánh không còn cùng cơ sở với kỳ hiện tại.

- Đọc toàn bộ phần bị ảnh hưởng và hiểu quy trình hiện tại. Hệ thống tài khoản, bảng ánh xạ, mẫu Excel, mẫu nhập Smart Pro, playbook, thuyết minh BCTC.
- Hỏi "nếu dựng quy trình này từ đầu với yêu cầu mới, ta sẽ làm gì?". Ví dụ một quy định mới về hóa đơn điện tử không phải là thêm một cột kiểm trên bảng kê. Nó có thể đổi cách nhận hóa đơn, khóa đối chiếu và thời điểm ghi nhận.
- Lan thay đổi tới mọi nơi tham chiếu. Bảng ánh xạ tài khoản, số liệu kỳ so sánh, thuyết minh, mẫu Excel, playbook và các ví dụ trong đó.
- Nghĩ trọn thiết kế mới, rồi giao từng phần theo thứ tự đối chiếu được.

Văn bản pháp luật dùng làm căn cứ phải ghi số hiệu, ngày hiệu lực và nguồn đã đọc. Chưa đối chiếu được thì ghi `[chưa xác minh]` và dừng ở bản đề xuất.

Đây là cách giữ cho các lựa chọn sau còn mở khi quy trình phải đổi.
