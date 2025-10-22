import { Card, Col, Row, Typography, Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { tours } from '../data/tours';
import { TourDataManager } from '../data/TourDataManager';
import { useTours } from '../contexts/TourContext';
import { useAutoRefreshTours } from '../hooks/useAutoRefreshTours';
import { useState, useEffect } from 'react';
import { TourItem } from '../data/tours';

const { Title, Text } = Typography;

const regionNameMap: Record<string, string> = {
  binhdinh: 'TOUR QUY NHƠN - PHÚ YÊN',
  mientrung: 'TOUR MIỀN TRUNG & TÂY NGUYÊN',
  miennam: 'TOUR MIỀN NAM',
  mienbac: 'TOUR MIỀN BẮC',
};

const regionKeyMap: Record<string, any> = {
  binhdinh: 'BinhDinh',
  mientrung: 'MienTrungTayNguyen',
  miennam: 'MienNam',
  mienbac: 'MienBac',
};

export default function RegionPage() {
  const { region } = useParams();
  const { tours: contextTours } = useTours();
  const [toursList, setToursList] = useState<TourItem[]>([]);
  const key = regionKeyMap[region ?? 'binhdinh'];
  const title = regionNameMap[region ?? 'binhdinh'];

  // Auto-refresh tours when they change (temporarily disabled)
  // useAutoRefreshTours();

  useEffect(() => {
    // Always use context tours, never fallback to default tours
    setToursList(contextTours.filter(t => t.region === key));
  }, [region, key, contextTours]);

  // Force refresh when component mounts or when navigating
  useEffect(() => {
    // Always use context tours, never fallback to default tours
    setToursList(contextTours.filter(t => t.region === key));
  }, [region, key, contextTours]);

  return (
    <div className="section container">
      <div style={{ textAlign: 'center', margin: '24px 0 24px' }}>
        <Title level={2}>{title}</Title>
      </div>
      <Row gutter={[24, 24]}>
        {toursList.map((t, idx) => (
          <Col xs={24} sm={12} md={8} lg={6} key={idx}>
            <Link to={`/tour/${t.slug}`}>
              <Card hoverable cover={<div className="card-cover" style={{ backgroundImage: `url(${t.image})` }} />}>
                <Space direction="vertical" size={4} style={{ height: '100%' }}>
                  <Text strong className="tour-title">{t.title}</Text>
                  <div className="tour-meta">
                    {t.price ? <Text strong style={{ color: '#fa8c16' }}>{t.price}</Text> : <Text type="warning">Liên hệ</Text>}
                  </div>
                </Space>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}



