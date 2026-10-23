---
name: principle-sequence-verifiable-units
description: "Áp dụng cho việc nhiều bước như khóa sổ kỳ, đối chiếu nhiều tài khoản ngân hàng, chuyển đổi hệ thống tài khoản, và cho cách sắp xếp hồ sơ nộp duyệt. Chia việc thành các phần nhỏ, mỗi phần kết thúc bằng một phép đối chiếu, khớp rồi mới sang phần sau."
disable-model-invocation: true
---

# Chia việc thành các bước kiểm được

Sắp xếp công việc thành chuỗi bước nhỏ. Mỗi bước kết thúc ở một trạng thái đối chiếu được. Chưa khớp hoặc chưa giải thích được phần chênh thì chưa sang bước sau.

**Vì sao:** Chênh lệch bắt được ngay ở bước gây ra nó thì dễ khoanh vùng. Chênh lệch phát hiện khi BCĐKT không cân cuối kỳ thì đã bị chôn dưới khấu hao, phân bổ và kết chuyển. Sắp các bước ấy theo thứ tự để người soát chạy lại được thì "tin tôi đi" trở thành "xem nó khớp từng bước".

**Khi làm.** Mỗi bước là một cặp trước và sau. Bắt đầu từ trạng thái đã khớp, làm một việc, đối chiếu, rồi mới đi tiếp. Thứ tự khóa sổ thường là:

1. `hoso.mjs kiem` khớp, số dư đầu kỳ bằng số dư cuối kỳ trước đã khóa.
2. Tiền mặt và tiền gửi khớp sao kê, từng tài khoản ngân hàng một.
3. Hóa đơn đầu vào và đầu ra khớp bảng kê trên cổng hóa đơn.
4. Công nợ khớp biên bản đối chiếu hoặc giải thích được.
5. Khấu hao, phân bổ, trích trước, rồi kiểm lại số dư các tài khoản liên quan.
6. Kết chuyển, rồi kiểm BCĐKT cân và lãi lỗ khớp tài khoản 421.

Khi có mẫu Excel hay bảng ánh xạ làm hộ, phép đối chiếu mỗi bước gần như miễn phí. Vẫn chạy nó.

**Khi nộp duyệt.** Xếp tệp trong `lam/` theo đúng thứ tự trên, đánh số đầu tên tệp. Mỗi tệp đứng được một mình và có dòng kết luận khớp hoặc chênh. Bút toán đề xuất nằm sau bảng đối chiếu chứng minh nó cần thiết, không nằm trước. Người soát đọc từ đầu tới cuối như đọc một lập luận.

Đi cùng nguyên tắc `principle-prove-it-works`, giữ cho mỗi phép đối chiếu là thật, và `principle-build-the-lever`, làm cho phép đối chiếu mỗi bước rẻ.
