import { Typography, Card, Row, Col, Space, Divider } from 'antd';
import { HeartOutlined, TeamOutlined, SafetyOutlined, TrophyOutlined, GlobalOutlined, StarOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function AboutPage() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))', 
        padding: '80px 0 60px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <Title level={1} style={{ color: 'white', fontSize: '3rem', marginBottom: '20px' }}>
            Tâm Thắng Travel
          </Title>
          <Title level={2} style={{ color: '#ffd700', fontSize: '1.5rem', fontWeight: 'normal' }}>
            "Có Tâm Ắt Sẽ Thắng"
          </Title>
          <Paragraph style={{ 
            color: 'white', 
            fontSize: '1.2rem', 
            maxWidth: '800px', 
            margin: '0 auto',
            lineHeight: '1.8'
          }}>
            Trong nhịp sống hiện đại ngày nay, du lịch không chỉ là nhu cầu nghỉ ngơi, thư giãn mà còn là cách con người tìm lại cân bằng, khám phá thế giới và kết nối yêu thương.
          </Paragraph>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 0' }}>
        {/* Introduction */}
        <Card style={{ marginBottom: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <Row gutter={[40, 40]} align="middle">
            <Col xs={24} lg={12}>
              <Title level={2} style={{ color: '#2c3e50', marginBottom: '20px' }}>
                Về Tâm Thắng Travel
              </Title>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                Ra đời với khát vọng mang đến những hành trình ý nghĩa và khác biệt, Công ty Du lịch Tâm Thắng Travel tự hào là một trong những đơn vị lữ hành uy tín tại Việt Nam, đồng hành cùng hàng ngàn du khách trong suốt những chuyến đi đầy cảm xúc.
              </Paragraph>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                Với phương châm "Có Tâm Ắt Sẽ Thắng", Tâm Thắng Travel xem chữ Tâm là nền tảng trong mọi hoạt động kinh doanh và phục vụ. Mỗi chuyến đi, mỗi hành trình mà chúng tôi mang đến đều chứa đựng sự tận tâm, tỉ mỉ và cam kết mang lại giá trị thật cho khách hàng.
              </Paragraph>
            </Col>
            <Col xs={24} lg={12}>
              <div style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                padding: '40px', 
                borderRadius: '15px',
                color: 'white',
                textAlign: 'center'
              }}>
                <HeartOutlined style={{ fontSize: '4rem', marginBottom: '20px', color: '#ffd700' }} />
                <Title level={3} style={{ color: 'white' }}>Tận Tâm Phục Vụ</Title>
                <Paragraph style={{ color: 'white', fontSize: '1.1rem' }}>
                  Đối với Tâm Thắng Travel, du lịch không chỉ là dịch vụ, mà còn là hành trình của niềm tin và trải nghiệm.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Vision & Mission */}
        <Card style={{ marginBottom: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <Title level={2} style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '40px' }}>
            💼 Tầm nhìn và sứ mệnh
          </Title>
          <Row gutter={[40, 40]}>
            <Col xs={24} md={12}>
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <TrophyOutlined style={{ fontSize: '3rem', color: '#667eea', marginBottom: '20px' }} />
                <Title level={3} style={{ color: '#2c3e50' }}>Tầm nhìn</Title>
                <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  Tâm Thắng Travel hướng đến mục tiêu trở thành thương hiệu du lịch đáng tin cậy hàng đầu tại Việt Nam, vươn tầm quốc tế với dịch vụ chuyên nghiệp, chất lượng vượt trội và phong cách phục vụ tận tâm.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <GlobalOutlined style={{ fontSize: '3rem', color: '#667eea', marginBottom: '20px' }} />
                <Title level={3} style={{ color: '#2c3e50' }}>Sứ mệnh</Title>
                <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  Mang đến cho khách hàng những chuyến đi an toàn, trọn vẹn và đầy cảm xúc, góp phần quảng bá hình ảnh đất nước Việt Nam tươi đẹp ra thế giới, đồng thời kết nối văn hóa – con người – thiên nhiên thông qua mỗi hành trình khám phá.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Services */}
        <Card style={{ marginBottom: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <Title level={2} style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '40px' }}>
            🧭 Lĩnh vực hoạt động
          </Title>
          <Row gutter={[30, 30]}>
            <Col xs={24} md={12} lg={6}>
              <Card style={{ textAlign: 'center', height: '100%', borderRadius: '10px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🏖️</div>
                <Title level={4}>Tour trong nước</Title>
                <Paragraph>
                  Khám phá các điểm đến nổi tiếng như Quy Nhơn, Phú Yên, Đà Nẵng, Nha Trang, Phú Quốc, Đà Lạt, Sa Pa, Hạ Long...
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card style={{ textAlign: 'center', height: '100%', borderRadius: '10px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>👥</div>
                <Title level={4}>Teambuilding - MICE</Title>
                <Paragraph>
                  Thiết kế các chương trình kết hợp du lịch – hội nghị – sự kiện – khen thưởng dành cho doanh nghiệp.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card style={{ textAlign: 'center', height: '100%', borderRadius: '10px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>✈️</div>
                <Title level={4}>Vé máy bay & Visa</Title>
                <Paragraph>
                  Cung cấp dịch vụ vé máy bay, khách sạn, visa – hộ chiếu nhanh chóng, uy tín, hỗ trợ 24/7.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card style={{ textAlign: 'center', height: '100%', borderRadius: '10px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🎯</div>
                <Title level={4}>Private Tour</Title>
                <Paragraph>
                  Dành cho nhóm nhỏ, gia đình muốn có trải nghiệm riêng tư, theo sở thích cá nhân.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Core Values */}
        <Card style={{ marginBottom: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <Title level={2} style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '40px' }}>
            🌿 Giá trị cốt lõi
          </Title>
          <Row gutter={[30, 30]}>
            <Col xs={24} md={12}>
              <Card style={{ height: '100%', borderRadius: '10px', border: '2px solid #667eea' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ textAlign: 'center' }}>
                    <HeartOutlined style={{ fontSize: '2.5rem', color: '#667eea' }} />
                    <Title level={4} style={{ marginTop: '10px' }}>Tận tâm phục vụ</Title>
                  </div>
                  <Paragraph>
                    Đặt khách hàng làm trung tâm của mọi hoạt động, lắng nghe và đáp ứng vượt mong đợi.
                  </Paragraph>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card style={{ height: '100%', borderRadius: '10px', border: '2px solid #667eea' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ textAlign: 'center' }}>
                    <StarOutlined style={{ fontSize: '2.5rem', color: '#667eea' }} />
                    <Title level={4} style={{ marginTop: '10px' }}>Chuyên nghiệp – Uy tín</Title>
                  </div>
                  <Paragraph>
                    Cam kết mang lại dịch vụ chất lượng, minh bạch và đáng tin cậy.
                  </Paragraph>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card style={{ height: '100%', borderRadius: '10px', border: '2px solid #667eea' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ textAlign: 'center' }}>
                    <TrophyOutlined style={{ fontSize: '2.5rem', color: '#667eea' }} />
                    <Title level={4} style={{ marginTop: '10px' }}>Sáng tạo – Linh hoạt</Title>
                  </div>
                  <Paragraph>
                    Không ngừng đổi mới trong sản phẩm du lịch, mang đến những hành trình mới mẻ, độc đáo.
                  </Paragraph>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card style={{ height: '100%', borderRadius: '10px', border: '2px solid #667eea' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ textAlign: 'center' }}>
                    <TeamOutlined style={{ fontSize: '2.5rem', color: '#667eea' }} />
                    <Title level={4} style={{ marginTop: '10px' }}>Hợp tác – Phát triển bền vững</Title>
                  </div>
                  <Paragraph>
                    Gắn kết chặt chẽ với đối tác, hướng đến sự phát triển lâu dài, thân thiện với môi trường.
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Team & Partners */}
        <Card style={{ marginBottom: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <Title level={2} style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '40px' }}>
            🧳 Đội ngũ nhân sự và đối tác
          </Title>
          <Row gutter={[40, 40]} align="middle">
            <Col xs={24} lg={12}>
              <Title level={3} style={{ color: '#2c3e50' }}>Đội ngũ chuyên nghiệp</Title>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Tâm Thắng Travel sở hữu đội ngũ nhân viên trẻ trung, năng động, chuyên nghiệp và giàu kinh nghiệm, luôn tận tâm trong từng chi tiết nhỏ nhất. Đội ngũ hướng dẫn viên du lịch của chúng tôi được đào tạo bài bản, có kiến thức sâu rộng về văn hóa, lịch sử, ẩm thực và con người địa phương.
              </Paragraph>
            </Col>
            <Col xs={24} lg={12}>
              <Title level={3} style={{ color: '#2c3e50' }}>Đối tác uy tín</Title>
              <Paragraph style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Chúng tôi hợp tác với hệ thống khách sạn, resort, hãng hàng không và đối tác du lịch hàng đầu trong và ngoài nước. Nhờ đó, Tâm Thắng Travel luôn đảm bảo chất lượng dịch vụ cao cấp, giá cả hợp lý và những chính sách ưu đãi tốt nhất cho khách hàng.
              </Paragraph>
            </Col>
          </Row>
        </Card>

        {/* Quality Commitment */}
        <Card style={{ marginBottom: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <Title level={2} style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '40px' }}>
            ✈️ Cam kết chất lượng
          </Title>
          <Row gutter={[30, 30]}>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <SafetyOutlined style={{ fontSize: '3rem', color: '#52c41a', marginBottom: '15px' }} />
                <Title level={4}>Chất lượng cao</Title>
                <Paragraph>Cung cấp sản phẩm du lịch chất lượng, minh bạch, đúng như quảng cáo.</Paragraph>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <SafetyOutlined style={{ fontSize: '3rem', color: '#52c41a', marginBottom: '15px' }} />
                <Title level={4}>An toàn tuyệt đối</Title>
                <Paragraph>Đảm bảo an toàn tuyệt đối cho du khách trong mọi chuyến đi.</Paragraph>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <StarOutlined style={{ fontSize: '3rem', color: '#52c41a', marginBottom: '15px' }} />
                <Title level={4}>Hài lòng tối đa</Title>
                <Paragraph>Giá cả hợp lý, dịch vụ tận tâm, mang đến sự hài lòng tối đa.</Paragraph>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Message to Customers */}
        <Card style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          borderRadius: '15px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          textAlign: 'center',
          color: 'white'
        }}>
          <Title level={2} style={{ color: 'white', marginBottom: '30px' }}>
            ❤️ Thông điệp gửi đến khách hàng
          </Title>
          <Paragraph style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'white', maxWidth: '900px', margin: '0 auto' }}>
            Mỗi chuyến đi là một câu chuyện, và Tâm Thắng Travel luôn mong muốn được trở thành người kể chuyện cùng bạn – nơi khởi nguồn của niềm vui, của những ký ức đẹp và những trải nghiệm không thể quên.
          </Paragraph>
          <Divider style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
          <Paragraph style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'white', maxWidth: '900px', margin: '0 auto' }}>
            Chúng tôi tin rằng, du lịch không chỉ là hành trình khám phá thế giới mà còn là hành trình khám phá chính mình. Tâm Thắng Travel sẽ luôn đồng hành cùng bạn trên mọi nẻo đường.
          </Paragraph>
          <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
            <Title level={3} style={{ color: '#ffd700', marginBottom: '10px' }}>
              "Có Tâm Ắt Sẽ Thắng"
            </Title>
            <Paragraph style={{ fontSize: '1.1rem', color: 'white', margin: 0 }}>
              Chúng tôi tin rằng sự hài lòng của khách hàng chính là chiến thắng lớn nhất!
            </Paragraph>
          </div>
        </Card>
      </div>
    </div>
  );
}

