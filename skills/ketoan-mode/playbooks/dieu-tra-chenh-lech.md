### Điều tra chênh lệch

**Bạn chịu trách nhiệm tìm ra nguyên nhân và đề xuất cách sửa.** Không ghi sổ. Chênh lệch chỉ được coi là giải quyết khi phép đối chiếu với nguồn bên ngoài ra 0, hoặc mọi phần còn lại đã có nguyên nhân và chứng từ.

1. Xác định MST, kỳ và hai nguồn đang lệch. Nguồn bên ngoài là sao kê, bảng kê hóa đơn trên cổng thuế, biên bản đối chiếu, biên bản kiểm kê. Nguồn bên trong là sổ xuất từ Smart Pro. Chạy `hoso.mjs trang-thai`. Kỳ đang `da-duyet` hoặc `da-khoa` thì dừng và báo kế toán viên, vì sửa kỳ đó cần mở lại sổ.
2. Đưa cả hai nguồn vào `nhan/` bằng `hoso.mjs nhan`, rồi chạy `hoso.mjs kiem`. Thiếu tệp thì nói đúng tên báo cáo cần xuất (skill `smart-pro`). Sao kê PDF số: `pdf_bang.py`. Sổ xuất từ Smart Pro: `doichieu.mjs xlsx-tsv`, lấy địa chỉ ô làm nguồn.
3. Làm lại phép đối chiếu từ đầu trong `lam/`, không dùng con số người khác đã tính. Đưa sao kê vào `lam/sao-ke-chuan.tsv` rồi chạy `doichieu.mjs kiem-sao-ke`. Lập bảng bằng `doichieu.mjs lap`. Ghi số chênh đo được. Số chênh khác với số được báo thì nói ngay.
4. Thu hẹp phạm vi bằng cách chia đôi: theo ngày trong kỳ, theo tài khoản, theo đối tượng, theo loại chứng từ. Dừng khi chỉ còn từng dòng cụ thể.
5. Phân loại mỗi dòng lệch vào đúng một nhóm (trường `nhom` của đặc tả `lap`): chênh thời điểm (khác kỳ), nhập trùng, thiếu chứng từ, sai số tiền, sai tài khoản, phí hoặc lãi ngân hàng, tỷ giá, sai đối tượng. Dòng không xếp được thì ghi `chưa rõ` kèm điều cần hỏi khách hàng. Không bịa nguyên nhân.
6. Hai nhóm nguyên nhân trở lên cùng dựa trên một giả định (ví dụ "ngày trên sao kê bằng ngày ghi sổ") thì kiểm tra lại giả định đó trước khi sửa từng dòng.
7. Lập bút toán đề xuất cho từng dòng có nguyên nhân rõ: ngày, số chứng từ gốc, Nợ, Có, số tiền, diễn giải, căn cứ. Kiểm tra tổng Nợ bằng tổng Có. Tệp nhập liệu để vào `day-vao/` theo mẫu F8-F của Smart Pro.
8. Chạy lại phép đối chiếu như thể các bút toán đề xuất đã được ghi: cộng chúng vào cột A của đặc tả và chạy lại `doichieu.mjs lap`. Ghi số chênh còn lại (ô "Chênh chưa giải thích"). Khác 0 thì liệt kê từng khoản còn lại và lý do.
9. Giao `ketoan-soat` làm lại bước 3 tới 8 từ `nhan/`, không gửi kết luận của bạn. Hai kết quả khác nhau thì tìm chỗ khác trước khi báo cáo.
10. Ghi mỗi quyết định bằng `hoso.mjs ghi`. Nguyên nhân này đã gặp ở kỳ trước của cùng khách hàng thì đề xuất một phép kiểm để lần sau bắt sớm.

**Trả lời:** số chênh ban đầu, số chênh còn lại sau đề xuất, bảng nguyên nhân (nhóm, số dòng, số tiền), tệp trong `day-vao/` cần nhập, kết quả soát độc lập, câu hỏi cần gửi khách hàng.
