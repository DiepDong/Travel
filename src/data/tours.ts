export type TourItem = {
  slug: string;
  title: string;
  region: 'BinhDinh' | 'MienTrungTayNguyen' | 'MienNam' | 'MienBac';
  image: string;
  price?: string;
  duration: string;
  transport: string;
  summary: string;
  itinerary: string[];
  policy: string[];
  gallery?: string[];
};

export const tours: TourItem[] = [
  {
    slug: 'dao-ly-son-2n1d',
    title: 'Đảo Lý Sơn 2N1Đ',
    region: 'MienTrungTayNguyen',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1400&auto=format&fit=crop',
    price: undefined,
    duration: '2 ngày 1 đêm',
    transport: 'Tàu cao tốc + Ô tô',
    summary: 'Khám phá đảo tỏi, check-in cổng Tò Vò, núi Thới Lới.',
    itinerary: ['Tàu ra đảo', 'Tham quan cổng Tò Vò', 'Núi Thới Lới', 'Chợ đêm Lý Sơn'],
    policy: ['Bao gồm vé tàu, phòng nghỉ', 'Không bao gồm bữa tối ngày tự do'],
  },
  {
    slug: 'da-nang-hoi-an-4n3d',
    title: 'Đà Nẵng – Hội An (4N3Đ)',
    region: 'MienTrungTayNguyen',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1400&auto=format&fit=crop',
    price: undefined,
    duration: '4 ngày 3 đêm',
    transport: 'Máy bay + Ô tô',
    summary: 'Bà Nà Hills, phố cổ Hội An và biển Mỹ Khê.',
    itinerary: ['Bà Nà Hills', 'Ngũ Hành Sơn', 'Phố cổ Hội An', 'Rừng dừa Cẩm Thanh'],
    policy: ['Bao gồm vé tham quan chính', 'Không bao gồm vé máy bay khứ hồi'],
  },
  {
    slug: 'tay-nam-bo-cuc-nam',
    title: 'Khám phá Tây Nam Bộ – Cực Nam Tổ Quốc',
    region: 'MienNam',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1400&auto=format&fit=crop',
    price: undefined,
    duration: '5 ngày 4 đêm',
    transport: 'Ô tô + Tàu',
    summary: 'Chợ nổi Cái Răng, Mũi Cà Mau, trải nghiệm miệt vườn.',
    itinerary: ['Mỹ Tho', 'Bến Tre', 'Cần Thơ – chợ nổi', 'Cà Mau – Mũi Cà Mau'],
    policy: ['Bao gồm hầu hết bữa ăn', 'Không bao gồm vé máy bay'],
  },
  {
    slug: 'ha-long-ninh-binh-sa-pa',
    title: 'Hạ Long – Ninh Bình – Sa Pa',
    region: 'MienBac',
    image: 'https://images.unsplash.com/photo-1470214304380-aadaedcfff86?q=80&w=1400&auto=format&fit=crop',
    price: undefined,
    duration: '5 ngày 4 đêm',
    transport: 'Ô tô + Tàu/xe giường nằm',
    summary: 'Di sản thiên nhiên Hạ Long, Tràng An và núi Fansipan.',
    itinerary: ['Vịnh Hạ Long', 'Tràng An – Ninh Bình', 'Sa Pa – Fansipan'],
    policy: ['Bao gồm vé tham quan chính', 'Không bao gồm cáp treo Fansipan'],
  },
  {
    slug: 'quy-nhon-city-tour',
    title: 'City Tour Quy Nhơn nửa ngày',
    region: 'BinhDinh',
    image: '/images/Thapcham.png',
    price: '500,000đ/khách',
    duration: 'Nửa ngày',
    transport: 'Ô tô',
    summary: 'Ghềnh Ráng – Tháp Đôi – Chùa Long Khánh – Quảng trường Nguyễn Sinh Sắc – Nguyễn Tất Thành. Khám phá văn hóa và lịch sử Quy Nhơn.',
    itinerary: [
      '14h00: Xe và HDV đón khách tại điểm hẹn',
      '15h00: Tham quan khu du lịch Ghềnh Ráng - dốc Mộng Cầm, đồi Thi Nhân, viếng mộ Hàn Mặc Tử, Bãi tắm Hoàng Hậu',
      '16h30: Tham quan Tháp Đôi - cụm tháp Chăm cổ kính từ thế kỷ XII',
      '17h00: Viếng thăm chùa Long Khánh - ngôi chùa cổ kính nhất tỉnh Bình Định',
      '18h00: Đoàn dùng bữa tối',
      '19h00: Tham quan Quảng trường Nguyễn Sinh Sắc – Nguyễn Tất Thành',
      '20h00: Kết thúc chương trình, trả khách'
    ],
    policy: [
      'Bao gồm: Xe ô tô đưa đón, HDV chuyên nghiệp, vé vào cổng các điểm tham quan, ăn 01 bữa chính (150.000đ/suất), bảo hiểm du lịch 20.000.000đ, nước suối + khăn lạnh',
      'Không bao gồm: Chi phí tham quan ngoài chương trình, thuế VAT, chi phí nước uống phát sinh, tiền tip',
      'Trẻ em 0-4 tuổi: Miễn phí (bố mẹ tự lo chi phí phát sinh)',
      'Trẻ em 5-9 tuổi: 50% giá vé người lớn',
      'Trẻ em từ 10 tuổi: 100% như người lớn'
    ],
    gallery: [
      '/images/Thapcham.png',
      '/images/longkhanh.png', 
      '/images/Quangtruong.png'
    ]
  },
  {
    slug: 'cu-lao-xanh-1n',
    title: 'Cù Lao Xanh 1 Ngày',
    region: 'BinhDinh',
    image: '/images/clx/1.jpg',
    price: '750,000đ/khách',
    duration: '1 ngày',
    transport: 'Xe ô tô + Cano',
    summary: 'Khám phá Cù Lao Xanh hoang sơ với Hải Đăng 120 năm tuổi, Bãi Đá Thảo Nguyên và lặn ngắm san hô đầy màu sắc.',
    itinerary: [
      '07h30: Xe và HDV đón khách tại điểm hẹn, di chuyển đến Bến Hàm Tử',
      '08h00: Đến Cù Lao Xanh, dừng chân nghỉ ngơi',
      '08h30: Tham quan ngọn Hải Đăng 120 năm tuổi - biểu tượng của ngư dân xã đảo',
      '09h30: Tham quan Bãi Đá Thảo Nguyên với muôn hình vạn trạng của đá',
      '10h00: Tắm biển và lặn ngắm san hô sống động tại Bãi Nam, Bãi Đá Hòn, Bãi Nhỏ',
      '11h30: Thưởng thức bữa trưa hải sản tươi sống, nghỉ trưa',
      '14h00: Lên cano khởi hành về Bến Hàm Tử, xe đưa về điểm đón',
      '15h30: Kết thúc chương trình, chia tay khách'
    ],
    policy: [
      'Bao gồm: Xe ô tô đưa đón, cano di chuyển khứ hồi Cù Lao Xanh, HDV chuyên nghiệp, vé vào cổng các điểm tham quan, ăn 01 bữa chính (160.000đ/suất), bảo hiểm du lịch 20.000.000đ, nước suối + khăn lạnh, tặng nón cho đoàn',
      'Không bao gồm: Chi phí tham quan ngoài chương trình, thuế VAT, chi phí nước uống phát sinh, tiền tip',
      'Trẻ em sinh từ 2021 đến nay: Miễn phí (bố mẹ tự lo chi phí phát sinh)',
      'Trẻ em sinh từ 2016-2020: 50% giá vé người lớn',
      'Trẻ em sinh từ 2015 trở về trước: 100% như người lớn',
      'Lưu ý: Mang theo giấy tờ tùy thân, chuẩn bị trang phục phù hợp, có mặt đúng giờ, tự bảo quản hành lý'
    ],
    gallery: [
      '/images/clx/1.jpg',
      '/images/clx/2.png',
      '/images/clx/3.png'
    ]
  },
  {
    slug: 'ky-co-eo-gio-hon-kho-1n',
    title: 'KỲ CO – EO GIÓ – HÒN KHÔ 1 Ngày',
    region: 'BinhDinh',
    image: '/images/HK_KC_EG/1.jpg',
    price: '850,000đ/khách',
    duration: '1 ngày',
    transport: 'Xe ô tô + Cano',
    summary: 'Khám phá Kỳ Co với bãi cát vàng óng ánh, Eo Gió - con đường thần thánh, và Hòn Khô hoang sơ. Trải nghiệm lặn ngắm san hô và tham quan Tịnh xá Ngọc Hòa.',
    itinerary: [
      '07h30: Xe và HDV đón khách tại điểm hẹn, di chuyển đi Nhơn Lý',
      '08h00: Dừng chân tại Đồi cát Phương Mai check-in, chụp ảnh độc đáo',
      '08h45: Cano đưa khách đến Đảo Kỳ Co, khám phá bãi cát vàng óng ánh',
      '09h30: Tham quan Cầu Yến, Cầu Trái Tim, Kỳ Co Resort và hang đá, suối nước',
      '10h00: Xem show biểu diễn xiếc hải cẩu dễ thương',
      '10h30: Lặn ngắm san hô và cá biển đầy màu sắc tại Bãi san hô',
      '11h30: Bữa trưa hải sản tươi sống tại nhà hàng, nghỉ ngơi',
      '13h30: Tham quan Eo Gió - ghềnh đá quanh năm lộng gió',
      '14h00: Tham quan Tịnh xá Ngọc Hòa - tượng Phật Quan thế Âm cao 30m',
      '14h30: Check-in Làng Bích Họa Nhơn Lý với những bức tường đa màu sắc',
      '15h00: Tham quan làng chài Nhơn Hải, Hòn Khô - tắm biển hoặc chèo SUP',
      '17h00: Ghé thăm Cửa hàng Đặc sản Bình Định, về Quy Nhơn',
      '18h00: Kết thúc chương trình, trả khách tại điểm đón'
    ],
    policy: [
      'Bao gồm: Xe ô tô đưa đón, cano di chuyển Kỳ Co khứ hồi, thuyền đi Hòn Khô, HDV chuyên nghiệp, vé vào cổng các điểm tham quan, xe trung chuyển đến Eo Gió, trang bị áo phao, kính lặn, phao nổi, ăn 01 bữa chính hải sản (160.000đ/suất), bảo hiểm du lịch 20.000.000đ, nước suối + khăn lạnh, tặng nón cho đoàn',
      'Không bao gồm: Chi phí tham quan ngoài chương trình, thuế VAT, chi phí nước uống phát sinh, tiền tip',
      'Lưu ý: Trường hợp thời tiết không cho phép - di chuyển bằng đường bộ, KHÔNG LẶN NGẮM SAN HÔ',
      'Trẻ em 0-4 tuổi: Miễn phí (bố mẹ tự lo chi phí phát sinh)',
      'Trẻ em 5-9 tuổi: 50% giá vé người lớn',
      'Trẻ em từ 10 tuổi: 100% như người lớn',
      'Trẻ em 5-10 tuổi (cao từ 1m2): phụ thu vé Kỳ Co 85.000đ/trẻ',
      'Lưu ý: Mang theo giấy tờ tùy thân, chuẩn bị trang phục phù hợp, có mặt đúng giờ, tự bảo quản hành lý'
    ],
    gallery: [
      '/images/HK_KC_EG/1.jpg',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop'
    ]
  },
  {
    slug: 'con-chim-quy-nhon-1n',
    title: 'CỒN CHIM QUY NHƠN 1 Ngày',
    region: 'BinhDinh',
    image: 'https://images.unsplash.com/photo-1506905925346-14b5e4c4b4b4?q=80&w=1400&auto=format&fit=crop',
    price: '750,000đ/khách',
    duration: '1 ngày',
    transport: 'Xe ô tô',
    summary: 'Khám phá "ốc đảo" Cồn Chim giữa Đầm Thị Nại - lá phổi xanh của Quy Nhơn. Trải nghiệm rừng ngập mặn, câu cá, chèo SUP và thưởng thức hải sản đặc trưng trên bè.',
    itinerary: [
      '08h30: Xe và HDV đón khách tại điểm hẹn, di chuyển đi Cồn Chim',
      '09h00: Đến Bến đò, qua Khu sinh thái Cồn Chim - "ốc đảo" giữa bốn bề xanh ngắt',
      '09h30: Xuôi theo dòng nước trên Đầm Thị Nại, hòa mình vào không khí trong lành',
      '10h00: Tham quan Ban Quản Lý Khu sinh thái - vườn ươm cây giống rừng ngập mặn',
      '10h30: Khám phá di tích Ao cá Bác Hồ, chụp ảnh rừng ngập mặn đặc trưng',
      '11h00: Tìm hiểu cuộc sống người dân Xóm Cồn Chim, trải nghiệm câu cá, giở lưới lồng',
      '11h30: Chèo SUP xuyên rừng ngập mặn, khám phá các hồ nhỏ đặc sắc',
      '12h05: Bữa trưa hải sản đặc trưng trên bè với món đặc sản nổi tiếng',
      '13h30: Nghỉ ngơi tại chỗ, tự do chụp ảnh kỷ niệm',
      '14h00: Di chuyển về lại điểm đón ban đầu',
      '15h00: Kết thúc chương trình, chia tay khách'
    ],
    policy: [
      'Bao gồm: Xe ô tô đưa đón, HDV chuyên nghiệp, vé vào cổng các điểm tham quan, ăn 01 bữa chính tiêu chuẩn, bảo hiểm du lịch 20.000.000đ, nước suối + khăn lạnh, tặng nón',
      'Không bao gồm: Chi phí tham quan ngoài chương trình, thuế VAT, chi phí nước uống phát sinh, tiền tip',
      'Trẻ em 0-4 tuổi: Miễn phí (bố mẹ tự lo chi phí phát sinh)',
      'Trẻ em 5-9 tuổi: 50% giá vé người lớn',
      'Trẻ em từ 10 tuổi: 100% như người lớn',
      'Lưu ý: Mang theo giấy tờ tùy thân, chuẩn bị trang phục phù hợp, có mặt đúng giờ, tự bảo quản hành lý',
      'Dịch vụ bổ sung: Chụp ảnh/Flycam kỷ niệm (chi phí tự túc)'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-14b5e4c4b4b4?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop'
    ]
  },
  {
    slug: 'ky-co-eo-gio-trung-luong-linh-phong-tu-1n',
    title: 'KỲ CO – EO GIÓ – TRUNG LƯƠNG 1 Ngày',
    region: 'BinhDinh',
    image: 'https://images.unsplash.com/photo-1506905925346-14b5e4c4b4b4?q=80&w=1400&auto=format&fit=crop',
    price: '825,000đ/khách',
    duration: '1 ngày',
    transport: 'Xe ô tô + Cano',
    summary: 'Khám phá Kỳ Co với bãi cát vàng óng ánh, Eo Gió - con đường thần thánh, khu dã ngoại Trung Lương và Tượng Phật Chùa Ông Núi cao nhất Đông Nam Á.',
    itinerary: [
      '07h30: Xe và HDV đón khách tại điểm hẹn, di chuyển đi Nhơn Lý',
      '08h00: Vượt qua Cầu Thị Nại, dừng chân tại Đồi cát Phương Mai check-in',
      '08h45: Cano đưa khách đến Đảo Kỳ Co, khám phá bãi cát vàng óng ánh',
      '09h30: Tham quan Cầu Yến, Cầu Trái Tim, Kỳ Co Resort và hang đá, suối nước',
      '10h00: Xem show biểu diễn xiếc hải cẩu dễ thương',
      '10h30: Lặn ngắm san hô và cá biển đầy màu sắc tại Bãi san hô',
      '11h00: Bữa trưa hải sản tươi sống tại nhà hàng, nghỉ ngơi',
      '13h00: Tham quan Eo Gió - ghềnh đá quanh năm lộng gió',
      '14h00: Tham quan Tịnh xá Ngọc Hòa - tượng Phật Quan thế Âm cao 30m',
      '14h30: Khám phá khu dã ngoại Trung Lương với khung cảnh lãng mạn như trời Tây',
      '15h45: Check-in Tượng Phật Chùa Ông Núi (Chùa Linh Phong) - cao 69m, đường kính chân 52m',
      '16h00: Ghé thăm Cửa hàng Đặc sản Bình Định, về Quy Nhơn',
      '17h30: Kết thúc chương trình, trả khách tại điểm đón'
    ],
    policy: [
      'Bao gồm: Xe ô tô đưa đón, cano di chuyển Kỳ Co khứ hồi, HDV chuyên nghiệp, vé vào cổng các điểm tham quan, xe trung chuyển đến Eo Gió, trang bị áo phao, kính lặn, phao nổi, ăn 01 bữa chính hải sản (160.000đ/suất), bảo hiểm du lịch 20.000.000đ, nước suối + khăn lạnh, tặng nón cho đoàn',
      'Không bao gồm: Chi phí tham quan ngoài chương trình, thuế VAT, chi phí nước uống phát sinh, tiền tip',
      'Lưu ý: Trường hợp thời tiết không cho phép - di chuyển bằng đường bộ, KHÔNG LẶN NGẮM SAN HÔ',
      'Trẻ em 0-4 tuổi: Miễn phí (bố mẹ tự lo chi phí phát sinh)',
      'Trẻ em 5-9 tuổi: 60% giá vé người lớn',
      'Trẻ em từ 10 tuổi: 100% như người lớn',
      'Trẻ em 5-10 tuổi (cao từ 1m2): phụ thu vé Kỳ Co 85.000đ/trẻ',
      'Lưu ý: Mang theo giấy tờ tùy thân, chuẩn bị trang phục phù hợp, có mặt đúng giờ, tự bảo quản hành lý'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-14b5e4c4b4b4?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop'
    ]
  },
  {
    slug: 'phu-yen-mui-dien-1n',
    title: 'PHÚ YÊN – MŨI ĐIỆN 1 Ngày',
    region: 'BinhDinh',
    image: 'https://images.unsplash.com/photo-1506905925346-14b5e4c4b4b4?q=80&w=1400&auto=format&fit=crop',
    price: '850,000đ/khách',
    duration: '1 ngày',
    transport: 'Xe ô tô',
    summary: 'Khám phá Phú Yên với Nhà thờ Mằng Lăng cổ kính, Gành Đá Đĩa kỳ thú, Mũi Điện - điểm cực đông của tổ quốc và Tháp Nghinh Phong độc đáo.',
    itinerary: [
      '07h30: Xe và HDV đón khách tại điểm hẹn, di chuyển đi Phú Yên',
      '09h15: Tham quan Nhà thờ Mằng Lăng - một trong những nhà thờ cổ nhất Việt Nam với kiến trúc Gothic, nơi lưu giữ cuốn sách bằng chữ Quốc ngữ đầu tiên',
      '10h00: Đến Gành Đá Đĩa - thắng cảnh thiên nhiên cấp quốc gia, trông như tổ ong đen bóng hay chồng đĩa trong lò gạch',
      '11h00: Bữa trưa tại nhà hàng trên Đầm Ô Loan, nghỉ ngơi tại chỗ',
      '13h30: Tham quan Mũi Điện (Mũi Đại Lãnh) - điểm cực đông của tổ quốc, Hải Đăng Mũi Điện cao 26,5m từ mặt đất và 110m theo mực nước biển',
      '14h30: Ghé thăm Cửa hàng Đặc sản Phú Yên, mua sắm đặc sản địa phương',
      '16h30: Tham quan Tháp Nghinh Phong - được lấy cảm hứng từ Ghềnh Đá Đĩa và truyền thuyết "Trăm trứng trăm con" của Lạc Long Quân và Âu Cơ',
      '17h30: Di chuyển về Quy Nhơn, trả khách tại điểm đón ban đầu',
      '19h00: Kết thúc chương trình, chia tay khách'
    ],
    policy: [
      'Bao gồm: Xe ô tô đưa đón, HDV chuyên nghiệp, vé vào cổng các điểm tham quan, ăn 01 bữa chính tiêu chuẩn (160.000đ/suất), bảo hiểm du lịch 20.000.000đ, nước suối + khăn lạnh, tặng nón cho đoàn',
      'Không bao gồm: Chi phí tham quan ngoài chương trình, thuế VAT, chi phí nước uống phát sinh, tiền tip',
      'Trẻ em 0-4 tuổi: Miễn phí (bố mẹ tự lo chi phí phát sinh)',
      'Trẻ em 5-9 tuổi: 50% giá vé người lớn',
      'Trẻ em từ 10 tuổi: 100% như người lớn',
      'Lưu ý: Mang theo giấy tờ tùy thân, chuẩn bị trang phục phù hợp, có mặt đúng giờ, tự bảo quản hành lý'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-14b5e4c4b4b4?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop'
    ]
  },
  {
    slug: 'tay-son-ham-ho-1n',
    title: 'TÂY SƠN – HẦM HÔ 1 Ngày',
    region: 'BinhDinh',
    image: 'https://images.unsplash.com/photo-1506905925346-14b5e4c4b4b4?q=80&w=1400&auto=format&fit=crop',
    price: '790,000đ/khách',
    duration: '1 ngày',
    transport: 'Xe ô tô',
    summary: 'Khám phá lịch sử Tây Sơn với Bảo Tàng Quang Trung, cây me 300 năm tuổi và trải nghiệm thiên nhiên hùng vĩ tại Hầm Hô. Tham quan Tháp Dương Long - tháp Chăm cao nhất Đông Nam Á.',
    itinerary: [
      '07h00: Xe và HDV đón khách tại điểm hẹn, di chuyển đi Tây Sơn',
      '08h30: Tham quan Bảo Tàng Quang Trung, viếng thăm điện Tây Sơn Tam Kiệt và các văn quan võ tướng',
      '09h00: Cầu nguyện đường học hành, quan trường, sự nghiệp đỗ đạt thăng tiến',
      '09h15: Chiêm ngưỡng cây me 300 năm tuổi và giếng nước trong vườn nhà Tây Sơn',
      '09h30: Thưởng thức Màn múa võ cổ truyền Bình Định và trống trận Tây Sơn (chi phí tự túc)',
      '10h00: Tham quan Khu du lịch Hầm Hô, hòa mình vào thiên nhiên hùng vĩ',
      '10h30: Trải nghiệm du ngoạn trên dòng sông Kút bằng thuyền gỗ tay chèo đặc biệt',
      '11h00: Tự do tham gia các hoạt động: Bơi thuyền Kayak, câu cá thư giãn (chi phí tự túc)',
      '11h30: Bữa trưa, nghỉ ngơi tại chỗ',
      '14h30: Tham quan Tháp Dương Long - quần thể ba ngọn tháp Chăm đẹp nhất Việt Nam',
      '15h00: Chiêm ngưỡng tháp giữa cao 42m, tháp Nam 36m và tháp Bắc 34m - tháp Chăm cao nhất Đông Nam Á',
      '16h30: Di chuyển về Quy Nhơn, ghé thăm Cửa hàng Đặc sản Bình Định',
      '18h00: Trả khách tại điểm đón ban đầu',
      '18h30: Kết thúc chương trình, chia tay khách'
    ],
    policy: [
      'Bao gồm: Xe ô tô đưa đón, HDV chuyên nghiệp, đi thuyền trên dòng sông Kút tại Hầm Hô, vé vào cổng các điểm tham quan, ăn 01 bữa chính tiêu chuẩn (160.000đ/suất), bảo hiểm du lịch 20.000.000đ, nước suối + khăn lạnh, tặng nón cho đoàn',
      'Không bao gồm: Chi phí tham quan ngoài chương trình, thuế VAT, chi phí show diễn võ thuật và trống trận Tây Sơn, chi phí nước uống phát sinh, tiền tip',
      'Trẻ em 0-4 tuổi: Miễn phí (bố mẹ tự lo chi phí phát sinh)',
      'Trẻ em 5-9 tuổi: 50% giá vé người lớn',
      'Trẻ em từ 10 tuổi: 100% như người lớn',
      'Lưu ý: Mang theo giấy tờ tùy thân, chuẩn bị trang phục phù hợp, có mặt đúng giờ, tự bảo quản hành lý',
      'Dịch vụ bổ sung: Màn múa võ cổ truyền Bình Định, trống trận Tây Sơn, bơi thuyền Kayak, câu cá (chi phí tự túc)'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-14b5e4c4b4b4?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop'
    ]
  },
  {
    slug: 'ky-co-eo-gio-1n-tt01',
    title: 'KỲ CO – EO GIÓ 1 Ngày',
    region: 'BinhDinh',
    image: 'https://images.unsplash.com/photo-1506905925346-14b5e4c4b4b4?q=80&w=1400&auto=format&fit=crop',
    price: '725,000đ/khách',
    duration: '1 ngày',
    transport: 'Xe ô tô + Cano',
    summary: 'Khám phá Kỳ Co với bãi cát vàng óng ánh, lặn ngắm san hô đầy màu sắc và tham quan Eo Gió - con đường thần thánh. Trải nghiệm show biểu diễn xiếc hải cẩu và Làng Bích Họa Nhơn Lý.',
    itinerary: [
      '07h30: Xe và HDV đón khách tại điểm hẹn, di chuyển đi Nhơn Lý',
      '08h00: Vượt qua Cầu Thị Nại, dừng chân tại Đồi cát Phương Mai check-in',
      '08h45: Cano đưa khách đến Đảo Kỳ Co, khám phá bãi cát vàng óng ánh',
      '09h30: Tham quan Cầu Yến, Cầu Trái Tim, Kỳ Co Resort và hang đá, suối nước',
      '10h00: Xem show biểu diễn xiếc hải cẩu dễ thương',
      '10h30: Lặn ngắm san hô và cá biển đầy màu sắc tại Bãi san hô',
      '11h00: Tự do tham gia các hoạt động: Đi bộ dưới đáy biển, Motor nước, Jetsky (chi phí tự túc)',
      '11h30: Bữa trưa hải sản tươi sống tại nhà hàng, nghỉ ngơi',
      '14h00: Tham quan Eo Gió - ghềnh đá quanh năm lộng gió, con đường thần thánh',
      '14h30: Tham quan Tịnh xá Ngọc Hòa - tượng Phật Quan thế Âm cao 30m',
      '15h00: Check-in Làng Bích Họa Nhơn Lý với những bức tường đa màu sắc',
      '16h00: Ghé thăm Cửa hàng Đặc sản Bình Định, về Quy Nhơn',
      '17h30: Trả khách tại điểm đón ban đầu',
      '18h00: Kết thúc chương trình, chia tay khách'
    ],
    policy: [
      'Bao gồm: Xe ô tô đưa đón, cano di chuyển Kỳ Co khứ hồi, HDV chuyên nghiệp, vé vào cổng các điểm tham quan, xe trung chuyển đến Eo Gió, trang bị áo phao, kính lặn, phao nổi, ăn 01 bữa chính hải sản (160.000đ/suất), bảo hiểm du lịch 20.000.000đ, nước suối + khăn lạnh, tặng nón cho đoàn',
      'Không bao gồm: Chi phí tham quan ngoài chương trình, thuế VAT, chi phí nước uống phát sinh, tiền tip',
      'Lưu ý: Trường hợp thời tiết không cho phép - di chuyển bằng đường bộ, KHÔNG LẶN NGẮM SAN HÔ',
      'Trẻ em 0-4 tuổi: Miễn phí (bố mẹ tự lo chi phí phát sinh)',
      'Trẻ em 5-9 tuổi: 50% giá vé người lớn',
      'Trẻ em từ 10 tuổi: 100% như người lớn',
      'Trẻ em 5-10 tuổi (cao từ 1m2): phụ thu vé Kỳ Co 85.000đ/trẻ',
      'Lưu ý: Mang theo giấy tờ tùy thân, chuẩn bị trang phục phù hợp, có mặt đúng giờ, tự bảo quản hành lý',
      'Dịch vụ bổ sung: Đi bộ dưới đáy biển, Motor nước, Jetsky (chi phí tự túc)'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-14b5e4c4b4b4?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop'
    ]
  },
  {
    slug: 'phu-yen-comprehensive-1n-tt02',
    title: 'PHÚ YÊN 1 Ngày',
    region: 'BinhDinh',
    image: 'https://images.unsplash.com/photo-1506905925346-14b5e4c4b4b4?q=80&w=1400&auto=format&fit=crop',
    price: '690,000đ/khách',
    duration: '1 ngày',
    transport: 'Xe ô tô',
    summary: 'Khám phá toàn diện Phú Yên với Nhà thờ Mằng Lăng cổ kính, Gành Đá Đĩa kỳ thú, Chùa Thanh Lương độc đáo, Tháp Nghinh Phong, Tháp Nhạn và Hồ điều hòa Hồ Sơn.',
    itinerary: [
      '07h30: Xe và HDV đón khách tại điểm hẹn, di chuyển đi Phú Yên',
      '09h15: Tham quan Nhà thờ Mằng Lăng - một trong những nhà thờ cổ nhất Việt Nam với kiến trúc Gothic, nơi lưu giữ cuốn sách bằng chữ Quốc ngữ đầu tiên',
      '10h00: Đến Gành Đá Đĩa - thắng cảnh thiên nhiên cấp quốc gia, trông như tổ ong đen bóng hay chồng đĩa trong lò gạch',
      '11h00: Bữa trưa tại nhà hàng trên Đầm Ô Loan, nghỉ ngơi tại chỗ',
      '13h30: Tham quan Chùa Thanh Lương - ngôi chùa độc đáo được làm từ san hô và gáo dừa với tượng phật Quan Âm nổi trên mặt hồ',
      '14h00: Tham quan Tháp Nghinh Phong - được lấy cảm hứng từ Ghềnh Đá Đĩa và truyền thuyết "Trăm trứng trăm con" của Lạc Long Quân và Âu Cơ',
      '15h00: Tham quan Hồ điều hòa Hồ Sơn - địa điểm được nhiều bạn trẻ yêu thích với không gian thoáng mát và cảnh đẹp',
      '15h30: Tham quan Tháp Nhạn - tiêu biểu cho nghệ thuật kiến trúc của người Chăm ở Phú Yên xưa, có giá trị lịch sử cao',
      '16h00: Ghé thăm Cửa hàng Đặc sản Phú Yên, mua sắm đặc sản địa phương',
      '17h00: Di chuyển về Quy Nhơn, trả khách tại điểm đón ban đầu',
      '18h30: Kết thúc chương trình, chia tay khách'
    ],
    policy: [
      'Bao gồm: Xe ô tô đưa đón, HDV chuyên nghiệp, vé vào cổng các điểm tham quan, ăn 01 bữa chính tiêu chuẩn (160.000đ/suất), bảo hiểm du lịch 20.000.000đ, nước suối + khăn lạnh, tặng nón cho đoàn',
      'Không bao gồm: Chi phí tham quan ngoài chương trình, thuế VAT, chi phí nước uống phát sinh, tiền tip',
      'Trẻ em 0-4 tuổi: Miễn phí (bố mẹ tự lo chi phí phát sinh)',
      'Trẻ em 5-9 tuổi: 50% giá vé người lớn',
      'Trẻ em từ 10 tuổi: 100% như người lớn',
      'Lưu ý: Mang theo giấy tờ tùy thân, chuẩn bị trang phục phù hợp, có mặt đúng giờ, tự bảo quản hành lý'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-14b5e4c4b4b4?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop'
    ]
  },
];



