# 🛠️ Hướng dẫn sử dụng Admin Panel

## 📋 Tổng quan
Admin Panel cho phép bạn quản lý nội dung tour một cách dễ dàng mà không cần can thiệp vào code. Bạn có thể:
- ✅ Thêm tour mới
- ✏️ Chỉnh sửa tour hiện có
- 🗑️ Xóa tour
- 📤 Xuất dữ liệu backup
- 📥 Nhập dữ liệu từ file backup

## 🚀 Truy cập Admin Panel
1. Mở trình duyệt và truy cập: `http://localhost:5173/admin`
2. Bạn sẽ thấy giao diện quản lý tour

## 📝 Cách thêm tour mới

### Bước 1: Nhấn nút "Thêm Tour Mới"
- Click vào nút màu xanh "Thêm Tour Mới" ở góc phải trên

### Bước 2: Điền thông tin cơ bản
- **Tên tour**: Tên hiển thị của tour (VD: "City Tour Quy Nhơn nửa ngày")
- **Slug (URL)**: Đường dẫn URL (VD: "quy-nhon-city-tour")
- **Khu vực**: Chọn khu vực từ dropdown
- **Thời gian**: Thời gian tour (VD: "2 ngày 1 đêm")
- **Phương tiện**: Phương tiện di chuyển (VD: "Ô tô + Máy bay")
- **Giá tour**: Giá tour (VD: "1,500,000đ/khách")
- **Hình ảnh chính**: URL hình ảnh chính của tour
- **Mô tả ngắn**: Mô tả tổng quan về tour

### Bước 3: Điền nội dung chi tiết

#### 📅 Lịch trình tour
Mỗi dòng là một hoạt động trong lịch trình:
```
07h30: Xe và HDV đón khách tại điểm hẹn
08h00: Tham quan điểm A
09h00: Tham quan điểm B
10h00: Nghỉ ngơi và ăn trưa
```

#### ✅ Dịch vụ bao gồm
Mỗi dòng là một dịch vụ được bao gồm:
```
Xe ô tô đưa đón suốt tuyến
HDV chuyên nghiệp
Vé vào cổng các điểm tham quan
Ăn 01 bữa chính
Bảo hiểm du lịch 20.000.000đ
```

#### ❌ Dịch vụ không bao gồm
Mỗi dòng là một dịch vụ không được bao gồm:
```
Chi phí tham quan ngoài chương trình
Thuế VAT
Chi phí nước uống phát sinh
Tiền tip cho HDV và tài xế
```

#### 📜 Chính sách và điều khoản
Mỗi dòng là một điều khoản/chính sách:
```
Trẻ em 0-4 tuổi: Miễn phí
Trẻ em 5-9 tuổi: 50% giá vé người lớn
Trẻ em từ 10 tuổi: 100% như người lớn
Hủy tour trước 3 ngày: Hoàn 100%
```

#### 🖼️ Thư viện hình ảnh (Tùy chọn)
Mỗi dòng là một URL hình ảnh:
```
https://example.com/image1.jpg
https://example.com/image2.jpg
https://example.com/image3.jpg
```

### Bước 4: Lưu tour
- Nhấn nút "Thêm mới" để lưu tour

## ✏️ Cách chỉnh sửa tour

### Bước 1: Tìm tour cần sửa
- Trong danh sách tour, tìm tour bạn muốn chỉnh sửa

### Bước 2: Nhấn nút "Sửa"
- Click vào nút "Sửa" (màu xám) ở cột "Thao tác"

### Bước 3: Chỉnh sửa thông tin
- Thay đổi các thông tin cần thiết
- Các trường sẽ được điền sẵn với dữ liệu hiện tại

### Bước 4: Lưu thay đổi
- Nhấn nút "Cập nhật" để lưu thay đổi

## 🗑️ Cách xóa tour

### Bước 1: Tìm tour cần xóa
- Trong danh sách tour, tìm tour bạn muốn xóa

### Bước 2: Nhấn nút "Xóa"
- Click vào nút "Xóa" (màu đỏ) ở cột "Thao tác"

### Bước 3: Xác nhận
- Hệ thống sẽ hỏi xác nhận
- Nhấn "Xóa" để xác nhận hoặc "Hủy" để hủy bỏ

## 👁️ Cách xem tour

### Bước 1: Tìm tour cần xem
- Trong danh sách tour, tìm tour bạn muốn xem

### Bước 2: Nhấn nút "Xem"
- Click vào nút "Xem" (màu xanh) ở cột "Thao tác"
- Tour sẽ mở trong tab mới

## 💾 Backup và Restore dữ liệu

### 📤 Xuất dữ liệu (Backup)
1. Nhấn nút "Xuất dữ liệu" ở góc phải trên
2. File `tours-backup.json` sẽ được tải về
3. Lưu file này ở nơi an toàn để backup

### 📥 Nhập dữ liệu (Restore)
1. Nhấn nút "Nhập dữ liệu" ở góc phải trên
2. Chọn file backup JSON đã xuất trước đó
3. Dữ liệu sẽ được khôi phục

## 💡 Mẹo sử dụng

### ✅ Best Practices
- **Luôn backup dữ liệu** trước khi thực hiện thay đổi lớn
- **Kiểm tra tour** bằng nút "Xem" sau khi tạo/sửa
- **Sử dụng slug ngắn gọn** và không có dấu cách
- **Hình ảnh chất lượng cao** để tour trông chuyên nghiệp

### ⚠️ Lưu ý quan trọng
- **Slug phải duy nhất** - không được trùng với tour khác
- **URL hình ảnh phải hợp lệ** và có thể truy cập được
- **Dữ liệu được lưu trong trình duyệt** - nếu xóa cache sẽ mất dữ liệu
- **Thường xuyên backup** để tránh mất dữ liệu

### 🔧 Xử lý sự cố
- **Tour không hiển thị**: Kiểm tra slug có đúng không
- **Hình ảnh không load**: Kiểm tra URL hình ảnh có hợp lệ không
- **Mất dữ liệu**: Khôi phục từ file backup

## 📞 Hỗ trợ
Nếu gặp vấn đề, liên hệ:
- **Email**: tamthangtravel@gmail.com
- **Hotline**: 0377 28 06 97

---
*Hướng dẫn này sẽ giúp bạn quản lý tour một cách hiệu quả và chuyên nghiệp!* 🚀

