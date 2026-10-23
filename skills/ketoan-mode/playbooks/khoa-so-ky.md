### Khóa sổ kỳ

**Bạn chịu trách nhiệm đưa một kỳ của một khách hàng tới `cho-duyet` với bộ hồ sơ đủ để người duyệt ký.** Không ghi sổ, không duyệt, không khóa sổ, không nộp tờ khai.

1. Xác định MST và kỳ. Chạy `hoso.mjs trang-thai`. Kỳ `mo` thì chuyển sang `dang-lam`. Kỳ `cho-duyet` trở lên thì dừng và báo lại.
2. Kiểm tra đầu vào. So danh sách tệp cần có (bảng dưới) với `nhan/`. Thiếu tệp thì lập danh sách yêu cầu khách hàng hoặc kế toán viên xuất thêm, và dừng các bước phụ thuộc tệp đó. Có đủ thì chạy `hoso.mjs kiem`.
3. Làm các phép đối chiếu theo thứ tự trong bảng. Mỗi dòng giao một `ketoan-lap`. Các dòng không phụ thuộc nhau chạy song song. Dòng nào lệch thì chạy playbook Điều tra chênh lệch cho dòng đó.
4. Sau khi các dòng trên khớp, kiểm tra các bút toán cuối kỳ Smart Pro tự tạo: khấu hao, phân bổ chi phí trả trước và công cụ dụng cụ, giá vốn, kết chuyển xác định kết quả. So số khấu hao trên sổ với bảng tính từ danh mục tài sản.
5. Kiểm tra báo cáo: Bảng cân đối kế toán cân, Kết quả kinh doanh khớp đối ứng TK 911, số thuế GTGT trên báo cáo thuế khớp sổ. Smart Pro có sẵn các báo cáo kiểm tra này. Xuất chúng vào `nhan/` và đọc kết quả, không chỉ tin thông báo trên màn hình.
6. Giao `ketoan-soat` chọn và làm lại độc lập ít nhất ba phép đối chiếu, gồm mọi dòng có chênh lệch hoặc có bút toán đề xuất.
7. Lập `lam/tong-hop.md`: trạng thái từng dòng trong bảng, bút toán đề xuất và tệp `day-vao/` tương ứng, các ước tính và lựa chọn chính sách, câu hỏi còn mở với khách hàng, kết quả soát.
8. Chạy `hoso.mjs kiem` lần cuối, rồi chuyển kỳ sang `cho-duyet`. Từ đây chỉ kế toán viên duyệt, trả lại hoặc khóa sổ.

| Thứ tự | Phép đối chiếu | Nguồn bên ngoài | Nguồn từ Smart Pro |
|---|---|---|---|
| 1 | Tiền gửi ngân hàng (112), từng tài khoản | Sao kê ngân hàng | Sổ chi tiết 112 |
| 2 | Tiền mặt (111) | Biên bản kiểm kê quỹ | Sổ quỹ tiền mặt |
| 3 | Hóa đơn đầu ra và đầu vào | Bảng kê trên hoadondientu.gdt.gov.vn hoặc NIBOT | Bảng kê hóa đơn, phân hệ XML |
| 4 | Thuế GTGT (133, 3331) | Kết quả bước 3 | Sổ chi tiết 133, 3331, tờ khai nháp |
| 5 | Phải thu (131), phải trả (331) | Biên bản đối chiếu công nợ nếu có | Sổ chi tiết công nợ theo đối tượng |
| 6 | Hàng tồn kho | Biên bản kiểm kê nếu có | Báo cáo nhập xuất tồn |
| 7 | Lương và bảo hiểm (334, 338) | Bảng lương, thông báo BHXH | Sổ chi tiết 334, 338 |

Mã tài khoản trong bảng theo chế độ TT133 và TT200 cũ. Trước khi dùng cho khách hàng theo `TT99`, đối chiếu lại số hiệu tài khoản với văn bản và ghi kết quả vào hồ sơ. `[chưa xác minh]`

**Trả lời:** trạng thái kỳ, bảng các phép đối chiếu (khớp, lệch đã giải thích, chưa làm), các tệp trong `day-vao/` theo thứ tự nhập, kết quả soát độc lập, những việc chỉ kế toán viên được làm tiếp.
