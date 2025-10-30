# 🔧 Fix lỗi Firebase 400 Bad Request

## ❌ Vấn đề

Console log hiển thị:
```
❌ GET/POST firestore.googleapis.com → 400 Bad Request
⚠️ WebChannelConnection RPC 'Listen' stream transport errored
```

## ✅ Nguyên nhân

Firestore database chưa được khởi tạo trong Firebase Console.

---

## 🚀 Cách sửa (5 phút)

### Bước 1: Tạo Firestore Database

1. Vào: https://console.firebase.google.com/project/travel-c763e
2. Click **Firestore Database** ở sidebar trái
3. Click nút **"Créer une base de données"** (Tạo cơ sở dữ liệu)

### Bước 2: Cấu hình Database

**Chọn chế độ:**
- ✅ **Production mode** (cho production)
- Hoặc **Test mode** (cho development)

**Chọn location:**
- Chọn **asia-southeast1** (Singapore) hoặc closest to Vietnam
- Click **Enable**

### Bước 3: Cấu hình Firestore Rules

1. Sau khi database được tạo, click tab **"Rules"** ở trên
2. Copy và paste code này:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tours/{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click **"Publish"** (màu xanh)

### Bước 4: Test lại

1. **Refresh trang** http://localhost:5174/admin (hoặc 5173)
2. Mở DevTools (F12) → Console
3. Thêm một tour mới
4. Phải thấy: **✅ Tour added successfully to Firestore**
5. Không còn lỗi 400 nữa!

---

## 🧪 Kiểm tra hoạt động

### 1. Xem tours trong Firestore

1. Vào: https://console.firebase.google.com/project/travel-c763e/firestore
2. Thấy collection **tours**
3. Click vào tours → thấy tours đã được lưu

### 2. Test đồng bộ

1. Tab 1: Thêm tour mới
2. Tab 2: Xem tour mới xuất hiện
3. ✅ Đồng bộ thành công!

---

## ❗ Nếu vẫn lỗi

### Kiểm tra checklist:

- [ ] Database đã được tạo (có tab Data, Rules visible)
- [ ] Rules đã được publish
- [ ] Location đã được chọn
- [ ] Không còn lỗi 400 trong console

### Debug thêm:

Mở Console và xem thông tin:
```javascript
console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY || 'Using fallback');
console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Using fallback');
```

---

## 🎯 Kết quả

Sau khi làm xong:
- ✅ Không còn lỗi 400
- ✅ Tours được lưu vào Firestore
- ✅ Dữ liệu đồng bộ giữa các tab/browser
- ✅ Thấy tours trong Firebase Console

**Quan trọng**: Sau khi test thành công ở local, nhớ thêm environment variables vào Vercel để deploy!

