import { Button, Col, Row, Tabs, Typography, Space, Tag, Card, Divider, List, Modal, Image, Timeline, Rate, Avatar, Affix } from 'antd';
import { ShoppingCartOutlined, ClockCircleOutlined, CarOutlined, DollarCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, EyeOutlined, StarOutlined, UserOutlined, ArrowLeftOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { tours, TourItem, ItineraryItem } from '../data/tours';
import { TourDataManager } from '../data/TourDataManager';
import { useTours } from '../contexts/TourContext';
import { useAutoRefreshTours } from '../hooks/useAutoRefreshTours';
import { useState, useEffect } from 'react';

const { Title, Paragraph, Text } = Typography;

// Helper function to format time
const formatTime = (time: string): string => {
  if (!time) return 'N/A';
  
  // If it's already in HH:mm format, return as is
  if (/^\d{2}:\d{2}$/.test(time)) {
    return time;
  }
  
  // If it's an ISO string, extract time part
  if (time.includes('T')) {
    const date = new Date(time);
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }
  
  return time;
};

export default function TourDetail() {
  const { slug } = useParams();
  const { getTourBySlug, tours: contextTours } = useTours();
  const [tour, setTour] = useState<TourItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  
  // Auto-refresh tours when they change (temporarily disabled)
  // useAutoRefreshTours();
  
  useEffect(() => {
    if (slug) {
      setLoading(true);
      // Always get fresh data from context first
      const contextTour = getTourBySlug(slug);
      if (contextTour) {
        setTour(contextTour);
      } else {
        // Fallback to default tours
        const defaultTour = tours.find(t => t.slug === slug);
        setTour(defaultTour || tours[0]);
      }
      setLoading(false);
    }
  }, [slug, getTourBySlug, contextTours]);

  // Update tour when contextTours changes
  useEffect(() => {
    if (slug && contextTours.length > 0) {
      const contextTour = getTourBySlug(slug);
      if (contextTour) {
        setTour(contextTour);
      }
    }
  }, [contextTours, slug, getTourBySlug]);

  // Scroll to top when component mounts or tour changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [slug]);

  if (loading || !tour) {
    return <div>Loading...</div>;
  }

  const gallery = tour.gallery || [tour.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  
  return (
    <div className="container section">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={14}>
          <div style={{ 
            position: 'relative',
            width: '100%',
            height: '450px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src={gallery[currentImageIndex]}
              alt={tour.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                cursor: 'pointer',
                display: 'block'
              }}
              onClick={() => setPreviewImage(gallery[currentImageIndex])}
              preview={false}
            />
            
            {/* Navigation Arrows */}
            {gallery.length > 1 && (
              <>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<LeftOutlined />}
                  onClick={prevImage}
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    background: 'rgba(0,0,0,0.6)',
                    border: 'none',
                    width: '40px',
                    height: '40px',
                    opacity: 0.8
                  }}
                />
                <Button
                  type="primary"
                  shape="circle"
                  icon={<RightOutlined />}
                  onClick={nextImage}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    background: 'rgba(0,0,0,0.6)',
                    border: 'none',
                    width: '40px',
                    height: '40px',
                    opacity: 0.8
                  }}
                />
              </>
            )}

            {/* Image Counter */}
            {gallery.length > 1 && (
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {currentImageIndex + 1} / {gallery.length}
              </div>
            )}

            {/* Dots Indicator */}
            {gallery.length > 1 && (
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px'
              }}>
                {gallery.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => goToImage(index)}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: index === currentImageIndex ? '#1890ff' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </Col>
        <Col xs={24} md={10}>
          <div style={{ padding: '24px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            {/* Tour Title */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Title level={2} style={{ color: '#1890ff', margin: '0 0 8px 0' }}>
                {tour.title}
              </Title>
            </div>

            {/* Tour Info Cards */}
            <div style={{ marginBottom: '24px' }}>
              <Row gutter={[12, 12]}>
                <Col span={24}>
                  <Card 
                    size="small" 
                    style={{ 
                      background: 'linear-gradient(135deg, #f6ffed 0%, #f0f9ff 100%)',
                      border: '2px solid #52c41a',
                      borderRadius: '8px'
                    }}
                  >
                    <Space align="center" style={{ width: '100%', justifyContent: 'center' }}>
                      <ClockCircleOutlined style={{ fontSize: '20px', color: '#52c41a' }} />
                      <Text strong style={{ fontSize: '16px', color: '#52c41a' }}>
                        Thời gian: {tour.duration}
                      </Text>
                    </Space>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card 
                    size="small" 
                    style={{ 
                      background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)',
                      border: '2px solid #1890ff',
                      borderRadius: '8px'
                    }}
                  >
                    <Space align="center" style={{ width: '100%', justifyContent: 'center' }}>
                      <CarOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
                      <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>
                        Phương tiện: {tour.transport}
                      </Text>
                    </Space>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card 
                    size="small" 
                    style={{ 
                      background: 'linear-gradient(135deg, #fff7e6 0%, #fff2cc 100%)',
                      border: '2px solid #faad14',
                      borderRadius: '8px'
                    }}
                  >
                    <Space align="center" style={{ width: '100%', justifyContent: 'center' }}>
                      <DollarCircleOutlined style={{ fontSize: '20px', color: '#faad14' }} />
                      <Text strong style={{ fontSize: '16px', color: '#faad14' }}>
                        {tour.price ? `Giá: ${tour.price}` : 'Giá: Liên hệ'}
                      </Text>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </div>


            {/* Booking Button */}
            <div style={{ textAlign: 'center' }}>
              <Button 
                type="primary" 
                size="large" 
                icon={<ShoppingCartOutlined />}
                onClick={() => setShowContactModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  height: '50px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(82, 196, 26, 0.3)',
                  width: '100%'
                }}
              >
                ĐẶT TOUR NGAY
              </Button>
              <div style={{ marginTop: '12px', fontSize: '12px', color: '#999' }}>
                🔒 Thanh toán an toàn • ✅ Xác nhận ngay lập tức
              </div>
            </div>
          </div>
        </Col>
      </Row>


      <div style={{ marginTop: 24 }}>
        <Tabs
          defaultActiveKey="detail"
          size="large"
          tabBarStyle={{
            marginBottom: '24px',
            background: 'white',
            borderRadius: '12px',
            padding: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
          items={[
            {
              key: 'itinerary',
              label: 'Lịch trình tour',
              children: (
                <div>
                  {/* Header Section */}
                  <Card 
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      marginBottom: '24px',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <Title level={2} style={{ color: 'white', margin: '0 0 8px 0' }}>
                        🗓️ Lịch trình tour
                      </Title>
                      <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
                        Chương trình tour chi tiết từng ngày
                      </Text>
                    </div>
                  </Card>

                  {/* Timeline Section */}
                  <Card 
                    style={{ 
                      borderRadius: '12px', 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      border: '2px solid #1890ff'
                    }}
                  >
        <div style={{ padding: '0 20px' }}>
          {tour.itinerary.map((rawItem, index) => {
            const item: ItineraryItem =
              typeof rawItem === 'string'
                ? { time: '', activity: rawItem }
                : rawItem;
            return (
            <div key={index} style={{ marginBottom: '32px' }}>
              {/* Day Title */}
              {item.dayTitle && (
                <div style={{
                  background: 'linear-gradient(135deg, #1890ff, #40a9ff)',
                  color: 'white',
                  padding: '20px 32px',
                  borderRadius: '16px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 32px rgba(24, 144, 255, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '-15px',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '-20px',
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                    filter: 'blur(20px)'
                  }} />
                  {item.dayTitle}
                </div>
              )}

              {/* Period Title */}
              {item.periodTitle && (
                <div style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1890ff',
                  marginBottom: '20px',
                  paddingLeft: '16px',
                  borderLeft: '6px solid #1890ff',
                  background: 'linear-gradient(90deg, rgba(24, 144, 255, 0.08), transparent)',
                  padding: '12px 20px',
                  borderRadius: '0 12px 12px 0',
                  position: 'relative',
                  boxShadow: '0 4px 16px rgba(24, 144, 255, 0.1)'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: '-3px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '12px',
                    height: '12px',
                    background: '#1890ff',
                    borderRadius: '50%',
                    boxShadow: '0 0 0 4px white, 0 0 0 6px rgba(24, 144, 255, 0.2)'
                  }} />
                  {item.periodTitle}
                </div>
              )}

              {/* Location Title */}
              {item.locationTitle && (
                <div style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  color: '#1890ff',
                  marginBottom: '20px',
                  paddingLeft: '16px',
                  background: 'linear-gradient(90deg, rgba(24, 144, 255, 0.12), transparent)',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: '2px solid rgba(24, 144, 255, 0.3)',
                  position: 'relative',
                  boxShadow: '0 6px 20px rgba(24, 144, 255, 0.15)'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '8px',
                    height: '8px',
                    background: '#1890ff',
                    borderRadius: '50%',
                    boxShadow: '0 0 0 3px white, 0 0 0 5px rgba(24, 144, 255, 0.2)'
                  }} />
                  {item.locationTitle}
                </div>
              )}

              {/* Activity Card */}
              <Card 
                style={{ 
                  borderRadius: '20px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                  marginBottom: '24px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
                bodyStyle={{ padding: '32px' }}
              >
                {/* Decorative elements */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, rgba(24, 144, 255, 0.08), transparent)',
                  borderRadius: '0 20px 0 120px'
                }} />
                
                <Row gutter={24} align="top">
                  <Col span={5}>
                    <div style={{
                      background: 'linear-gradient(135deg, #1890ff, #40a9ff)',
                      color: 'white',
                      padding: '16px 20px',
                      borderRadius: '16px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      minWidth: '100px',
                      boxShadow: '0 6px 20px rgba(24, 144, 255, 0.4)',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '-3px',
                        right: '-3px',
                        width: '12px',
                        height: '12px',
                        background: '#52c41a',
                        borderRadius: '50%',
                        border: '3px solid white',
                        boxShadow: '0 0 0 2px rgba(82, 196, 26, 0.3)'
                      }} />
                      {formatTime(item.time)}
                    </div>
                  </Col>
                  <Col span={19}>
                    <div>
                      <Text strong style={{ 
                        fontSize: '20px', 
                        color: '#1a1a1a', 
                        display: 'block',
                        marginBottom: '16px',
                        fontWeight: '700',
                        lineHeight: '1.5'
                      }}>
                        {item.activity}
                      </Text>
                      {item.description && (
                        <Text style={{ 
                          color: '#4a5568', 
                          fontSize: '16px', 
                          display: 'block',
                          marginTop: '12px',
                          lineHeight: '1.8',
                          background: 'rgba(24, 144, 255, 0.05)',
                          padding: '16px 20px',
                          borderRadius: '12px',
                          borderLeft: '6px solid rgba(24, 144, 255, 0.3)',
                          boxShadow: '0 4px 16px rgba(24, 144, 255, 0.1)'
                        }}>
                          {item.description}
                        </Text>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card>

              {/* Images */}
              {item.images && item.images.length > 0 && (
                <div style={{ marginTop: '24px' }}>
                  <Row gutter={[16, 16]}>
                    {item.images?.map((image, imgIndex) => (
                      <Col key={imgIndex} span={24 / (item.images?.length || 1)}>
                        <div style={{
                          borderRadius: '16px',
                          overflow: 'hidden',
                          boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-6px)';
                          e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                        }}
                        >
                          <Image
                            src={image}
                            alt={item.activity}
                            style={{
                              width: '100%',
                              height: '250px',
                              objectFit: 'cover',
                              borderRadius: '16px'
                            }}
                            preview={true}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                  {item.imageCaption && (
                    <div style={{
                      textAlign: 'center',
                      marginTop: '20px',
                      fontSize: '16px',
                      color: '#6b7280',
                      fontStyle: 'italic',
                      background: 'rgba(24, 144, 255, 0.08)',
                      padding: '16px 24px',
                      borderRadius: '12px',
                      border: '2px solid rgba(24, 144, 255, 0.15)',
                      boxShadow: '0 4px 16px rgba(24, 144, 255, 0.1)'
                    }}>
                      📸 {item.imageCaption}
                    </div>
                  )}
                </div>
              )}
            </div>
            );
          })}
        </div>
                  </Card>
                </div>
              ),
            },
            {
              key: 'included',
              label: 'Dịch vụ bao gồm',
              children: (
                <div>
                  {/* Header Section */}
                  <Card 
                    style={{ 
                      background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                      color: 'white',
                      marginBottom: '24px',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(82, 196, 26, 0.3)'
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <Title level={2} style={{ color: 'white', margin: '0 0 8px 0' }}>
                        ✅ Dịch vụ bao gồm
                      </Title>
                      <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
                        Những gì đã được bao gồm trong giá tour
                      </Text>
                    </div>
                  </Card>

                  {/* Included Services */}
                  <Card 
                    style={{ 
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      border: '2px solid #52c41a'
                    }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <CheckCircleOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
                      <Title level={4} style={{ color: '#52c41a', margin: '12px 0 8px 0' }}>
                        🎁 Dịch vụ đã bao gồm
                      </Title>
                    </div>
                    <List
                      dataSource={tour.includedServices}
                      renderItem={(item) => (
                        <List.Item style={{ padding: '12px 0', border: 'none' }}>
                          <Space align="start" style={{ width: '100%' }}>
                            <CheckCircleOutlined style={{ color: '#52c41a', marginTop: '4px', fontSize: '16px' }} />
                            <Text style={{ fontSize: '15px', lineHeight: '1.6', color: '#2c3e50' }}>
                              {item}
                            </Text>
                          </Space>
                        </List.Item>
                      )}
                    />
                  </Card>
                </div>
              ),
            },
            {
              key: 'excluded',
              label: 'Dịch vụ không bao gồm',
              children: (
                <div>
                  {/* Header Section */}
                  <Card 
                    style={{ 
                      background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)',
                      color: 'white',
                      marginBottom: '24px',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(255, 77, 79, 0.3)'
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <Title level={2} style={{ color: 'white', margin: '0 0 8px 0' }}>
                        ❌ Dịch vụ không bao gồm
                      </Title>
                      <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
                        Những chi phí cần thanh toán thêm
                      </Text>
                    </div>
                  </Card>

                  {/* Excluded Services */}
                  <Card 
                    style={{ 
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      border: '2px solid #ff4d4f'
                    }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <CloseCircleOutlined style={{ fontSize: '32px', color: '#ff4d4f' }} />
                      <Title level={4} style={{ color: '#ff4d4f', margin: '12px 0 8px 0' }}>
                        💰 Chi phí phát sinh
                      </Title>
                    </div>
                    <List
                      dataSource={tour.excludedServices}
                      renderItem={(item) => (
                        <List.Item style={{ padding: '12px 0', border: 'none' }}>
                          <Space align="start" style={{ width: '100%' }}>
                            <CloseCircleOutlined style={{ color: '#ff4d4f', marginTop: '4px', fontSize: '16px' }} />
                            <Text style={{ fontSize: '15px', lineHeight: '1.6', color: '#2c3e50' }}>
                              {item}
                            </Text>
                          </Space>
                        </List.Item>
                      )}
                    />
                  </Card>
                </div>
              ),
            },
            {
              key: 'policies',
              label: 'Chính sách và điều khoản',
              children: (
                <div>
                  {/* Header Section */}
                  <Card 
                    style={{ 
                      background: 'linear-gradient(135deg, #faad14 0%, #ffc53d 100%)',
                      color: 'white',
                      marginBottom: '24px',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(250, 173, 20, 0.3)'
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <Title level={2} style={{ color: 'white', margin: '0 0 8px 0' }}>
                        📋 Chính sách và điều khoản
                      </Title>
                      <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
                        Thông tin quan trọng về chính sách tour
                      </Text>
                    </div>
                  </Card>

                  {/* Policies Section */}
                  <Card 
                    style={{ 
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      border: '2px solid #faad14'
                    }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <InfoCircleOutlined style={{ fontSize: '32px', color: '#faad14' }} />
                      <Title level={4} style={{ color: '#faad14', margin: '12px 0 8px 0' }}>
                        📜 Điều khoản và chính sách
                      </Title>
                    </div>
                    <List
                      dataSource={tour.policies}
                      renderItem={(item) => (
                        <List.Item style={{ padding: '12px 0', border: 'none' }}>
                          <Space align="start" style={{ width: '100%' }}>
                            <InfoCircleOutlined style={{ color: '#faad14', marginTop: '4px', fontSize: '16px' }} />
                            <Text style={{ fontSize: '15px', lineHeight: '1.6', color: '#2c3e50' }}>
                              {item}
                            </Text>
                          </Space>
                        </List.Item>
                      )}
                    />
                  </Card>
                </div>
              ),
            }
          ]}
        />
      </div>

      {/* Modal for single image preview */}
      <Modal
        open={!!previewImage}
        onCancel={() => setPreviewImage(null)}
        footer={null}
        centered
        width="auto"
        style={{ maxWidth: '90vw' }}
      >
        {previewImage && (
          <Image
            src={previewImage}
            alt="Preview"
            style={{
              maxWidth: '100%',
              maxHeight: '80vh',
              objectFit: 'contain'
            }}
          />
        )}
      </Modal>

      {/* Contact Modal */}
      <Modal
        open={showContactModal}
        onCancel={() => setShowContactModal(false)}
        footer={null}
        centered
        width={500}
        title={
          <div style={{ textAlign: 'center' }}>
            <Title level={3} style={{ color: '#1890ff', margin: 0 }}>
              📞 Liên hệ đặt tour
            </Title>
            <Text style={{ color: '#666' }}>
              Chọn cách liên hệ thuận tiện nhất cho bạn
            </Text>
          </div>
        }
      >
        <div style={{ padding: '20px 0' }}>
          {/* Company Info */}
          <Card 
            style={{ 
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)',
              border: '2px solid #1890ff',
              borderRadius: '12px'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Title level={4} style={{ color: '#1890ff', margin: '0 0 8px 0' }}>
                🏢 TÂM THẮNG TRAVEL
              </Title>
              <Text style={{ color: '#666', fontSize: '14px' }}>
                Địa chỉ: Tổ 45 B, khu phố 30, phường Quy Nhơn Nam, tỉnh Gia Lai
              </Text>
            </div>
          </Card>

          {/* Contact Methods */}
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card 
                hoverable
                style={{ 
                  borderRadius: '12px',
                  border: '2px solid #52c41a',
                  cursor: 'pointer'
                }}
                onClick={() => window.open('tel:0337280697')}
              >
                <Space align="center" style={{ width: '100%', justifyContent: 'center' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    background: '#52c41a', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <span style={{ fontSize: '24px' }}>📞</span>
                  </div>
                  <div>
                    <Title level={5} style={{ margin: 0, color: '#52c41a' }}>
                      Gọi điện thoại
                    </Title>
                    <Text style={{ color: '#666', fontSize: '16px', fontWeight: 'bold' }}>
                      0337.28.06.97
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>

            <Col span={24}>
              <Card 
                hoverable
                style={{ 
                  borderRadius: '12px',
                  border: '2px solid #1890ff',
                  cursor: 'pointer'
                }}
                onClick={() => window.open('https://zalo.me/0337280697')}
              >
                <Space align="center" style={{ width: '100%', justifyContent: 'center' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    background: '#1890ff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <span style={{ fontSize: '24px' }}>💬</span>
                  </div>
                  <div>
                    <Title level={5} style={{ margin: 0, color: '#1890ff' }}>
                      Nhắn tin Zalo
                    </Title>
                    <Text style={{ color: '#666', fontSize: '16px', fontWeight: 'bold' }}>
                      0337.28.06.97
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>

            <Col span={24}>
              <Card 
                hoverable
                style={{ 
                  borderRadius: '12px',
                  border: '2px solid #faad14',
                  cursor: 'pointer'
                }}
                onClick={() => window.open('mailto:tamthangtravel@gmail.com')}
              >
                <Space align="center" style={{ width: '100%', justifyContent: 'center' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    background: '#faad14', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <span style={{ fontSize: '24px' }}>📧</span>
                  </div>
                  <div>
                    <Title level={5} style={{ margin: 0, color: '#faad14' }}>
                      Gửi email
                    </Title>
                    <Text style={{ color: '#666', fontSize: '16px', fontWeight: 'bold' }}>
                      tamthangtravel@gmail.com
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>

          {/* Additional Info */}
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            background: '#f8f9fa', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <Text style={{ color: '#666', fontSize: '14px' }}>
              ⏰ Thời gian làm việc: 8:00 - 20:00 (Thứ 2 - Chủ nhật)
            </Text>
            <br />
            <Text style={{ color: '#666', fontSize: '14px' }}>
              💬 Phản hồi nhanh trong vòng 15 phút
            </Text>
          </div>
        </div>
      </Modal>
    </div>
  );
}