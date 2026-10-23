# eyn-stack

Plugin omp cho công ty dịch vụ kế toán dùng Smart Pro. Agent lập bảng đối chiếu, tìm nguyên nhân chênh lệch và chuẩn bị tệp nhập liệu. Kế toán viên ghi sổ, duyệt, khóa sổ và nộp tờ khai.

## Cài đặt

```sh
omp --plugin-dir /đường/dẫn/eyn-stack
export KETOAN_ROOT=~/KeToan
```

`KETOAN_ROOT` là thư mục chứa hồ sơ khách hàng. Đặt trên máy của công ty, không đưa vào git.

Nên đặt hai role model khác họ trong `~/.omp/agent/config.yml` để người soát độc lập với người lập:

```yaml
modelRoles:
  ketoan-lap: <model nhanh>
  ketoan-soat: <model khác họ>
```

## Dùng

```text
/skill:ketoan-mode đối chiếu TK 112 tháng 09/2026 của MST 0101234567, sao kê đã có trong Downloads
```

| Thành phần | Việc |
|---|---|
| `skills/ketoan-mode` | Quy tắc chung, danh sách việc phải dừng hỏi, ba playbook: nghiên cứu, điều tra chênh lệch, khóa sổ kỳ |
| `skills/ho-so` | Hồ sơ theo MST và kỳ, mã băm tệp đầu vào, trạng thái kỳ, nhật ký quyết định |
| `skills/smart-pro` | Xuất báo cáo nào từ Smart Pro, lập tệp nhập F8-F |
| `agents/ketoan-lap`, `agents/ketoan-soat` | Người lập và người soát |
| `skills/principle-*` | 26 nguyên tắc. 23 nguyên tắc chuyển từ pstack sang kế toán, 3 nguyên tắc kiểm soát mới: tách người lập và người duyệt, tôn trọng kỳ, để lại dấu vết |

## Kiểm thử

```sh
npm test
```
