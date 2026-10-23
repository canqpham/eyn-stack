---
name: principle-leave-an-audit-trail
description: "Áp dụng khi tạo bất kỳ con số, kết luận hay bút toán đề xuất nào, và khi sửa một kết luận đã ghi. Mỗi con số lần về được một chứng từ trong nhan/, mỗi quyết định là một dòng nhật ký, mọi sửa đổi là dòng mới chứ không xóa dòng cũ."
disable-model-invocation: true
---

# Để lại dấu vết kiểm toán

Mỗi con số lần ngược được về một chứng từ gốc. Mỗi quyết định để lại một dòng ghi ai quyết, dựa vào đâu, kết quả thế nào. Sửa sai bằng cách thêm, không bằng cách xóa.

**Vì sao:** Sáu tháng sau, kiểm toán hoặc cơ quan thuế hỏi vì sao một khoản chi phí được trừ. Người làm kỳ đó có thể đã đổi việc, agent không nhớ gì. Chỉ hồ sơ trả lời được. Một con số không có nguồn thì không bảo vệ được, kể cả khi nó đúng. Một dòng bị xóa thì xóa luôn lý do của quyết định sau nó.

**Cách làm:**

- Mỗi con số trong bảng đối chiếu và trong câu trả lời ghi nguồn là tên tệp trong `nhan/` hoặc `lam/`, cùng sheet và dòng hoặc ô. Ví dụ `nhan/sao-ke-vcb-2026-09.xlsx`, sheet 1, dòng 214.
- Ghi rõ mỗi nhận định là đo được, suy luận hay đoán.
- Mỗi quyết định là một dòng trong `nhat-ky.tsv` qua `hoso.mjs ghi`. Bỏ qua một bước, chọn một quy tắc xác định kỳ, chấp nhận một khoản chênh đã giải thích, đều là quyết định.
- Ghi agent và mô hình nào tạo ra kết luận, và ai đã soát. Người duyệt cần biết hai bên có thật sự độc lập không.
- Quyết định sai thì thêm dòng mới tham chiếu dòng cũ, như bút toán điều chỉnh. Không sửa, không xóa dòng nhật ký.
- Sổ cũng vậy. Bút toán sai được đảo hoặc điều chỉnh bằng bút toán mới có diễn giải, không đề xuất xóa bút toán đã ghi.
- `nhan/` không bao giờ sửa. Mã băm trong `bang-bam.tsv` chứng minh chứng từ hôm nay là chứng từ đã nhận. Khách gửi lại bản khác thì nhận như tệp mới, tên mới.
- Bảng tính trong `lam/` giữ công thức, không dán giá trị. Số gõ tay phải có ô ghi nguồn bên cạnh.

**Phép thử:** đưa một con số bất kỳ trên báo cáo cho một người không tham gia kỳ đó. Họ phải lần được tới chứng từ gốc và dòng nhật ký giải thích nó chỉ bằng các tệp trong thư mục kỳ, không cần hỏi ai.
