## Task 1
**Công nghệ sử dụng:** NextJS  
**Thư viện sử dụng:** Sử dụng thư viện `xlsx` xử lý Excel file trong môi trường JavaScript.

**Hướng dẫn chạy project:**
```bash
cd /task1
npm i
npm run dev
```
## Task 2
**Công nghệ sử dụng:** NextJS  
**Thư viện:** Chakra UI, Formik, Yup  
- Sử dụng thư viện UI **Chakra UI**.
- Để thực hiện yêu cầu nhập giao dịch cho cửa hàng bán xăng, sử dụng **Formik** kết hợp với **Yup** để dễ dàng quản lý trạng thái của các trường dữ liệu và thực hiện việc xác thực.

**Hướng dẫn chạy project:**
```bash
cd /task2
npm i
npm run dev
```
## Task 4

# Ý tưởng

Sử dụng mảng **prefix sums** (tổng tích lũy) để thực hiện các truy vấn một cách hiệu quả.

Chúng ta có thể xây dựng hai mảng prefix sums:

- `prefix_sum[i]`: tổng các phần tử từ chỉ số 0 đến i.
- `prefix_even[i]`: tổng các phần tử ở vị trí chẵn từ 0 đến i.
- `prefix_odd[i]`: tổng các phần tử ở vị trí lẻ từ 0 đến i.

## Thực hiện Truy Vấn

Bây giờ, với mảng prefix sums đã được xây dựng, chúng ta có thể thực hiện các truy vấn như sau:

### Truy vấn loại 1 (Tính tổng các phần tử trong khoảng [l, r]):

```
sum(l, r) = prefix_sum[r+1] - prefix_sum[l]
```

### Truy vấn loại 2 (Tính tổng các phần tử ở vị trí chẵn trừ đi tổng ở vị trí lẻ trong khoảng [l, r]):

```
result(l, r) = prefix_even[r+1] - prefix_even[l] - (prefix_odd[r+1] - prefix_odd[l])
```

### Thời gian:

- **Thời gian xây dựng**: `O(n)` cho việc tạo các mảng prefix.
- **Thời gian truy vấn**: `O(1)` cho mỗi truy vấn.

### Tổng độ phức tạp:

`O(n + q)` cho `n` phần tử trong mảng và `q` truy vấn.

**Hướng dẫn chạy project:**
```bash
cd /task4
npm i
npm run dev
```
**Tài liệu tham khảo**:  
[https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/](https://www.geeksforgeeks.org/prefix-sum-array-implementation-applications-competitive-programming/)