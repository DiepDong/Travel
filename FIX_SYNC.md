# 🔧 Hướng dẫn sửa lỗi đồng bộ dữ liệu trên Vercel

## 🚨 Vấn đề
Dữ liệu không đồng bộ giữa các máy khi deploy lên Vercel.

## ✅ Nguyên nhân
Environment variables chưa được thêm vào Vercel, nên app đang dùng localStorage (chỉ lưu local) thay vì Firestore (lưu cloud).

---

## 🔍 Bước 1: Kiểm tra trạng thái

1. Truy cập trang admin: `https://your-app.vercel.app/admin`
2. Click nút **"🔍 Kiểm tra Firebase"** (màu xanh ở header)
3. Xem kết quả:
   - ✅ **Firebase đã được cấu hình** → Dữ liệu SẼ đồng bộ
   - ⚠️ **Firebase chưa được cấu hình** → Dữ liệu KHÔNG đồng bộ (cần làm bước 2)

---

## 🔧 Bước 2: Thêm Environment Variables vào Vercel

### 1. Truy cập Vercel Dashboard

1. Vào https://vercel.com
2. Chọn project của bạn
3. Click **Settings** (menu bên trái)
4. Click **Environment Variables**

### 2. Thêm các biến sau

Click **Add New** và thêm từng biến một:

| Key | Value |
|-----|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyAujy6YF8emT7K8xPvb9dfsrVzH5AyWVXY` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `travel-c763e.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `travel-c763e` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `travel-c763e.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `1038869800685` |
| `VITE_FIREBASE_APP_ID` | `1:1038869800685:web:2ec734197b99f449c50ee4` |

**Lưu ý**: Ở mỗi biến, chọn:
- ✅ **Production**
- ✅ **Preview**  
- ✅ **Development**

Click **Save** sau mỗi biến.

### 3. Redeploy Project

1. Vào tab **Deployments**
2. Click **⋮** (3 chấm) ở deployment mới nhất
3. Click **Redeploy**
4. Chọn **Use existing Build Cache** (không bắt buộc)
5. Click **Redeploy**

Hoặc push code mới lên GitHub sẽ tự động trigger redeploy.

---

## 🔥 Bước 3: Cấu hình Firestore Rules

### 1. Truy cập Firebase Console

Vào: https://console.firebase.google.com/project/travel-c763e/firestore/rules

### 2. Thêm Rules

Copy và paste code này:

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

### 3. Click "Publish"

---

## 🧪 Bước 4: Test lại

### Test 1: Kiểm tra Firebase

1. Truy cập admin panel: `https://your-app.vercel.app/admin`
2. Click **"🔍 Kiểm tra Firebase"**
3. Phải hiển thị: **✅ Firebase đã được cấu hình**

### Test 2: Đồng bộ dữ liệu

1. **Máy A**: Thêm một tour mới
2. **Máy B**: Mở browser khác hoặc máy khác
3. **Kết quả**: Tour mới phải xuất hiện ngay lập tức trên máy B

### Test 3: Xem dữ liệu trong Firebase

1. Vào https://console.firebase.google.com/project/travel-c763e/firestore
2. Click collection **tours**
3. Xem tours đã được lưu

---

## ❗ Troubleshooting

### Vẫn thấy "Firebase chưa được cấu hình"?

**Nguyên nhân**: Environment variables chưa được apply sau khi thêm.

**Giải pháp**:
1. Kiểm tra lại đã thêm đủ 6 biến chưa
2. Đảm bảo đã chọn Production/Preview/Development
3. Redeploy lại project

### Lỗi "Permission denied" khi lưu tour?

**Nguyên nhân**: Firestore rules chưa được cấu hình.

**Giải pháp**: Làm Bước 3 ở trên

### Dữ liệu cũ biến mất?

**Không sao**: Dữ liệu cũ đang ở localStorage, sẽ tự động migrate sang Firestore khi thêm tour mới.

Hoặc export dữ liệu cũ từ máy cũ:
1. Vào admin panel
2. Click **Xuất dữ liệu**
3. Lưu file backup
4. Sau khi setup xong, click **Nhập dữ liệu** và chọn file backup

---

## ✅ Checklist hoàn thành

- [ ] Đã thêm 6 environment variables vào Vercel
- [ ] Đã redeploy project
- [ ] Đã cấu hình Firestore rules
- [ ] Kiểm tra Firebase cho kết quả "✅ đã cấu hình"
- [ ] Test đồng bộ giữa 2 máy thành công
- [ ] Xem được dữ liệu trong Firebase Console

---

## 🎯 Kết quả mong đợi

Sau khi hoàn thành:
- ✅ Admin upload tour từ máy A → xuất hiện ngay ở máy B
- ✅ Dữ liệu lưu vĩnh viễn trên cloud
- ✅ Không cần refresh trang
- ✅ Đồng bộ real-time

---

## 📞 Cần hỗ trợ?

1. Kiểm tra console log trong browser (F12)
2. Xem Vercel deployment logs
3. Xem Firebase Console > Firestore > Data

🎉 **Chúc bạn fix thành công!**

