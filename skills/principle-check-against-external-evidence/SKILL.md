---
name: principle-check-against-external-evidence
description: "Áp dụng khi lập, sửa hoặc giữ lại một phép kiểm, một dòng đối chiếu hay một bước kiểm soát. Phép kiểm phải so sổ với thứ nằm ngoài sổ. Nếu nó vẫn khớp khi sổ sai thì viết lại hoặc bỏ."
disable-model-invocation: true
---

# Đối chiếu với bằng chứng bên ngoài

Một phép kiểm chỉ có giá trị khi so số trên sổ với một nguồn nằm ngoài sổ và so với con số cụ thể của nguồn đó. Sao kê ngân hàng, bảng kê trên hoadondientu.gdt.gov.vn, biên bản đối chiếu công nợ, biên bản kiểm kê, xác nhận số dư của ngân hàng. Một phép kiểm so sổ với chính sổ thì không làm được việc đó.

**Phép thử:** trước khi giữ một phép kiểm, hỏi rằng nếu sổ cái sai thì nó còn khớp không. Nếu còn, nó không quan sát được gì và không bao giờ bắt được lỗi. Viết lại hoặc bỏ.

**Vì sao:** Phép kiểm không thể không khớp thì vẫn tốn thời gian của người soát và tạo cảm giác an toàn giả. Một dòng "đã kiểm" trên bảng còn làm người sau không kiểm nữa.

**Những dạng phép kiểm luôn khớp:**

- **Không có con số đối chiếu.** Chỉ ghi "đã xem", "hợp lý", "có số liệu", hoặc số dư lớn hơn 0.
- **Tự tham chiếu.** Cột "số theo sổ" và cột "số kiểm tra" cùng lấy từ một tệp xuất Smart Pro. Sổ cái so với báo cáo tổng hợp sinh ra từ chính sổ cái đó.
- **Gõ lại hằng số.** So thuế suất trên bảng tính với ô thuế suất ngay trong bảng tính đó, không với hóa đơn.
- **Số liệu tự lập so với chính nó.** Bảng kê do người lập gõ tay rồi so với tờ khai lập từ cùng bảng kê ấy.
- **Chỉ kiểm sự vắng mặt.** "Không có hóa đơn nào bị hủy" mà không chỉ ra danh sách hóa đơn đã tra trên cổng.

**Cách sửa:** đặt nguồn ngoài vào bảng như một cột riêng, ghi tên tệp trong `nhan/` và dòng gốc. So từng dòng hoặc từng số dư với con số cụ thể của nguồn đó, rồi ghi chênh lệch. Kiểm sự vắng mặt thì liệt kê những gì đã tra. Không có nguồn ngoài cho một khoản thì ghi rõ khoản đó chưa được đối chiếu, không viết một phép kiểm giả.

**Giữ lại** phép kiểm quan hệ giữa các phần của sổ khi nó bắt được lỗi thật. Nợ bằng Có, tổng sổ chi tiết bằng sổ cái, số dư đầu kỳ bằng cuối kỳ trước. Chúng không thay được đối chiếu ngoài, chỉ đi kèm.
