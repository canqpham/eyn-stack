---
name: smart-pro
description: Cách lấy dữ liệu ra khỏi và đưa dữ liệu vào phần mềm kế toán Smart Pro (Công ty Năng Động). Dùng khi cần biết xuất báo cáo nào, định dạng tệp, hoặc lập tệp nhập liệu F8-F.
disable-model-invocation: true
---

# Smart Pro

Smart Pro là phần mềm desktop chạy trên Windows, dữ liệu nằm trong SQL Server, mỗi công ty là một database riêng. Agent không chạy trên máy đó và không kết nối database. Mọi trao đổi đi qua tệp: kế toán viên xuất tệp, agent đọc, agent lập tệp, kế toán viên nhập.

Nguồn đã đọc ngày 23/10/2026:
- https://phanmemnangdong.com/phan-mem-ke-toan-cho-cong-ty-du-lich (công nghệ, tính năng)
- https://phanmemnangdong.com/huong-dan-do-du-lieu-tu-excel-acess-vao-phan-mem-smart-pro (F8-E, F8-F)

## Xuất dữ liệu (kế toán viên làm, đưa vào `nhan/`)

| Cần cho | Báo cáo trong Smart Pro | Ghi chú |
|---|---|---|
| Mọi việc | Bảng cân đối tài khoản của kỳ | Mốc để kiểm tra tổng các sổ chi tiết |
| Đối chiếu từng tài khoản | Sổ chi tiết tài khoản | Có mẫu xuất Excel mỗi tài khoản một sheet hoặc tất cả một sheet. Chọn mỗi tài khoản một sheet. |
| Lần ngược chứng từ | Sổ chứng từ gốc | Xuất bằng F8, chọn E (sao những dòng đã chọn ra bảng khác), chọn Excel |
| Công nợ | Sổ chi tiết công nợ theo đối tượng, bảng đối chiếu công nợ | |
| Hóa đơn | Phân hệ quản lý tệp XML (TT78), hoặc xuất từ NIBOT ra Excel, JSON, XML | Smart Pro xuất được toàn bộ XML đầu vào và đầu ra của kỳ |
| Kiểm tra báo cáo | Kiểm tra BCĐKT không cân, đối chiếu KQKD với TK 911, báo cáo chênh lệch thuế giữa bảng kê và BCTC | Smart Pro tự làm các phép kiểm này. Xuất kết quả ra tệp thay vì chụp màn hình. |
| Tài sản, phân bổ | Báo cáo tình hình sử dụng TSCĐ và chi phí chờ phân bổ, báo cáo kiểm tra khấu hao giữa danh mục và số phát sinh | |

Tên tệp đặt theo mẫu `<báo cáo>_<MST>_<YYYY-MM>.xlsx` để biết tệp thuộc kỳ nào khi mở lại.

## Nhập dữ liệu (agent lập trong `day-vao/`, kế toán viên nhập)

1. Kế toán viên mở đúng bảng cần nhập trong Smart Pro (ví dụ Sổ chứng từ gốc), nhấn F8, chọn E, lưu tệp Excel mẫu chỉ có dòng tiêu đề. Đưa tệp mẫu đó vào `nhan/`.
2. Agent lập tệp nhập liệu dùng đúng các cột tiêu đề của tệp mẫu, đặt vào `day-vao/`. Không tự đặt tên cột. Mẫu khác nhau giữa các phiên bản, nên không dùng lại mẫu của khách hàng khác khi chưa so tiêu đề.
3. Kế toán viên mở bảng đích, nhấn F8, chọn F (bổ sung dữ liệu từ bảng khác), chọn nguồn là tệp Excel, rồi nhấn Bổ sung.

Mỗi tệp trong `day-vao/` phải có một dòng trong `nhat-ky.tsv` nêu nó sửa chênh lệch nào. Tổng Nợ bằng tổng Có trong từng tệp.

## Điều chưa biết

- Smart Pro ghi nhật ký truy cập và sửa xóa dữ liệu, và phân quyền được theo tháng. Chưa biết có xuất được nhật ký đó ra tệp hay không.
- Tài liệu không nói Smart Pro có API. Đọc trực tiếp database qua một tài khoản SQL chỉ đọc là phương án có thể bàn với khách hàng, nhưng chưa thử.
- Tên chính xác các cột trong tệp mẫu chưa được kiểm chứng. Luôn lấy từ tệp mẫu F8-E thật.
