---
name: principle-build-the-lever
description: "Áp dụng khi một việc kế toán không tầm thường, kể cả việc chỉ làm một lần, như đối chiếu sao kê, ánh xạ tài khoản, lập bảng kê hay kiểm tra số liệu. Dựng công cụ làm hoặc chứng minh việc đó (mẫu Excel, script đối chiếu, bảng ánh xạ, hoặc một skill cho subagent) thay vì làm tay. Công cụ là thứ người soát chạy lại được."
disable-model-invocation: true
---

# Dựng đòn bẩy

Khi việc không tầm thường, dựng công cụ làm việc đó thay vì làm tay.

**Vì sao:** Có hai cái lợi. Thứ nhất là năng suất. Một script đối chiếu hay một mẫu Excel làm cùng một cách mỗi lần và chạy lại không tốn gì. Thứ hai là độ tin cậy. Công cụ là một tệp người soát đọc được và chạy lại được để kiểm tra kết quả. Việc làm tay thì chỉ kiểm lại được bằng cách làm lại từ đầu. Một script cho cùng kết quả trên cùng dữ liệu biến câu "tin tôi đi" thành câu "chạy cái này".

**Cách làm:** Mặc định là dựng công cụ. Chỉ bỏ qua khi việc thật sự tầm thường, vài dòng nhìn qua là thấy đúng.

- Làm tay đơn vị đầu tiên để hiểu cách làm, ví dụ đối chiếu tay một ngày sao kê. Sau đó dựng công cụ. Chạy công cụ lại trên chính ngày đó và so với bản làm tay. Công cụ phải chạy lại an toàn, không nhân đôi dòng.
- Script đối chiếu sao kê với sổ 112, bảng ánh xạ loại giao dịch sang tài khoản, mẫu Excel sinh tệp `day-vao/` đúng định dạng F8-F của Smart Pro, một truy vấn trên tệp xuất sổ chi tiết để phân tích công nợ.
- Công cụ chạy một lượt hết mọi dòng thì tốt hơn chia việc. Nếu script xử lý được cả 12 tài khoản ngân hàng, tự chạy nó. Đừng giao 12 subagent đối chiếu tay.
- Khi giao việc cho subagent, viết cách làm thành một skill mà tất cả cùng đọc. Trong đó có công thức, điều kiện khớp, và những tệp không được đụng tới. Đặt skill ngoài phạm vi ghi của subagent để không ai lặng lẽ sửa luật.
- Áp dụng nguyên tắc này phải sinh ra một tệp trong `lam/`. Nếu viện dẫn nó mà không có script, mẫu Excel hay bảng ánh xạ nào, tức là chưa áp dụng.
- Công cụ dùng lại cho các kỳ sau thì lưu ở nơi các kỳ sau tìm được, không để lẫn trong một kỳ.

**Cân bằng:** Ngưỡng là sự tầm thường, không phải số lần lặp. Một việc làm một lần vẫn đáng có công cụ nếu công cụ là thứ làm cho việc đó kiểm được. Theo nguyên tắc lười, dựng script nhỏ nhất làm hoặc chứng minh được việc, không dựng cả một hệ thống.

Khác với nguyên tắc mã hóa bài học vào cấu trúc, vốn biến một lời nhắc lặp lại thành phép kiểm lâu dài. Nguyên tắc này nói về năng suất và khả năng soát lại của việc đang làm.
