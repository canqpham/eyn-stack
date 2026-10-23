---
name: principle-separate-before-serializing-shared-state
description: "Áp dụng khi nhiều người lập hoặc nhiều agent có thể cùng ghi vào một thư mục kỳ, một bảng đối chiếu, một sheet hay một tệp nhập Smart Pro. Tách phần ghi trước, chỉ xếp hàng khi bắt buộc phải có một người ghi duy nhất."
disable-model-invocation: true
---

# Tách trước khi xếp hàng

Khi nhiều người làm cùng lúc có thể đụng vào cùng một chỗ ghi, trước hết hỏi họ có thật sự cần chung chỗ đó không. Nếu không, bỏ sự chia sẻ. Khi bắt buộc phải chung, ép thứ tự bằng cấu trúc như trạng thái kỳ, các bước nối tiếp, quyền sở hữu riêng. Lời dặn và quy ước không phải là cơ chế chống ghi đè.

**Vì sao:** Hai người cùng sửa một bảng đối chiếu thì người sau ghi đè người trước. Lỗi chỉ hiện ra thỉnh thoảng, khó tái hiện, và tốn công tìm. Hai agent cùng sinh tệp `day-vao/` cho một kỳ có thể dẫn tới nhập trùng bút toán.

**Cách làm:**

1. Tìm chỗ ghi chung. Một thư mục kỳ, một tệp Excel tổng hợp, một sheet công nợ mà nhiều người cùng cập nhật.
2. Mặc định bỏ chỗ ghi chung. Hỏi xem họ cần một đối tượng chung, hay chỉ đang công bố các kết quả độc lập. Mỗi người lập sở hữu một khách hàng, một kỳ, hoặc một tài khoản ngân hàng, với tệp riêng trong `lam/`. Gộp chỉ ở bước tổng hợp. Hai agent cùng ghi vào hai cột khác nhau của một tệp vẫn là ghi chung. Tệp `doi-chieu-112-vcb.xlsx` và `doi-chieu-112-acb.xlsx` thì không.
3. Chỉ khi một chỗ ghi duy nhất là bắt buộc mới xếp hàng bằng cấu trúc. Sổ của một khách hàng trong Smart Pro chỉ có một người nhập tại một thời điểm. Trạng thái kỳ là khóa. Kỳ ở `cho-duyet` thì `hoso nhan` bị chặn, người lập không ghi thêm. Coi "cần khóa" là dấu hiệu nên xem lại thiết kế, không phải câu trả lời mặc định.

**Trong plugin này:**

- Nhiều khách hàng hoặc nhiều tài khoản ngân hàng chạy song song được, mỗi agent một thư mục kỳ riêng.
- Không bao giờ cho hai agent ghi cùng một thư mục kỳ.
- Người soát làm lại trong tệp của mình, không sửa tệp của người lập.
