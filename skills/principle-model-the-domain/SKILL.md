---
name: principle-model-the-domain
description: "Áp dụng khi thiết kế bảng đối chiếu, mẫu Excel, bảng ánh xạ tài khoản, hoặc khi một quy trình có nhiều nhánh nếu-thì lặp lại theo loại chứng từ, chế độ kế toán hay loại thuế. Mã hóa nghiệp vụ vào một cấu trúc thay vì rải điều kiện."
disable-model-invocation: true
---

# Mô hình hóa nghiệp vụ

Đưa quy tắc kế toán vào một cấu trúc dữ liệu duy nhất, không rải chúng ra nhiều công thức, nhiều sheet và nhiều bước.

**Vì sao:** Cùng một quy tắc viết lại ở ba chỗ thì sớm muộn ba chỗ sẽ lệch nhau. Một bảng ánh xạ hay một bảng trạng thái làm cho trạng thái sai không thể xảy ra và xóa được các nhánh nếu-thì. Chọn cấu trúc đúng lúc bắt đầu thì rẻ. Sửa lại sau khi đã có 12 kỳ số liệu thì không ai muốn làm.

**Dùng các cấu trúc như:**

- Hệ thống tài khoản của đúng chế độ (`TT99`, `TT133`, `TT152`) là nguồn duy nhất cho số hiệu tài khoản. Không gõ tay số hiệu tài khoản trong công thức.
- Nợ bằng Có là bất biến của mọi bút toán. Kiểm tra nó ở nơi tạo bút toán, không ở cuối kỳ.
- Trạng thái kỳ là một máy trạng thái (`mo`, `dang-lam`, `cho-duyet`, `da-duyet`, `da-khoa`), không phải vài cờ "đã xong" rời rạc.
- Bảng ánh xạ (loại giao dịch ngân hàng sang tài khoản, thuế suất sang tài khoản thuế, mã hàng sang tài khoản kho) thay cho chuỗi IF lồng nhau.
- Mỗi loại chứng từ (phiếu thu, phiếu chi, hóa đơn, ủy nhiệm chi) là một bản ghi có đủ trường bắt buộc.
- Tổ chức theo tài khoản và người chịu trách nhiệm, không theo thứ tự ngày làm. Thứ tự thực hiện không phải là quyền sở hữu.

Đừng ép trừu tượng. Một bảng tính nhỏ, rõ và không lớn thêm thì giữ nguyên. Nghi ngờ mọi cấu trúc thêm tầng mà không xóa được nhánh, quy tắc trùng hay trạng thái sai nào.

**Dấu hiệu đã bỏ qua nguyên tắc này:** một khách hàng mới làm dài thêm một chuỗi IF, hoặc một cột "đã đối chiếu" phải giữ khớp tay với một cột "đã duyệt".
