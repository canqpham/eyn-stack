---
name: principle-prove-it-works
description: "Áp dụng sau khi làm xong một bước đối chiếu, một bảng tính hay một bút toán đề xuất, trước khi báo là xong. Kiểm tra trên chứng từ và số liệu thật, không dựa vào thông báo của phần mềm, lời báo cáo của agent hay cảm giác là đã khớp."
disable-model-invocation: true
---

# Chứng minh là đúng

Kiểm tra mọi kết quả bằng cách nhìn thẳng vào thứ thật. Không suy ra từ dấu hiệu gián tiếp, từ lời tự báo cáo, hay từ việc Smart Pro không báo lỗi.

**Vì sao:** Một con số chưa kiểm là một con số không biết đúng sai. Kiểm gián tiếp có vẻ rẻ hơn. Nhưng nộp một tờ khai sai, hay để khách hàng trả tiền theo một công nợ sai, tốn hơn nhiều so với mở sao kê ra đọc.

**Kiểm thứ thật, không kiểm thứ thay thế:**

- Số dư tiền gửi khớp với số dư cuối ngày trên sao kê ngân hàng trong `nhan/`, không khớp với một bảng tổng hợp ai đó đã gõ lại.
- Tổng sổ chi tiết công nợ bằng số dư tài khoản tổng hợp trên sổ cái, theo từng đối tượng.
- BCĐKT cân, và số dư đầu kỳ bằng số dư cuối kỳ trước đã khóa.
- Thuế GTGT trên tờ khai bằng bảng kê hóa đơn tải từ hoadondientu.gdt.gov.vn, không bằng một bảng kê tự lập.
- "Smart Pro báo nhập thành công" chỉ nói rằng tệp đã vào. Nó không nói số liệu đúng.
- Khi kiểm không khớp, nghi phép kiểm trước. Sai cột, sai kỳ lọc, sai tài khoản trên tệp xuất là chuyện thường.

**Kết luận phải rõ:** khớp, không khớp, hoặc `CHƯA KẾT LUẬN`. Chưa kết luận không phải là khớp. Thiếu sao kê một tháng thì ghi là thiếu, không bỏ qua.

**Việc giao cho subagent:** tin vào tệp, không tin vào bản tóm tắt. Mở bảng đối chiếu trong `lam/` mà `ketoan-lap` tạo ra và đọc chính các dòng số liệu trước khi báo cáo.

## Viết phép kiểm thành tệp chạy lại được

Bằng chứng mạnh nhất là một bảng đối chiếu có công thức so với nguồn ngoài, người soát mở ra và tính lại được. Một lần nhìn bằng mắt thì không ai lặp lại được. Lưu bảng đó trong `lam/` và ghi đường dẫn vào nhật ký bằng `hoso.mjs ghi`.
