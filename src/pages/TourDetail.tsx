import { Button, Col, Row, Tabs, Typography, Space, Tag } from 'antd';
import { ShoppingCartOutlined, ClockCircleOutlined, CarOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { tours } from '../data/tours';

const { Title, Paragraph, Text } = Typography;

export default function TourDetail() {
  const { slug } = useParams();
  const tour = tours.find(t => t.slug === slug) ?? tours[0];
  const gallery = [tour.image];
  return (
    <div className="container section">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={14}>
          <div className="ratio-thumb" style={{ paddingTop: '56%', backgroundImage: `url(${gallery[0]})` }} />
        </Col>
        <Col xs={24} md={10}>
          <Title level={3}>{tour.title}</Title>
          <Space direction="vertical" size={12}>
            <Space size={12} wrap>
              <Tag icon={<ClockCircleOutlined />} color="default">Thời gian: {tour.duration}</Tag>
              <Tag icon={<CarOutlined />} color="default">Phương tiện: {tour.transport}</Tag>
              <Tag icon={<DollarCircleOutlined />} color="default">{tour.price ? `Giá: ${tour.price}` : 'Giá: Liên hệ'}</Tag>
            </Space>
            <Button type="primary" size="large" icon={<ShoppingCartOutlined />}>ĐẶT TOUR</Button>
          </Space>
        </Col>
      </Row>

      <div style={{ marginTop: 24 }}>
        <Tabs
          defaultActiveKey="detail"
          items={[
            {
              key: 'detail',
              label: 'Chi tiết',
              children: <Paragraph>{tour.summary}</Paragraph>,
            },
            {
              key: 'itinerary',
              label: 'Lịch trình',
              children: <ul>{tour.itinerary.map((s, i) => <li key={i}>{s}</li>)}</ul>,
            },
            {
              key: 'policy',
              label: 'Điều khoản chính sách',
              children: <ul>{tour.policy.map((s, i) => <li key={i}>{s}</li>)}</ul>,
            },
          ]}
        />
      </div>
    </div>
  );
}


