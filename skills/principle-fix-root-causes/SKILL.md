---
name: principle-fix-root-causes
description: "Áp dụng khi điều tra chênh lệch giữa sổ và nguồn ngoài. Lần từng chênh lệch tới nguyên nhân gốc và sửa ở đó. Tái hiện trước, hỏi vì sao cho tới khi chạm nguyên nhân, không treo phần chênh vào tài khoản tạm."
disable-model-invocation: true
---

# Sửa nguyên nhân gốc

Khi có chênh lệch, đừng xử lý triệu chứng. Lần mỗi chênh lệch tới nguyên nhân gốc và sửa tại đó.

**Vì sao:** Bút toán bịt chênh lệch tích lại qua từng kỳ. Mỗi lần treo vào tài khoản tạm hay ghi "chênh lệch làm tròn" làm sổ khó hiểu hơn, và lỗi thật vẫn còn. Tìm nguyên nhân tốn thời gian hơn lúc đầu, nhưng tổng thời gian điều tra qua nhiều kỳ ít hơn.

**Cách làm:**

- Tái hiện trước. Xác định chính xác chênh bao nhiêu, ở tài khoản nào, ngày nào, đối tượng nào. Một con số chênh tổng không phải là tái hiện.
- Hỏi "vì sao" cho tới khi gặp nguyên nhân. Sai kỳ, nhập trùng một tệp sao kê, tỷ giá hạch toán khác tỷ giá ngân hàng, phí ngân hàng chưa ghi, hóa đơn chưa về, một bút toán đảo dấu.
- Không treo phần chênh vào 1388, 3388 hay tài khoản tạm khi chưa biết nguyên nhân. Đó là che lỗi.
- Chênh lệch làm tròn thật thì nhỏ và giải thích được bằng phép tính. 3 đồng trên một hóa đơn có thuế suất lẻ là làm tròn. 3 triệu thì không.
- Nếu một bút toán điều chỉnh cần cả đoạn diễn giải để biện hộ, có lẽ bút toán gốc mới sai. Sửa bút toán gốc bằng bút toán điều chỉnh có tham chiếu.
- Tìm cả mẫu, không chỉ một lần. Một giao dịch nhập trùng thì kiểm tất cả giao dịch cùng mã trong kỳ, và cả các kỳ trước.
- Bế tắc thì đo thêm, đừng đoán. Lọc theo ngày, theo số tiền, theo đối tượng cho tới khi phần chênh thu về một dòng.

**Chênh lệch sau khi nhập lại: nghi dữ liệu cũ trước**

Khi số liệu đúng hôm qua mà sai sau khi nhập lại hay xuất lại, nghi trước hết các thứ còn sót. Tệp xuất cũ trong `lam/`, bảng ánh xạ chưa cập nhật, bộ lọc kỳ trên Smart Pro, một lần nhập trước chưa xóa. Nếu xuất lại sạch mà số khớp, hãy sửa cách kiểm tra đầu vào, không sửa con số.
