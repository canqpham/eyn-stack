---
name: principle-outcome-oriented-execution
description: "Áp dụng khi chuyển đổi hệ thống, chuyển chế độ kế toán (như TT200 sang TT99), lập lại số liệu hoặc đổi bảng ánh xạ tài khoản theo kế hoạch có mốc rõ. Hướng tới trạng thái cuối đã đối chiếu, không giữ hai bộ ánh xạ sống song song."
disable-model-invocation: true
---

# Hướng tới kết quả cuối

Tối ưu cho trạng thái cuối đã định và kiểm chứng được, thay vì cố giữ mọi bước trung gian luôn cân.

**Vì sao:** Cố giữ mọi bước chuyển đổi đều cân thường đẻ ra bảng ánh xạ tạm, tài khoản trung gian và bút toán bù. Chúng ở lại nhiều kỳ và thành nợ. Hãy đi thẳng tới hệ thống tài khoản đích và chứng minh đúng ở các mốc đối chiếu đã khai báo.

**Quy tắc chính:**
- Ưu tiên sự đúng của trạng thái cuối hơn sự êm của giai đoạn chuyển tiếp.
- Lệch tạm thời chấp nhận được khi đã lên kế hoạch, có giới hạn và làm lại được.
- Không giữ hai bộ ánh xạ, mã cũ và mã mới, cùng dùng cho kỳ đang làm.

**Rào chắn:**
- Chỉ dùng cho chuyển đổi có kế hoạch với mốc rõ, như một lần chuyển chế độ kế toán hay chuyển số dư sang phần mềm mới.
- Khai báo chỗ được phép lệch. Đó là một vùng làm việc trong `lam/`, ví dụ bảng chuyển số dư từ tài khoản cũ sang tài khoản mới. Kỳ đã khóa và tệp trong `nhan/` không bao giờ nằm trong vùng này.
- Trong lúc chuyển, vẫn giữ các phép kiểm mạnh cho phần đang động tới. Tổng số dư theo từng nhóm tài khoản trước và sau khi ánh xạ phải bằng nhau.
- Tại mốc chuyển đổi phải đối chiếu đầy đủ. Bảng cân đối số phát sinh cân, số dư đầu kỳ mới bằng số dư cuối kỳ cũ theo bảng ánh xạ, sổ chi tiết khớp sổ cái, công nợ từng đối tượng không đổi.

Nhập số dư mới vào Smart Pro và khóa kỳ cũ là việc của kế toán viên. Agent chỉ chuẩn bị tệp trong `day-vao/` và bảng đối chiếu.
