import { Button, Carousel, Col, Row, Typography, Card, Space } from 'antd';
import { PhoneOutlined, RocketOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { tours } from '../data/tours';
import { useState } from 'react';

const { Title, Paragraph, Text } = Typography;

// Hero slides với ảnh và thông tin tour tương ứng
const heroSlides = [
  {
    image: '/images/ld3.jpg',
    title: 'TOUR QUY NHƠN - PHÚ YÊN',
    subtitle: 'Biển xanh – Cát trắng – Trải nghiệm tuyệt vời',
    tour: tours.find(t => t.region === 'BinhDinh') || tours[0]
  },
  {
    image: '/images/clx/1.jpg',
    title: 'CÙ LAO XANH 1 NGÀY',
    subtitle: 'Khám phá đảo hoang sơ với Hải Đăng 120 năm tuổi',
    tour: tours.find(t => t.slug === 'cu-lao-xanh-1n') || tours[0]
  },
  {
    image: '/images/HK_KC_EG/1.jpg',
    title: 'KỲ CO – EO GIÓ – HÒN KHÔ',
    subtitle: 'Bãi cát vàng óng ánh và lặn ngắm san hô',
    tour: tours.find(t => t.slug === 'ky-co-eo-gio-hon-kho-1n') || tours[0]
  },
  {
    image: '/images/Thapcham.png',
    title: 'CỒN CHIM QUY NHƠN',
    subtitle: 'Khám phá "ốc đảo" giữa Đầm Thị Nại',
    tour: tours.find(t => t.slug === 'con-chim-quy-nhon-1n') || tours[0]
  }
];

const homeTours = tours.filter(t => t.region === 'BinhDinh');
const mtTours = tours.filter(t => t.region === 'MienTrungTayNguyen');
const mnTours = tours.filter(t => t.region === 'MienNam');
const mbTours = tours.filter(t => t.region === 'MienBac');

function Section({ title, data }: { title: string; data: typeof tours }) {
  return (
    <div className="section container">
      <div style={{ textAlign: 'center', margin: '48px 0 24px' }}>
        <Title level={2} style={{ marginBottom: 0 }}>{title}</Title>
      </div>
      <Row gutter={[24, 24]}>
        {data.map((t, idx) => (
          <Col xs={24} sm={12} md={12} lg={8} xl={6} key={idx}>
            <Link to={`/tour/${t.slug}`}>
              <Card
                hoverable
                className="tour-card"
                cover={
                  <div className="card-cover" style={{ backgroundImage: `url(${t.image})` }}>
                    {t.price && <span className="price-badge">{t.price}</span>}
                  </div>
                }
              >
                <Space direction="vertical" size={4} className="tour-meta">
                  <Text strong className="tour-title" style={{ fontSize: 16 }}>{t.title}</Text>
                  {!t.price && <Text type="warning">Liên hệ</Text>}
                </Space>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Đảm bảo heroSlides luôn có giá trị
  const safeHeroSlides = heroSlides || [];

  return (
    <>
      <div className="hero">
        <Carousel 
          autoplay 
          autoplaySpeed={4000}
          dots 
          className="hero-carousel"
          beforeChange={(from, to) => setCurrentSlide(to)}
          effect="fade"
        >
          {safeHeroSlides.map((slide, idx) => (
            <div key={idx} className="hero-slide">
              <img 
                src={slide?.image || '/images/ld3.jpg'} 
                alt={slide?.title || 'Tour'}
                onError={(e) => {
                  console.log('Image failed to load:', slide?.image);
                  e.currentTarget.src = '/images/ld3.jpg';
                }}
              />
            </div>
          ))}
        </Carousel>
        <div className="hero-cta">
          <Title level={2} style={{ color: 'white', margin: 0 }}>
            {safeHeroSlides[currentSlide]?.title || 'TOUR QUY NHƠN - PHÚ YÊN'}
          </Title>
          <Paragraph style={{ color: 'white', marginTop: 8 }}>
            {safeHeroSlides[currentSlide]?.subtitle || 'Biển xanh – Cát trắng – Trải nghiệm tuyệt vời'}
          </Paragraph>
          <Space>
            <Button type="primary" size="large" icon={<RocketOutlined />}>
              Đặt tour ngay
            </Button>
            <Button size="large" ghost icon={<PhoneOutlined />}>
              0377 28 06 97
            </Button>
          </Space>
        </div>
      </div>

      <Section title="TOUR QUY NHƠN - PHÚ YÊN" data={homeTours} />

      <div className="section alt">
        <Section title="TOUR MIỀN TRUNG & TÂY NGUYÊN" data={mtTours} />
      </div>

      <Section title="TOUR MIỀN NAM" data={mnTours} />

      <div className="section alt">
        <Section title="TOUR MIỀN BẮC" data={mbTours} />
      </div>
    </>
  );
}


