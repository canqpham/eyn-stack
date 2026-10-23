---
name: principle-encode-lessons-in-structure
description: "Áp dụng khi thấy mình viết cùng một lời dặn lần thứ hai, hoặc khi người soát sửa cùng một lỗi nhiều lần. Đưa quy tắc vào phép kiểm trong hoso.mjs, bước trong playbook, mẫu Excel hay bảng ánh xạ, thay vì thêm chữ."
disable-model-invocation: true
---

# Mã hóa bài học vào cấu trúc

Đưa cách sửa lỗi lặp lại vào cơ chế như script, ràng buộc trong mẫu Excel, bảng ánh xạ, bước kiểm tra trong playbook, thay vì vào lời dặn. Mỗi lỗi, mỗi lần người soát sửa, mỗi kết quả bất ngờ là một tín hiệu để học. Ghi lại, chuyển đúng chỗ, và khép vòng.

**Vì sao:** Lời dặn dễ bị bỏ qua. Người đọc phải thấy, phải nhớ, phải làm theo. Cơ chế thì ép quy tắc mà không cần ai hợp tác. "Nhớ kiểm tra nhập trùng sao kê" sẽ bị quên. Một mẫu nhập từ chối mã giao dịch trùng thì không quên được.

**Cách làm:** Khi thấy mình viết cùng một lời dặn lần thứ hai:

1. Hỏi nó có thành phép kiểm trong `hoso.mjs`, ràng buộc trong mẫu Excel, dòng trong bảng ánh xạ, hay bước bắt buộc trong playbook được không.
2. Nếu được, đưa vào đó. Xóa lời dặn.
3. Nếu không, vì cần phán đoán nghề nghiệp, làm lời dặn nổi bật hơn và thêm một ví dụ lỗi thật.

**Chọn cơ chế mạnh nhất.** Khi nhiều cơ chế cùng dùng được, chọn cái mạnh nhất. Trước hết là cấu trúc không cho nhập sai, như mẫu Excel từ chối bút toán lệch. Sau đó là phép kiểm chặn chuyển trạng thái, như `hoso kiem` trả mã thoát 1. Rồi đến một mẫu hay bảng ánh xạ dùng chung. Cuối cùng là một bước kiểm tay trong playbook. Người lập sau sẽ chép theo cách đang có, nên cơ chế yếu sẽ thành khuôn mẫu cho lần sau.

**Hệ quả:** Nếu cách sửa là cấu trúc, chỉ dùng cấu trúc. Lời dặn là triệu chứng.

**Vòng phản hồi:**

- Ghi mọi lần bị sửa. Khi kế toán viên trả lại kỳ hoặc người soát tìm ra chênh lệch, xác định đó là lỗi một lần hay lỗi lặp. Ghi bằng `hoso.mjs ghi`.
- Chuyển đúng tầng. Lỗi một lần ghi vào nhật ký kỳ. Lỗi lặp ở nhiều khách hàng thành phép kiểm hoặc bước playbook. Lỗi hệ thống thành nguyên tắc.
- Khép vòng. Không chỉ ghi lại. Sửa ngay hoặc tạo một việc cụ thể.

**Dấu hiệu đã bỏ qua nguyên tắc này:**

- Nhận lỗi mà không ghi ("lần sau tôi sẽ để ý" không tồn tại sang phiên sau).
- Ghi mà không chuyển đúng chỗ. Một ghi chú về phép kiểm nên có là vô ích nếu phép kiểm không được dựng.
- Sửa một chỗ mà không khái quát. Sửa một hóa đơn nhập trùng nhưng bước nhập vẫn cho nhập trùng.
