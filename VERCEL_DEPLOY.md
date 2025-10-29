# 🚀 Hướng dẫn deploy lên Vercel với Firebase

## ✅ Các bước để deploy

### 1. Push code lên GitHub (hoặc Git provider của bạn)

```bash
git add .
git commit -m "Add Firebase integration"
git push origin main
```

### 2. Import project vào Vercel

1. Truy cập: https://vercel.com
2. Click **"Add New"** > **"Project"**
3. Import repository của bạn
4. Chọn **Framework Preset**: `Vite`
5. Environment variables sẽ được thêm ở bước tiếp theo

### 3. ⚙️ Thêm Environment Variables vào Vercel

**QUAN TRỌNG**: Đây là bước bắt buộc để Firebase hoạt động!

1. Trong Vercel dashboard, vào **Settings** > **Environment Variables**
2. Thêm các biến sau:

| Name | Value |
|------|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyAujy6YF8emT7K8xPvb9dfsrVzH5AyWVXY` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `travel-c763e.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `travel-c763e` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `travel-c763e.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `1038869800685` |
| `VITE_FIREBASE_APP_ID` | `1:1038869800685:web:2ec734197b99f449c50ee4` |

3. Click **Save** cho từng biến
4. Apply cho: **Production**, **Preview**, và **Development**

### 4. Deploy

Click **Deploy** hoặc push code mới lên GitHub sẽ tự động trigger deploy.

### 5. 🧪 Test đồng bộ dữ liệu

1. Truy cập admin panel trên máy A: `https://your-app.vercel.app/admin`
2. Thêm một tour mới
3. Truy cập từ máy B hoặc browser khác
4. ✅ Tour mới sẽ xuất hiện ngay lập tức!

---

## 🔥 Cấu hình Firestore Security Rules

Sau khi deploy, cần cấu hình Firestore rules:

1. Vào Firebase Console: https://console.firebase.google.com/
2. Chọn project `travel-c763e`
3. Vào **Firestore Database** > Tab **Rules**
4. Thêm rule sau:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tours/{document=**} {
      allow read: if true;  // Cho phép mọi người đọc
      allow write: if true; // Cho phép mọi người ghi (cho development)
    }
  }
}
```

5. Click **Publish**

⚠️ **Lưu ý**: Trong production, nên thêm authentication để bảo vệ dữ liệu.

---

## 📊 Kiểm tra Firebase hoạt động

### Xem dữ liệu trong Firestore

1. Vào Firebase Console > Firestore
2. Click **tours** collection
3. Xem các tours đã được lưu

### Debug trong browser

1. Mở DevTools (F12)
2. Tab Console
3. Thêm tour mới
4. Xem log: `✅ Tour added successfully to Firestore`

---

## 🔄 Cách hoạt động

### Khi có Firebase config:
- Dữ liệu lưu vào Firestore (cloud)
- Tự động đồng bộ real-time
- Xem được từ mọi thiết bị

### Khi không có Firebase config:
- Dữ liệu lưu vào localStorage (browser local)
- Chỉ xem được trên browser đó
- Không đồng bộ giữa các máy

---

## 🎯 Kết quả sau khi deploy

✅ Admin upload tour ở máy A  
✅ Ngay lập tức thấy ở máy B, C, D...  
✅ Không cần refresh trang  
✅ Dữ liệu lưu vĩnh viễn trên cloud  

---

## 🆘 Troubleshooting

### Lỗi: "Failed to save to Firestore"
- Kiểm tra Firestore rules có cho phép write không
- Kiểm tra environment variables đã được thêm chưa
- Xem console log để debug

### Dữ liệu không đồng bộ?
- Kiểm tra Firebase Console xem có data không
- Kiểm tra network connection
- Thử hard refresh (Ctrl + Shift + R)

### Build failed?
- Kiểm tra syntax lỗi
- Xem Vercel build logs
- Đảm bảo đã install dependencies (`npm install`)

---

## 💡 Tips

- Firebase free tier đủ cho website travel (50K reads/ngày)
- Có thể export/import dữ liệu trong admin panel
- Backup dữ liệu định kỳ bằng chức năng Export

🎉 **Chúc bạn deploy thành công!**
