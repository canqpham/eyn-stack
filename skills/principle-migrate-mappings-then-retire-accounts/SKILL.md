---
name: principle-migrate-mappings-then-retire-accounts
description: "Áp dụng khi đổi hệ thống tài khoản, đổi chế độ kế toán, gộp hay tách tài khoản chi tiết, hoặc đổi bảng ánh xạ. Chuyển mọi bảng ánh xạ, mẫu và báo cáo trong cùng một kỳ rồi ngừng dùng tài khoản cũ, không giữ hai cách song song."
disable-model-invocation: true
---

# Chuyển hết ánh xạ rồi ngừng tài khoản cũ

Khi đã quyết định cấu trúc tài khoản mới là đúng, chuyển mọi nơi đang dùng tài khoản cũ sang tài khoản mới và ngừng tài khoản cũ trong cùng một đợt. Không giữ lớp tương thích.

**Quy tắc:**

- Không giữ tài khoản cũ chỉ vì còn bảng ánh xạ, mẫu Excel hay báo cáo đang trỏ vào nó.
- Lập danh sách mọi nơi dùng tài khoản cũ. Bảng ánh xạ sao kê, bảng ánh xạ thuế suất, mẫu `day-vao/`, công thức báo cáo quản trị, thuyết minh. Chuyển hết, rồi kế toán viên ngừng tài khoản cũ trong Smart Pro.
- Chuyển số dư bằng một bút toán kết chuyển có ghi chú, đề xuất trong `day-vao/`, để số dư tài khoản cũ về 0 tại ngày chuyển.
- Bảng ánh xạ tạm từ cũ sang mới là ngoại lệ, có hạn, ghi rõ kỳ sẽ xóa. Không phải cấu trúc mặc định.
- Sửa phép kiểm cho khớp cấu trúc mới. Xóa phép kiểm chỉ còn bảo vệ cách hạch toán cũ.

**Giới hạn:**

- Kỳ đã khóa không sửa. Số liệu các kỳ trước giữ nguyên tài khoản cũ.
- Số liệu so sánh trên báo cáo tài chính dùng bảng ánh xạ cũ sang mới ở dạng chỉ đọc, để trình bày lại. Đó là bảng chuyển đổi trình bày, không phải tài khoản còn sống.
- Việc ngừng tài khoản trong Smart Pro và khóa kỳ là của con người. Agent chỉ chuẩn bị danh sách và bút toán đề xuất.

**Khi nào áp dụng:**

- Chuyển chế độ, ví dụ từ hệ thống tài khoản cũ sang `TT99`.
- Gộp các tài khoản chi tiết trùng nghĩa, hoặc tách một tài khoản theo đối tượng.
- Khách hàng chấp nhận một kỳ chuyển đổi có phối hợp.

Giữ cả tài khoản cũ lẫn mới làm phát sinh hai đường hạch toán cho cùng một nghiệp vụ. Số dư bị chia đôi, đối chiếu chậm, và hệ thống tài khoản chỉ dài thêm mà không bao giờ gọn lại.
