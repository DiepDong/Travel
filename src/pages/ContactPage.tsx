import { Row, Col, Typography, Button, Card, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function ContactPage() {
  // Thông tin mới theo yêu cầu
  const address = 'Tổ 45B, Khu Phố 30, P. Quy Nhơn Nam, Tỉnh Gia Lai';
  const phone = '0377280697';
  // Link chat trực tiếp
  const zaloLink = `https://zalo.me/${phone}`; // Zalo dùng số ĐT không dấu cách
  const messengerUsername = 'tamthangtravel'; // Đổi thành username trang/page Facebook của bạn
  const messengerLink = `https://m.me/${messengerUsername}`;
  // Bản đồ theo địa chỉ người dùng cung cấp (dùng query dạng output=embed)
  const mapsQuery = encodeURIComponent(address);
  const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&hl=vi&z=17&output=embed`;
  const mapsLink = `https://www.google.com/maps?q=${mapsQuery}`;

  return (
    <div className="section container">
      <Title level={2} style={{ textAlign: 'center' }}>Liên hệ</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card>
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Title level={4} style={{ marginBottom: 0 }}>CÔNG TY TNHH DV DU LỊCH TÂM THẮNG</Title>
              <Text strong>Địa chỉ:</Text>
              <Paragraph style={{ marginBottom: 8 }}>{address}</Paragraph>
              <Text strong>Điện thoại:</Text>
              <Paragraph style={{ marginBottom: 8 }}>{phone}</Paragraph>
              <Space>
                <Button type="primary" size="large" href={zaloLink} target="_blank" rel="noreferrer">
                  Chat Zalo
                </Button>
                <Button size="large" href={messengerLink} target="_blank" rel="noreferrer" style={{ background: '#1877F2', color: '#fff' }}>
                  Messenger
                </Button>
              </Space>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <a href={mapsLink} target="_blank" rel="noreferrer">Xem bản đồ lớn</a>
            <div style={{ width: '100%', height: 520, borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 24px rgba(2,30,84,.08)' }}>
            <iframe title="map" src={mapsEmbed} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
}


