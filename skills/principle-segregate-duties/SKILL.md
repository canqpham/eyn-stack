---
name: principle-segregate-duties
description: "Áp dụng khi một kết luận, một bảng đối chiếu hay một bút toán đề xuất sắp được nộp duyệt, và khi giao việc soát cho subagent. Người lập không bao giờ tự duyệt. Người soát làm lại độc lập từ chứng từ gốc."
disable-model-invocation: true
---

# Tách người lập và người duyệt

Người lập một con số không được là người chấp nhận nó. Mỗi kết luận đi qua hai bên độc lập. Một bên lập, một bên làm lại từ chứng từ gốc mà không xem kết luận của bên kia. Người ký cuối cùng luôn là con người.

**Vì sao:** Người lập nhìn lại bài của mình sẽ thấy điều mình định làm, không thấy điều mình đã làm. Sai một cột tỷ giá, hiểu sai một hóa đơn, lọc nhầm kỳ đều trượt qua lần tự soát. Với agent điều này còn mạnh hơn. Cùng một mô hình, cùng một ngữ cảnh sẽ lặp lại đúng lỗi cũ và tự tin xác nhận nó.

**Cách làm:**

- Việc lập giao cho `ketoan-lap`. Việc soát giao cho `ketoan-soat`.
- Giao việc soát bằng đường dẫn tệp gốc trong `nhan/` và câu hỏi cần trả lời. Không kèm bảng đối chiếu, con số hay kết luận của người lập.
- Người soát tự tính lại rồi mới so với kết quả của người lập. Hai con số độc lập trùng nhau mới là bằng chứng.
- Ưu tiên người soát dùng họ mô hình khác với người lập, để hai bên không chung một kiểu sai.
- Agent không duyệt bài của chính mình, kể cả khi đổi tên vai. Agent điều phối chịu trách nhiệm đọc lại cả hai kết quả nhưng không thay được người duyệt.
- Duyệt, trả lại, khóa kỳ là việc của kế toán viên trên terminal. `hoso.mjs` đòi gõ lại MST cho các bước này. Agent không làm thay.

**Khi hai bên không khớp:** đó là kết quả có giá trị, không phải sự cố. Ghi cả hai con số vào nhật ký, tìm nguyên nhân theo `principle-fix-root-causes`. Không lấy trung bình, không chọn bên nào nghe hợp lý hơn.

**Dấu hiệu đã bỏ qua nguyên tắc này:** báo cáo soát lặp lại nguyên văn diễn giải của người lập, người soát chỉ ghi "đồng ý" mà không có con số tự tính, hoặc cùng một agent vừa viết bút toán đề xuất vừa đánh dấu nó là đã kiểm.
