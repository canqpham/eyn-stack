---
name: principle-laziness-protocol
description: "Áp dụng khi đề xuất bút toán điều chỉnh, thiết kế bảng đối chiếu, hoặc định thêm tài khoản chi tiết, đối tượng, cột, bước làm tay. Ưu tiên bớt đi và chọn thay đổi nhỏ nhất làm sổ đúng."
disable-model-invocation: true
---

# Nguyên tắc lười

Đạt kết quả đúng với ít tài khoản, ít bút toán và ít bước làm tay nhất.

**Vì sao:** Mỗi tài khoản chi tiết, mỗi cột phụ, mỗi bước chép tay đều phải được giữ khớp ở mọi kỳ sau. Cái thêm vào hôm nay thành việc phải đối chiếu mãi mãi. Người duyệt phải đọc mọi thứ bạn tạo ra.

- **Ưu tiên xóa.** Khi được giao dọn hay cải tiến một bộ sổ, tìm thứ bỏ được trước. Một tài khoản chi tiết không còn phát sinh, một sheet không ai đọc, một bước nhập lại số đã có sẵn.
- **Giữ đường truy vết ngắn.** Một con số trên báo cáo không nên phải đi qua quá ba sheet hay ba bảng trung gian mới về tới chứng từ trong `nhan/`. Dài hơn thì làm phẳng lại.
- **Một quyết định, một nơi.** Thuế suất của một mặt hàng, tỷ lệ phân bổ chi phí chung, tỷ giá ghi sổ cuối kỳ chỉ được nhập ở một ô. Mọi nơi khác tham chiếu tới ô đó.
- **Bút toán nhỏ nhất làm sổ đúng.** Sửa một hóa đơn hạch toán sai tài khoản bằng đúng một bút toán điều chỉnh cho hóa đơn đó. Không gộp việc dọn tài khoản khác vào cùng bút toán.
- **Nghi ngờ việc thêm trường.** Nếu một yêu cầu buộc bạn thêm cột mới vào sao kê, bảng kê, mẫu nhập Smart Pro và báo cáo cùng lúc, dừng lại tìm đường ngắn hơn. Thường có một bảng ánh xạ sẵn để gắn vào.
- **Dọn chỗ rò nhỏ sớm.** Một đối tượng công nợ trùng tên, một số dư tạm ứng treo từ kỳ trước, một ô gõ cứng giữa cột công thức. Để lâu chúng lan sang mọi kỳ.

**Phép thử:** Nếu kế toán viên duyệt thấy bảng đối chiếu này mệt để đọc và mệt để giữ qua 12 kỳ, đó là lời giải tồi.
