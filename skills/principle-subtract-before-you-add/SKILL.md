---
name: principle-subtract-before-you-add
description: "Áp dụng khi sắp thêm bảng phân bổ, mẫu Excel, tài khoản chi tiết hay bước kiểm mới, hoặc khi dọn lại bộ sổ. Đóng tài khoản chết, gộp đối tượng trùng, xử lý số dư treo trước, rồi mới dựng trên nền gọn hơn."
disable-model-invocation: true
---

# Bớt trước khi thêm

Khi thay đổi một bộ sổ hay một quy trình, gỡ bớt phức tạp trước, rồi mới dựng.

**Vì sao:** Thêm vào một bộ sổ rối làm nó rối hơn. Bớt trước thì còn ít thứ phải đối chiếu, lộ ra cấu trúc thật, và thường cho thấy ngay cách làm tiếp. Mặc định là bớt.

Coi việc làm gọn là đầu tư đều đặn. Mỗi kỳ để lại bộ sổ gọn hơn một chút và làm được nhiều hơn, với số tài khoản và số sheet bằng hoặc ít hơn lúc nhận.

**Cách làm:**
- Gỡ trước, dựng sau. Đóng tài khoản chi tiết không còn phát sinh, gộp đối tượng công nợ trùng MST, xử lý số dư tạm ứng và tài khoản chờ xử lý tồn từ kỳ trước, rồi mới lập bảng phân bổ mới.
- Cắt trước khi trau chuốt. Có bảng đối chiếu tối thiểu khớp được rồi mới làm đẹp định dạng.
- Thiết kế theo nghiệp vụ thật đã thấy trong `nhan/`, không theo trường hợp có thể xảy ra.
- Không thêm cột kiểm, quy tắc ánh xạ hay bước soát vượt quá yêu cầu thật.
- Rút gọn playbook và lời giao việc. Bỏ chỉ dẫn lặp, bỏ mẫu thừa.
- Một sheet hay một ghi chú không còn nội dung riêng thì xóa, đừng để lại vỏ rỗng.

Việc đóng tài khoản hay gộp đối tượng trên Smart Pro là của kế toán viên. Agent chỉ lập danh sách đề xuất kèm số dư và nguồn trong `lam/`.
