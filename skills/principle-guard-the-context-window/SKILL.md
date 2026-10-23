---
name: principle-guard-the-context-window
description: "Áp dụng khi ngữ cảnh đang đầy dần vì tệp xuất sổ lớn, sao kê dài, bảng kê hóa đơn nhiều dòng, đọc lại cùng một tệp, hoặc khi chia việc cho subagent. Đưa dữ liệu lớn cho subagent, giữ bản tóm tắt ở luồng chính, và không đưa dữ liệu khách hàng vào lời nhắc quá mức cần."
disable-model-invocation: true
---

# Giữ gìn cửa sổ ngữ cảnh

Cửa sổ ngữ cảnh có hạn và không phục hồi được trong một phiên. Mỗi dòng đưa vào phải đáng giá.

**Vì sao:** Ngữ cảnh tràn làm suy luận kém đi, sinh lỗi do nén, và làm dừng việc. Một sổ chi tiết 131 cả năm dán vào luồng chính có thể chiếm hết chỗ cho việc suy nghĩ về chênh lệch.

**Cách làm:**

- Cách ly dữ liệu lớn. Sổ chi tiết, sao kê nhiều tháng, bảng kê hóa đơn tải từ cổng thuế, tệp xuất Smart Pro giao cho subagent hoặc cho script xử lý. Luồng chính nhận kết quả tóm tắt như tổng phát sinh, số dòng khớp, danh sách dòng lệch kèm nguồn. Không nhận dữ liệu thô.
- Truyền đường dẫn tệp, không chép số liệu vào lời giao việc. Subagent tự đọc từ `nhan/`.
- Giữ nội dung dùng thường xuyên ngay trong skill. Bảng trạng thái kỳ, quy tắc ghi số tiền, danh sách điểm phải dừng hỏi nằm trong skill, không tách ra tệp riêng phải đọc thêm mỗi lần.
- Chia giai đoạn và giới hạn phạm vi. Một subagent một khách hàng một kỳ, hoặc một tài khoản ngân hàng. Không giao cả năm cho một lượt.
- Đọc một lần. Đã có bảng chuẩn trong `lam/` thì đọc bảng chuẩn, không mở lại tệp sao kê gốc.

**Bảo mật:** Dữ liệu khách hàng là bí mật. Chỉ đưa vào lời nhắc phần cần cho việc đang làm. Tính tổng, lọc dòng, so khớp bằng script trên máy, rồi chỉ đưa kết quả vào ngữ cảnh. Không gửi bảng lương, số tài khoản ngân hàng hay thông tin cá nhân ra ngoài khi việc không đòi hỏi.
