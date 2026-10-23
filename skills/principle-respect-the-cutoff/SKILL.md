---
name: principle-respect-the-cutoff
description: "Áp dụng khi ghi nhận doanh thu, chi phí, hóa đơn hay giao dịch ngân hàng gần ranh giới kỳ, và khi phát hiện sai sót thuộc một kỳ đã khóa. Mỗi khoản thuộc đúng một kỳ. Kỳ đã khóa không sửa, điều chỉnh ghi vào kỳ hiện tại có tham chiếu."
disable-model-invocation: true
---

# Tôn trọng ranh giới kỳ

Mỗi số tiền thuộc về đúng một kỳ, xác định theo một quy tắc đã chọn và áp dụng nhất quán. Ngày phát sinh nghiệp vụ, ngày hóa đơn, ngày giao hàng, ngày ghi có trên sao kê không phải lúc nào cũng trùng nhau. Biết khoản đó theo ngày nào trước khi xếp nó vào kỳ. Kỳ đã khóa thì không sửa.

**Vì sao:** Sai kỳ không làm sổ mất cân. Nó làm lệch lãi lỗ hai kỳ cùng lúc, lệch tờ khai thuế GTGT, và không phép kiểm Nợ bằng Có nào bắt được. Sửa thẳng vào kỳ đã khóa thì số liệu đã báo cáo, đã nộp thuế, đã gửi khách hàng không còn khớp với sổ, và không ai giải thích được vì sao.

**Cách làm:**

- Ghi rõ quy tắc xác định kỳ cho từng loại khoản trong bảng đối chiếu. Doanh thu theo thời điểm chuyển giao, thuế GTGT theo ngày lập hóa đơn, tiền theo ngày trên sao kê. Văn bản nào quy định thì trích dẫn có nguồn, chưa đọc thì ghi `[chưa xác minh]`.
- Kiểm cả hai phía ranh giới. Xem giao dịch vài ngày cuối kỳ này và vài ngày đầu kỳ sau. Hóa đơn ngày 31 mà hàng giao ngày 2, tiền khách chuyển ngày 31 mà ngân hàng ghi có ngày 1, chi phí điện tháng này mà hóa đơn về tháng sau.
- Khoản đã phát sinh mà chưa có chứng từ thì đề xuất trích trước có diễn giải, không chờ tới kỳ có hóa đơn.
- Hóa đơn nhận muộn của kỳ đã nộp tờ khai thì nêu ra để kế toán viên quyết cách kê khai. Agent không tự chọn kỳ kê khai.
- Sai sót của kỳ `da-khoa` được sửa bằng bút toán điều chỉnh ở kỳ đang mở, diễn giải ghi kỳ gốc và số chứng từ gốc. Không đề xuất mở lại kỳ chỉ để sửa cho gọn.
- Mở lại kỳ là việc của người duyệt. Agent nêu lý do và tác động, không tự làm.

**Dấu hiệu đã bỏ qua nguyên tắc này:** chênh lệch ngân hàng tháng này bằng đúng chênh lệch tháng trước với dấu ngược lại, số dư đầu kỳ khác số dư cuối kỳ trước đã khóa, hoặc bảng đối chiếu không có cột ngày nào ngoài ngày hạch toán.
