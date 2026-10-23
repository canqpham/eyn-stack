---
name: principle-attack-the-premise
description: "Áp dụng khi hai lần sửa trở lên cùng dựa trên một giả định mà phép đối chiếu vẫn không khớp. Lập bảng phân bổ chênh lệch theo ngân hàng, nhà cung cấp hoặc tài khoản trước lần sửa tiếp, rồi chất vấn giả định thay vì sửa thêm."
disable-model-invocation: true
---

# Chất vấn giả định

Khi hai lần sửa trở lên cùng dựa trên một giả định mà vẫn không qua cùng một phép đối chiếu, hãy nghi giả định, đừng nghi cách sửa.

**Vì sao:** Mỗi lần thất bại dưới cùng một giả định là một bằng chứng về giả định đó.

**Cách làm:**
- **Viết giả định ra.** Giả định là câu mà mọi lần sửa đều ngầm tin. Ví dụ "ngày giao dịch trên sao kê là ngày ghi sổ".
- **Lập bảng phân bổ trước lần sửa tiếp.** Đếm chênh lệch theo từng đối tượng, như từng ngân hàng, từng nhà cung cấp, từng tài khoản. Bảng này cho biết ai giữ phần chênh, không phải chênh bao nhiêu. Làm nó thành thứ chạy lại được theo [Build the Lever](../principle-build-the-lever/SKILL.md).
- **Đọc độ lệch.** Nếu mỗi kỳ vẫn chỉ vài đối tượng giữ gần hết phần chênh, có thứ gì đó gán vai trò ấy cho họ. Ví dụ một ngân hàng ghi ngày hiệu lực thay vì ngày giao dịch, hoặc một nhà cung cấp luôn xuất hóa đơn sau ngày giao hàng. Thứ gán vai trò là câu "vì sao" tiếp theo theo [Fix Root Causes](../principle-fix-root-causes/SKILL.md).
- **Bỏ sự bất đối xứng thay vì bù cho nó**, theo [Laziness Protocol](../principle-laziness-protocol/SKILL.md). Đổi quy tắc lấy ngày cho riêng ngân hàng đó trong bảng ánh xạ. Một tài khoản treo chờ xử lý hay một bút toán bù cuối kỳ để nguyên nguyên nhân và thêm việc mỗi kỳ.

**Dừng lại:**
- Không sửa tiếp khi chưa viết giả định ra và chưa có bảng phân bổ.
- Nếu chênh lệch rải đều trên mọi đối tượng thì giả định không phải nguyên nhân. Tìm chỗ khác và giữ bảng phân bổ làm bằng chứng trong `lam/`.

Nguyên tắc này khác [Redesign from First Principles](../principle-redesign-from-first-principles/SKILL.md), vốn dựng lại quy trình quanh một yêu cầu mới. Ở đây ta chất vấn một điều quy trình hiện tại đang coi là đúng.
