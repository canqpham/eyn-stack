---
name: principle-minimize-reader-load
description: "Áp dụng khi lập hoặc soát một bảng đối chiếu, giấy làm việc, mẫu Excel khó lần theo. Đếm số sheet trung gian giữa câu hỏi và câu trả lời, đếm số thứ ẩn người đọc phải nhớ, rồi gộp sheet chuyển tiếp và bỏ số gõ cứng."
disable-model-invocation: true
---

# Giảm tải cho người đọc

Một giấy làm việc dễ duy trì khi người đọc ít phải gắng sức để hiểu. Theo dõi hai trục.
1. **Số tầng phải lần.** Bao nhiêu sheet, liên kết, bảng trung gian nằm giữa câu hỏi và câu trả lời.
2. **Số thứ phải nhớ.** Bao nhiêu giá trị ẩn, ô gõ cứng, điều chỉnh tay mà người đọc phải giữ trong đầu.

**Vì sao:** Giấy làm việc được đọc nhiều hơn được lập. Người soát, kế toán trưởng, kiểm toán và chính bạn ở kỳ sau đều phải đọc lại. Hai trục độc lập với nhau. Một sheet phẳng đầy ô gõ cứng khó tin như một chuỗi sáu sheet liên kết. Giữ cả hai. Bộ nhớ của người đọc cũng có hạn, như cửa sổ ngữ cảnh theo [Guard the Context Window](../principle-guard-the-context-window/SKILL.md).

**Cách làm:**
- **Gộp sheet** tốn công hơn giá trị. Sheet chỉ chép lại số từ một sheet khác, bảng trung gian chỉ có một nơi dùng. Đưa thẳng vào chỗ dùng.
- **Mỗi sheet phải đổi một bậc.** Sheet sau phải tổng hợp, phân loại hoặc đối chiếu số của sheet trước. Sheet chỉ lặp lại cùng các dòng thì bỏ.
- **Một phép đối chiếu một sheet.** Sổ 112 với sao kê một sheet. Công nợ với biên bản một sheet khác. Dòng cuối mỗi sheet là phần chênh và lời giải thích.
- **Không có số ẩn.** Không ẩn dòng, không ẩn cột, không gõ cứng giữa cột công thức. Mọi điều chỉnh tay là một dòng riêng có nguồn và lý do.
- **Tính ra thay vì chép.** Tổng, số dư, phần chênh là công thức từ dữ liệu gốc, không phải số chép từ màn hình Smart Pro.
- **Nêu quy ước một lần ở đầu sheet.** Đơn vị tiền, dấu của số Nợ và Có, kỳ, nguồn tệp. Người đọc học một lần.
- Trước khi thêm một sheet hay một ô trung gian, hỏi nó có làm người đọc nhẹ đi ở chỗ khác ít nhất bằng chừng đó không.

**Phép thử:** Người soát mới có trả lời được "số này từ đâu ra?" và "cái gì làm số này thay đổi?" trong 30 giây không? Không được thì bớt sheet hoặc bớt số ẩn.
