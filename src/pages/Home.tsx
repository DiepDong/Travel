import { Button, Carousel, Col, Row, Typography, Card, Space } from 'antd';
import { PhoneOutlined, RocketOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { tours } from '../data/tours';
import { useTours } from '../contexts/TourContext';
import { useAutoRefreshTours } from '../hooks/useAutoRefreshTours';
import { useMemo } from 'react';

const { Title, Paragraph, Text } = Typography;

const heroImages = [
  '/Hero/gen-n-1.jpg',
  '/Hero/gen-n-2.jpg',
  '/Hero/gen-n-3.jpg',
];

function Section({ title, data }: { title: string; data: typeof tours }) {
  // Only render section if there are tours
  if (!data || data.length === 0) {
    return null;
  }

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
  const { tours: contextTours } = useTours();
  
  // Auto-refresh tours when they change (temporarily disabled)
  // useAutoRefreshTours();

  // Always use context tours, never fallback to default tours
  const allTours = contextTours;
  
  // Memoize filtered tours for performance
  const homeTours = useMemo(() => allTours.filter(t => t.region === 'BinhDinh'), [allTours]);
  const mtTours = useMemo(() => allTours.filter(t => t.region === 'MienTrungTayNguyen'), [allTours]);
  const mnTours = useMemo(() => allTours.filter(t => t.region === 'MienNam'), [allTours]);
  const mbTours = useMemo(() => allTours.filter(t => t.region === 'MienBac'), [allTours]);

  // Create sections array with data and styling info
  const sections = [
    { title: "TOUR BÌNH ĐỊNH - PHÚ YÊN", data: homeTours, alt: false },
    { title: "TOUR MIỀN TRUNG & TÂY NGUYÊN", data: mtTours, alt: true },
    { title: "TOUR MIỀN NAM", data: mnTours, alt: false },
    { title: "TOUR MIỀN BẮC", data: mbTours, alt: true },
  ];

  return (
    <>
      <div className="hero">
        <Carousel autoplay dots className="hero-carousel">
          {heroImages.map((src, idx) => (
            <div key={idx} className="hero-slide">
              <img 
                src={src} 
                alt={`Hero image ${idx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center'
                }}
                onError={(e) => {
                  console.error('Failed to load image:', src);
                  e.currentTarget.style.display = 'none';
                }}
                onLoad={() => {
                  console.log('Successfully loaded image:', src);
                }}
              />
            </div>
          ))}
        </Carousel>
        <div className="hero-cta">
          <Title level={2} style={{ color: 'white', margin: 0 }}>TOUR BÌNH ĐỊNH - PHÚ YÊN</Title>
          <Paragraph style={{ color: 'white', marginTop: 8 }}>Biển xanh – Cát trắng – Trải nghiệm tuyệt vời</Paragraph>
          <Space>
            <Button type="primary" size="large" icon={<RocketOutlined />}>Đặt tour ngay</Button>
            <Button size="large" ghost icon={<PhoneOutlined />}>0377 28 06 97</Button>
          </Space>
        </div>
      </div>

      {sections.map((section, index) => {
        if (!section.data || section.data.length === 0) {
          return null; // Don't render empty sections
        }
        
        return (
          <div key={index} className={section.alt ? "section alt" : "section"}>
            <Section title={section.title} data={section.data} />
          </div>
        );
      })}
    </>
  );
}


