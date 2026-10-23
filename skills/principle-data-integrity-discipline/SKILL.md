---
name: principle-data-integrity-discipline
description: "Áp dụng khi thiết kế bảng đối chiếu, mẫu Excel nhập Smart Pro, bảng ánh xạ, hoặc khi soát một bảng tính có nhiều cột trạng thái. Làm cho trạng thái sai không thể xảy ra bằng ràng buộc, phân biệt số hiệu tài khoản, số tiền và MST, và lấy cấu trúc từ nguồn chính thức."
disable-model-invocation: true
---

# Kỷ luật toàn vẹn dữ liệu

Dùng ràng buộc để loại bỏ từ đầu những trạng thái không thể đúng, những giá trị bị nhầm loại và những trường hợp bị bỏ sót. Một trường hợp mà cấu trúc cho phép bỏ qua sẽ thành sai sót lúc khóa sổ. Ưu tiên làm cho lỗi không có chỗ xảy ra hơn là thêm bước kiểm tra lỗi.

**Các mẫu:**

- Làm cho trạng thái sai không biểu diễn được. Một bút toán lệch Nợ Có, một dòng ghi vào kỳ đã khóa, một chứng từ trộn hai loại tiền, một số tiền VND có phần thập phân. Mẫu Excel phải từ chối những dòng này ngay khi nhập, không đợi cuối kỳ mới phát hiện.
- Cảnh giác với cặp cột tự mâu thuẫn. Cột "đã thanh toán" bằng Có cùng cột "ngày thanh toán" để trống là vô nghĩa. Suy cột trạng thái từ một nguồn duy nhất, ví dụ đã thanh toán khi và chỉ khi có ngày thanh toán.
- Dựng từ giá trị hợp lệ thay vì gọt bớt. Một bút toán là một danh sách dòng có tổng Nợ bằng tổng Có, không phải hai cột rời rồi kiểm tra sau. Một kỳ là `YYYY-MM`, không phải hai ngày đầu cuối phải giữ khớp tay.
- Phân biệt các loại số. Số hiệu tài khoản, số tiền, MST, số hóa đơn đều là chữ số nhưng không được lẫn. Định dạng cột MST là văn bản để giữ số 0 đầu. Không cộng số hiệu tài khoản. Không so số hóa đơn như số tiền.
- Dữ liệu ngoài chưa có loại cho đến khi được đọc. Sao kê, XML hóa đơn, tệp xuất Smart Pro phải qua bước đọc tại ranh giới. Xem nguyên tắc kỷ luật ở ranh giới.
- Không ép số cho khớp. Gõ đè một ô công thức bằng con số cứng để bảng cân là nói dối cấu trúc. Nếu chưa chứng minh được, tìm nguyên nhân.
- Liệt kê đủ mọi trường hợp. Bảng ánh xạ thuế suất phải có dòng cho 0%, 5%, 8%, 10%, không chịu thuế, không kê khai. Thêm một loại mới thì bảng phải báo dòng nào chưa có ánh xạ.
- Lấy cấu trúc từ nguồn chính thức. Hệ thống tài khoản lấy theo chế độ trong `khach-hang.json`, định dạng nhập lấy theo mẫu F8-F của Smart Pro, không tự chép lại một bản song song.

**Phép thử:**

- "Có phải viết ghi chú giải thích khi nào tổ hợp các cột này hợp lệ không?" Nếu có, cấu trúc quá lỏng.
- "Hai cột có cùng kiểu chữ số mà khác nghĩa không?" Tách và định dạng riêng.
- "Tháng sau có thêm thuế suất mới, bảng có tự báo chỗ thiếu không?" Nếu không, bảng chưa đủ.
