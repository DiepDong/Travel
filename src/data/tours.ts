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
};

export const tours: TourItem[] = [
  {
    slug: 'dam-sen-mui-vi-rong',
    title: 'Đầm Sen – Mũi Vi Rồng',
    region: 'BinhDinh',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop',
    price: '725,000đ',
    duration: '1 ngày',
    transport: 'Ô tô',
    summary: 'Khám phá Mũi Vi Rồng và trải nghiệm Đầm Sen hoang sơ.',
    itinerary: ['Đón khách', 'Tham quan Mũi Vi Rồng', 'Ăn trưa hải sản', 'Đầm Sen – tắm biển', 'Trả khách'],
    policy: ['Bao gồm xe, HDV, ăn trưa', 'Không bao gồm chi tiêu cá nhân'],
  },
  {
    slug: 'ky-co-eo-gio-1n',
    title: 'Kỳ Co – Eo Gió 1 Ngày',
    region: 'BinhDinh',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop',
    price: undefined,
    duration: '1 ngày',
    transport: 'Ca nô + Ô tô',
    summary: 'Nước biển trong xanh, bãi cát trắng mịn, view Eo Gió hùng vĩ.',
    itinerary: ['Ca nô ra Kỳ Co', 'Lặn ngắm san hô', 'Ăn trưa hải sản', 'Check-in Eo Gió'],
    policy: ['Bao gồm vé cano và bữa trưa', 'Không bao gồm VAT'],
  },
  {
    slug: 'hon-kho-lan-san-ho',
    title: 'Hòn Khô – Lặn ngắm san hô',
    region: 'BinhDinh',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1400&auto=format&fit=crop',
    price: '870,000đ',
    duration: '1 ngày',
    transport: 'Ca nô',
    summary: 'Thiên đường san hô gần bờ, trải nghiệm chèo SUP.',
    itinerary: ['Di chuyển ra Hòn Khô', 'Chèo SUP', 'Snorkeling san hô', 'Ăn trưa', 'Tự do tắm biển'],
    policy: ['Bao gồm áo phao, SUP, HDV', 'Không bao gồm chi phí phát sinh cá nhân'],
  },
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
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1400&auto=format&fit=crop',
    price: '350,000đ',
    duration: '1/2 ngày',
    transport: 'Ô tô',
    summary: 'Chùa Long Khánh, Ghềnh Ráng – mộ Hàn Mặc Tử, biển Quy Nhơn.',
    itinerary: ['Chùa Long Khánh', 'Ghềnh Ráng', 'Tắm biển Quy Nhơn'],
    policy: ['Bao gồm vé tham quan', 'Không bao gồm bữa ăn'],
  },
];


