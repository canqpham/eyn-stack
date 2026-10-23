---
name: principle-make-operations-idempotent
description: "Áp dụng khi thiết kế bước nhập sao kê, nhập hóa đơn, chạy khấu hao, phân bổ, kết chuyển cuối kỳ, hoặc bất kỳ bước nào có thể bị chạy lại sau khi dừng giữa chừng. Chạy bao nhiêu lần cũng phải ra cùng một kết quả."
disable-model-invocation: true
---

# Thao tác làm lại được

Thiết kế mỗi bước sao cho chạy bao nhiêu lần và bắt đầu từ trạng thái nào cũng hội tụ về cùng một kết quả đúng. Mỗi bước làm thay đổi số liệu phải trả lời được hai câu. Chạy hai lần thì sao? Lần trước dừng giữa chừng thì sao?

**Vì sao:** Nhập lại, chạy lại, mất điện giữa lúc sinh tệp là chuyện thường. Nếu phần dở dang làm thay đổi kết quả lần sau, mỗi lần chạy lại thành một cuộc điều tra chênh lệch. Lỗi phổ biến nhất ở dịch vụ kế toán là nhập trùng sao kê hoặc hóa đơn.

**Cách làm:**

- Khóa theo nội dung, không theo thứ tự. Mỗi dòng sao kê định danh bằng mã giao dịch của ngân hàng. Mỗi hóa đơn định danh bằng bộ ký hiệu, số hóa đơn và MST người bán. Nhập lại cùng tệp thì không thêm dòng nào.
- Sinh lại, không cộng dồn. Bảng khấu hao, bảng phân bổ chi phí trả trước, bút toán kết chuyển của kỳ được tính lại toàn bộ từ dữ liệu gốc mỗi lần chạy và ghi đè tệp trong `lam/` hoặc `day-vao/`. Không nối thêm dòng vào bản cũ.
- Dọn phần dở dang trước khi làm. Tệp `day-vao/` sinh dở thì xóa và sinh lại, không viết tiếp.
- Đối chiếu trước khi đề xuất. Trước khi đưa bút toán vào `day-vao/`, so với tệp xuất sổ của Smart Pro để bỏ những chứng từ kế toán viên đã nhập rồi.
- `hoso nhan` đã theo cách này. Nhận lại cùng tệp không ghi thêm mã băm. Cùng tên khác nội dung thì từ chối. Các bước khác làm theo đúng mẫu đó.

**Phép thử:**

1. Chạy bước này hai lần liền thì sao?
2. Lần trước dừng ở bất kỳ điểm nào thì sao?
3. Chạy lại có ra đúng cùng bảng đối chiếu và cùng tệp `day-vao/` không?

Nếu câu trả lời nào là "còn tùy lần trước để lại gì", bước đó cần thêm một bước đối chiếu với trạng thái hiện có.
