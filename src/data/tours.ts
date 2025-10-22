export type ItineraryItem = {
  time: string;
  activity: string;
  description?: string;
  images?: string[]; // Multiple images
  imageCaption?: string; // Caption for images
  dayTitle?: string; // "NGÀY 1", "NGÀY 2", etc.
  periodTitle?: string; // "Sáng:", "Chiều:", etc.
  locationTitle?: string; // Location name in blue
};

// Allow legacy data entries that store itinerary as plain strings
export type ItineraryEntry = string | ItineraryItem;

export type TourItem = {
  id?: string;
  slug: string;
  title: string;
  region: 'BinhDinh' | 'MienTrungTayNguyen' | 'MienNam' | 'MienBac';
  image: string;
  price?: string;
  duration: string;
  transport: string;
  summary: string;
  itinerary: ItineraryEntry[]; // Accepts both detailed objects and legacy strings
  itineraryText?: string; // Raw markdown text for itinerary
  includedServices: string[];
  excludedServices: string[];
  policies: string[];
  policiesText?: string; // Raw markdown text for policies
  gallery?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export const tours: TourItem[] = [
  {
    id: 'dao-ky-co-example',
    slug: 'dao-ky-co-1-ngay',
    title: 'Đảo Kỳ Co - Thiên đường biển đảo',
    region: 'BinhDinh',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop',
    price: '1,500,000đ/khách',
    duration: '1 ngày',
    transport: 'Xe ô tô + Cano',
    summary: 'Khám phá vẻ đẹp hoang sơ của Đảo Kỳ Co với những bãi biển trong xanh và cảnh quan thiên nhiên tuyệt đẹp.',
    itinerary: [
      {
        time: '08h45',
        activity: 'Đến Nhơn Lý, Cano đưa quý khách di chuyển đến Đảo Kỳ Co',
        description: `Tại đây, quý khách có thể:
→ Chiêm ngưỡng bức tranh thiên nhiên tuyệt đẹp
→ Chụp ảnh lưu niệm
→ Ngâm mình trong làn nước trong xanh của bãi tắm Kỳ Co
→ Tham gia những trò chơi mạo hiểm khi leo lên cầu, ghềnh đá và nhảy xuống biển, một cảm giác thật sảng khoái và thú vị`,
        images: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1400&auto=format&fit=crop'
        ],
        imageCaption: 'Cảnh quan tuyệt đẹp của Đảo Kỳ Co'
      },
      {
        time: '12h00',
        activity: 'Ăn trưa tại nhà hàng trên đảo',
        description: `Thưởng thức các món hải sản tươi ngon:
→ Cua biển nướng muối ớt
→ Tôm hùm nướng bơ tỏi
→ Cá mú hấp gừng
→ Rau xào tỏi`,
        images: [
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=1400&auto=format&fit=crop'
        ],
        imageCaption: 'Hải sản tươi ngon tại đảo'
      },
      {
        time: '14h00',
        activity: 'Tham quan và chụp ảnh tại các điểm đẹp',
        description: `Khám phá những góc đẹp nhất của đảo:
→ Điểm chụp ảnh sống ảo với view biển tuyệt đẹp
→ Ghềnh đá tự nhiên với hình thù độc đáo
→ Bãi cát trắng mịn như tuyết
→ Rừng dừa xanh mát`,
        images: [
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1400&auto=format&fit=crop'
        ],
        imageCaption: 'Những góc chụp ảnh đẹp nhất'
      },
      {
        time: '16h30',
        activity: 'Trở về đất liền và kết thúc chương trình',
        description: `Kết thúc một ngày trải nghiệm tuyệt vời:
→ Lên cano trở về Nhơn Lý
→ Nhận lại đồ cá nhân
→ Chia tay và hẹn gặp lại`,
        images: [
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1400&auto=format&fit=crop'
        ],
        imageCaption: 'Hoàng hôn trên biển'
      }
    ],
    includedServices: [
      'Xe đưa đón từ Quy Nhơn',
      'Cano khứ hồi Nhơn Lý - Đảo Kỳ Co',
      'Hướng dẫn viên chuyên nghiệp',
      'Bữa trưa tại nhà hàng trên đảo',
      'Bảo hiểm du lịch',
      'Vé vào cổng các điểm tham quan',
      'Nước uống trên xe'
    ],
    excludedServices: [
      'Chi phí cá nhân',
      'Đồ uống có cồn',
      'Chi phí mua sắm',
      'Tip cho hướng dẫn viên',
      'Thuế VAT'
    ],
    policies: [
      'Trẻ em dưới 5 tuổi: Miễn phí (ngồi chung với bố mẹ)',
      'Trẻ em từ 5-9 tuổi: 50% giá tour',
      'Trẻ em từ 10 tuổi trở lên: Tính như người lớn',
      'Hủy tour trước 3 ngày: Hoàn 100%',
      'Hủy tour trước 1 ngày: Hoàn 50%',
      'Hủy tour trong ngày: Không hoàn tiền',
      'Thời tiết xấu có thể thay đổi lịch trình',
      'Khách hàng tự chịu trách nhiệm về sức khỏe khi tham gia các hoạt động mạo hiểm'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=1400&auto=format&fit=crop'
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];



