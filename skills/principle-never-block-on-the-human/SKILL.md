---
name: principle-never-block-on-the-human
description: "Áp dụng khi định hỏi 'có nên làm X không' với việc lập và đối chiếu. Cứ làm, trình kết quả, để kế toán viên sửa sau. Chỉ dừng hỏi trước việc ghi sổ, nộp, thanh toán, hóa đơn điện tử, khóa kỳ và gửi ra ngoài."
disable-model-invocation: true
---

# Không bắt người phải chờ

Kế toán viên giám sát không đồng thời với agent. Với việc lập và đối chiếu, agent tự quyết hợp lý, làm tiếp, và để người sửa sau khi xem kết quả. Với việc ghi sổ và đưa ra ngoài, quy tắc đảo ngược. Agent không làm, chỉ chuẩn bị và dừng.

**Vì sao:** Mỗi lần dừng hỏi việc lập bảng làm chậm cả kỳ và biến kế toán viên thành nút thắt. Bảng đối chiếu và bút toán đề xuất trong `lam/` và `day-vao/` sửa lại được, chưa ai dùng tới. Ngược lại, một bút toán đã ghi, một tờ khai đã nộp hay một hóa đơn đã phát hành thì không rút lại được mà không để dấu vết với khách hàng và cơ quan thuế.

**Cứ làm rồi trình:**

- Đọc tệp, lập bảng đối chiếu, viết bút toán đề xuất, tạo tệp Excel nhập liệu trong `day-vao/`.
- Chọn cách trình bày bảng, thứ tự các bước, cách chia việc cho subagent. Làm xong thì nói đã chọn gì và vì sao.
- Chuyển kỳ từ `mo` sang `dang-lam`, từ `dang-lam` sang `cho-duyet` sau khi `kiem` khớp, nhờ `ketoan-soat` soát lại.
- Thấy vấn đề thì ghi vào nhật ký bằng `hoso.mjs ghi` và xử lý ở lượt sau, không dừng cả kỳ để hỏi.

**Ranh giới:**

- **Không đảo ngược được hoặc ra ngoài công ty** thì luôn dừng hỏi. Ghi sổ vào Smart Pro, nộp tờ khai, lập lệnh thanh toán, lập, điều chỉnh, thay thế hoặc hủy hóa đơn điện tử, duyệt, khóa hoặc mở lại kỳ, gửi bất cứ thứ gì cho khách hàng, cơ quan thuế, ngân hàng, kiểm toán.
- **Lựa chọn chính sách** thuộc về con người. Phương pháp khấu hao, tiêu thức phân bổ, có ghi nhận dự phòng hay không. Agent so sánh các phương án và đề xuất, kế toán viên quyết.
- **Thiếu dữ liệu không suy ra được** như MST, kỳ, hay một hóa đơn chưa có thì hỏi. Đoán ở đây không phải là tự quyết.

"Cứ chạy đến hết" không mở rộng danh sách được tự làm. Nó chỉ bỏ các lần hỏi về việc lập.
