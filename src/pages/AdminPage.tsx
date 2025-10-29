import { Layout, Menu, Card, Button, Table, Space, Tag, Modal, Form, Input, Select, Upload, message, Popconfirm, Typography, Row, Col, Divider, UploadProps, TimePicker, Tabs, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, UploadOutlined, SaveOutlined, CloseOutlined, DownloadOutlined, ImportOutlined, MinusCircleOutlined, ReloadOutlined, FileTextOutlined, CameraOutlined, BoldOutlined, ItalicOutlined, UnorderedListOutlined, OrderedListOutlined, AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined, LinkOutlined, PictureOutlined, SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { tours, TourItem, ItineraryItem, ItineraryEntry } from '../data/tours';
import { TourDataManager } from '../data/TourDataManager';
import { useTours } from '../contexts/TourContext';
import dayjs from 'dayjs';
import RichTextEditor from '../components/RichTextEditor';
import ImageUpload from '../components/ImageUpload';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function AdminPage() {
  const { tours: toursData, addTour, updateTour, deleteTour, refreshTours, forceRefresh } = useTours();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTour, setEditingTour] = useState<TourItem | null>(null);
  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('visual');

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (image: string) => (
        <img 
          src={image} 
          alt="Tour" 
          style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }}
        />
      ),
    },
    {
      title: 'Tên tour',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Khu vực',
      dataIndex: 'region',
      key: 'region',
      render: (region: string) => {
        const regionMap: { [key: string]: string } = {
          'BinhDinh': 'Bình Định',
          'MienTrungTayNguyen': 'Miền Trung & Tây Nguyên',
          'MienNam': 'Miền Nam',
          'MienBac': 'Miền Bắc'
        };
        return <Tag color="blue">{regionMap[region] || region}</Tag>;
      },
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => price || 'Liên hệ',
    },
    {
      title: 'Thời gian',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: TourItem) => (
        <Space size="small">
          <Button 
            type="primary" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => window.open(`/tour/${record.slug}`, '_blank')}
          >
            Xem
          </Button>
          <Button 
            type="default" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa tour này?"
            onConfirm={() => handleDelete(record.id!)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button 
              type="primary" 
              danger 
              size="small" 
              icon={<DeleteOutlined />}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingTour(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (tour: TourItem) => {
    setEditingTour(tour);
    
    // Sử dụng itineraryText nếu có, nếu không thì convert từ itinerary cũ
    let itineraryText = '';
    
    if (tour.itineraryText) {
      // Tour mới có itineraryText
      itineraryText = tour.itineraryText;
    } else {
      // Tour cũ, convert từ itinerary
      itineraryText = tour.itinerary.map((item: any) => {
        if (typeof item === 'string') {
          return item;
        }
        
        let result = '';
        
        // Add time and activity if both exist
        if (item.time && item.activity) {
          result += `${item.time}: ${item.activity}`;
        } else if (item.activity) {
          result += item.activity;
        }
        
        // Add description with arrows
        if (item.description) {
          const descriptionLines = item.description.split('\n').filter((line: string) => line.trim());
          descriptionLines.forEach((line: string) => {
            if (line.trim()) {
              result += `\n→ ${line.trim()}`;
            }
          });
        }
        
        // Add images if exist
        if (item.images && item.images.length > 0) {
          item.images.forEach((image: string) => {
            result += `\n![Hình ảnh](${image})`;
          });
        }
        
        return result;
      }).join('\n\n');
    }
    
    // Sử dụng policiesText nếu có, nếu không thì convert từ policies cũ
    let policiesMarkdown = '';
    
    if (tour.policiesText) {
      // Tour mới có policiesText
      policiesMarkdown = tour.policiesText;
    } else {
      // Tour cũ, convert từ policies
      policiesMarkdown = tour.policies.join('\n');
    }
    
    form.setFieldsValue({
      ...tour,
      image: tour.image ? [tour.image] : [],
      itineraryText: itineraryText,
      policies: policiesMarkdown,
      includedServices: tour.includedServices.join('\n'),
      excludedServices: tour.excludedServices.join('\n'),
      gallery: tour.gallery || []
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id?: string) => {
    if (!id) {
      message.error('Không tìm thấy ID tour để xóa.');
      return;
    }
    console.log('AdminPage - Deleting tour with id:', id);
    console.log('AdminPage - Tours before deletion:', toursData.length);
    deleteTour(id);
    console.log('AdminPage - Tours after deletion:', toursData.length);
    message.success('Xóa tour thành công!');
    // Don't force refresh - let the context handle the update
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      
      // Convert Markdown content to itinerary format
      const itineraryMarkdown = values.itineraryText || '';
      
      // Extract images from markdown
      const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
      const images: string[] = [];
      let match;
      while ((match = imageRegex.exec(itineraryMarkdown)) !== null) {
        images.push(match[2]); // URL of the image
      }
      
      // Remove images from markdown for processing
      const itineraryWithoutImages = itineraryMarkdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '');
      const itineraryLines = itineraryWithoutImages.split('\n').filter((line: string) => line.trim());
      
      // Create itinerary items with time and description
      const itinerary = itineraryLines.map((line: string, index: number) => {
        // Check if line starts with time pattern (HH:mm:)
        const timeMatch = line.match(/^(\d{1,2}:\d{2}):\s*(.+)$/);
        if (timeMatch) {
          return {
            time: timeMatch[1],
            activity: timeMatch[2],
            description: '',
            images: images.length > 0 ? images : []
          };
        }
        
        // Check if line starts with arrow (→)
        if (line.trim().startsWith('→')) {
          return {
            time: '',
            activity: '',
            description: line.trim().substring(1).trim(),
            images: []
          };
        }
        
        // Regular line
        return {
          time: '',
          activity: line.trim(),
          description: '',
          images: []
        };
      });
      
      // Convert Markdown content to simple text for policies
      const policiesMarkdown = values.policies || '';
      const policiesText = policiesMarkdown
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/<u>(.*?)<\/u>/g, '$1') // Remove underline
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
        .replace(/!\[(.*?)\]\(.*?\)/g, '$1') // Remove images
        .replace(/^\s*[•\-\*\+]\s*/gm, '') // Remove bullet points
        .replace(/^\s*\d+\.\s*/gm, '') // Remove numbered lists
        .trim();
      
      const policiesLines = policiesText.split('\n').filter((item: string) => item.trim());
      
      const tourData: TourItem = {
        id: editingTour?.id || Date.now().toString(),
        slug: values.slug,
        title: values.title,
        region: values.region,
        image: Array.isArray(values.image) ? values.image[0] : values.image,
        price: values.price,
        duration: values.duration,
        transport: values.transport,
        summary: '', // Empty summary since we removed the field
        itinerary: itinerary,
        itineraryText: values.itineraryText, // Save raw markdown text
        includedServices: values.includedServices ? values.includedServices.split('\n').filter((item: string) => item.trim()) : [],
        excludedServices: values.excludedServices ? values.excludedServices.split('\n').filter((item: string) => item.trim()) : [],
        policies: policiesLines,
        policiesText: values.policies, // Save raw markdown text
        gallery: Array.isArray(values.gallery) ? values.gallery : [],
        createdAt: editingTour?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingTour) {
        updateTour(tourData);
        message.success('Cập nhật tour thành công!');
      } else {
        addTour(tourData);
        message.success('Thêm tour mới thành công!');
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleExport = async () => {
    const data = await TourDataManager.exportTours();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tours-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    message.success('Xuất dữ liệu thành công!');
  };

  const handleImport = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      if (await TourDataManager.importTours(content)) {
        await refreshTours(); // Refresh tours from context
        message.success('Nhập dữ liệu thành công!');
      } else {
        message.error('File không hợp lệ!');
      }
    };
    reader.readAsText(file);
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      handleImport(file);
      return false; // Prevent upload
    },
    showUploadList: false,
  };

  const menuItems = [
    {
      key: 'posts',
      label: 'Bài viết',
      icon: <FileTextOutlined />,
    },
    {
      key: 'tours',
      label: 'Quản lý tour',
      icon: <SettingOutlined />,
      children: [
        {
          key: 'all-tours',
          label: 'Tất cả tour',
        },
        {
          key: 'add-tour',
          label: 'Thêm mới tour',
        },
        {
          key: 'categories',
          label: 'Danh mục',
        },
      ],
    },
    {
      key: 'copy-protection',
      label: 'Copy Protection',
      icon: <SettingOutlined />,
    },
    {
      key: 'media-library',
      label: 'Thư viện ảnh',
      icon: <PictureOutlined />,
    },
    {
      key: 'flight-tickets',
      label: 'Vé máy bay',
      icon: <SettingOutlined />,
    },
    {
      key: 'video',
      label: 'Video',
      icon: <PictureOutlined />,
    },
    {
      key: 'media',
      label: 'Media',
      icon: <PictureOutlined />,
    },
    {
      key: 'pages',
      label: 'Trang',
      icon: <FileTextOutlined />,
    },
    {
      key: 'menu-management',
      label: 'Quản lý menu',
      icon: <SettingOutlined />,
    },
    {
      key: 'settings',
      label: 'Cài đặt',
      icon: <SettingOutlined />,
    },
    {
      key: 'theme-config',
      label: 'Cấu hình theme',
      icon: <SettingOutlined />,
    },
    {
      key: 'seo',
      label: 'Yoast SEO',
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }} className="admin-panel">
      {/* Dark Sidebar */}
      <Sider 
        width={collapsed ? 80 : 250} 
        className="admin-sidebar"
        collapsed={collapsed}
      >
        <div style={{ 
          padding: '20px', 
          borderBottom: '1px solid #3c434a',
          textAlign: 'center'
        }}>
          <Title level={4} style={{ 
            margin: 0, 
            color: '#fff',
            fontSize: collapsed ? '16px' : '18px'
          }}>
            {collapsed ? '🛠️' : '🛠️ Admin Panel'}
          </Title>
        </div>
        
        <Menu
          mode="inline"
          defaultSelectedKeys={['tours']}
          defaultOpenKeys={['tours']}
          items={menuItems}
          style={{ 
            border: 'none',
            background: '#23282d',
            color: '#fff'
          }}
          theme="dark"
        />
        
        <div style={{ 
          position: 'absolute', 
          bottom: '20px', 
          left: '20px', 
          right: '20px' 
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ 
              color: '#fff',
              width: '100%',
              height: '40px',
              border: '1px solid #3c434a'
            }}
          >
            {!collapsed && 'Thu gọn Menu'}
          </Button>
        </div>
      </Sider>
      
      <Layout>
        {/* White Header */}
        <Header className="admin-header" style={{ padding: '0 24px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3} style={{ margin: 0, color: '#333' }}>
                Quản lý Tour
              </Title>
            </Col>
            <Col>
              <Space>
                <Button 
                  icon={<DownloadOutlined />}
                  onClick={handleExport}
                  size="large"
                >
                  Xuất dữ liệu
                </Button>
                <Upload {...uploadProps}>
                  <Button 
                    icon={<ImportOutlined />}
                    size="large"
                  >
                    Nhập dữ liệu
                  </Button>
                </Upload>
                <Button 
                  icon={<ReloadOutlined />}
                  onClick={async () => {
                    await refreshTours();
                    message.success('Đã làm mới dữ liệu!');
                  }}
                  size="large"
                >
                  Làm mới dữ liệu
                </Button>
                <Button 
                  icon={<DeleteOutlined />}
                  onClick={async () => {
                    await TourDataManager.clearAllTours();
                    await refreshTours();
                    message.success('Đã xóa tất cả dữ liệu tour!');
                  }}
                  size="large"
                  danger
                >
                  Xóa tất cả dữ liệu
                </Button>
                <Button 
                  icon={<PlusOutlined />}
                  onClick={async () => {
                    await TourDataManager.saveTours(tours);
                    await refreshTours();
                    message.success('Đã khởi tạo dữ liệu mặc định!');
                  }}
                  size="large"
                  type="default"
                >
                  Khởi tạo dữ liệu mặc định
                </Button>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={handleAdd}
                  size="large"
                  className="admin-primary-btn"
                >
                  ➕ Thêm tour mới
                </Button>
              </Space>
            </Col>
          </Row>
        </Header>
        
        {/* Main Content */}
        <Content className="admin-content" style={{ padding: '24px' }}>
          <Card className="admin-card">
            <Table
              columns={columns}
              dataSource={toursData}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} tour`,
              }}
            />
          </Card>
        </Content>
      </Layout>

      <Modal
        title={
          <div style={{ textAlign: 'center' }}>
            <Title level={3} style={{ margin: 0, color: '#dc3232' }}>
              {editingTour ? '📝 Chỉnh sửa Tour' : '➕ Thêm Tour Mới'}
            </Title>
          </div>
        }
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        width={1200}
        style={{ top: 20 }}
        className="admin-modal"
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            <CloseOutlined /> Hủy
          </Button>,
          <Button key="save" type="primary" onClick={handleSave} className="admin-primary-btn">
            <SaveOutlined /> {editingTour ? 'Cập nhật' : 'Thêm mới'}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            region: 'BinhDinh',
          }}
        >
          {/* Single Form Card */}
          <Card style={{ borderRadius: '8px' }}>
            <Title level={3} style={{ color: '#333', marginBottom: '24px', textAlign: 'center' }}>
              📝 Thông tin Tour
            </Title>
            
            {/* Basic Info Row */}
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="title"
                  label="Tên tour"
                  rules={[{ required: true, message: 'Vui lòng nhập tên tour!' }]}
                >
                  <Input placeholder="VD: Đảo Lý Sơn 2N1Đ" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="slug"
                  label="Slug (URL)"
                  rules={[{ required: true, message: 'Vui lòng nhập slug!' }]}
                >
                  <Input placeholder="dao-ly-son-2n1d" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="region"
                  label="Khu vực"
                  rules={[{ required: true, message: 'Vui lòng chọn khu vực!' }]}
                >
                  <Select>
                    <Option value="BinhDinh">Bình Định</Option>
                    <Option value="MienTrungTayNguyen">Miền Trung & Tây Nguyên</Option>
                    <Option value="MienNam">Miền Nam</Option>
                    <Option value="MienBac">Miền Bắc</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  name="duration"
                  label="Thời gian"
                  rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
                >
                  <Input placeholder="VD: 2 ngày 1 đêm" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="transport"
                  label="Phương tiện"
                  rules={[{ required: true, message: 'Vui lòng nhập phương tiện!' }]}
                >
                  <Input placeholder="VD: Ô tô + Máy bay" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="price"
                  label="Giá tour"
                >
                  <Input placeholder="VD: 1,500,000đ/khách" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="image"
                  label="Hình ảnh chính"
                  rules={[{ required: true, message: 'Vui lòng chọn hình ảnh chính!' }]}
                >
                  <ImageUpload 
                    maxCount={1}
                    placeholder="Chọn hình ảnh chính cho tour"
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Lịch trình tour */}
            <Form.Item
              name="itineraryText"
              label="📋 Lịch trình tour"
              rules={[{ required: true, message: 'Vui lòng nhập lịch trình tour!' }]}
            >
              <RichTextEditor 
                placeholder={`Nhập lịch trình tour theo format sau:

08h45: Đến Nhơn Lý, Cano đưa quý khách di chuyển đến Đảo Kỳ Co
→ Chiêm ngưỡng bức tranh thiên nhiên tuyệt đẹp
→ Chụp ảnh lưu niệm
→ Ngâm mình trong làn nước trong xanh của bãi tắm Kỳ Co
→ Tham gia những trò chơi mạo hiểm khi leo lên cầu, ghềnh đá và nhảy xuống biển

12h00: Ăn trưa tại nhà hàng trên đảo
→ Cua biển nướng muối ớt
→ Tôm hùm nướng bơ tỏi
→ Cá mú hấp gừng
→ Rau xào tỏi

14h00: Tham quan và chụp ảnh tại các điểm đẹp
→ Điểm chụp ảnh sống ảo với view biển tuyệt đẹp
→ Ghềnh đá tự nhiên với hình thù độc đáo
→ Bãi cát trắng mịn như tuyết`}
                height={300}
              />
            </Form.Item>

            {/* Dịch vụ bao gồm */}
            <Form.Item
              name="includedServices"
              label="✅ Dịch vụ bao gồm"
              rules={[{ required: true, message: 'Vui lòng nhập dịch vụ bao gồm!' }]}
            >
              <TextArea 
                rows={4}
                placeholder={`Mỗi dòng là một dịch vụ được bao gồm
VD:
- Vé tham quan các điểm du lịch
- HDV chuyên nghiệp
- Bảo hiểm du lịch
- Xe đưa đón`}
                style={{ fontSize: '14px', lineHeight: '1.6' }}
              />
            </Form.Item>

            {/* Dịch vụ không bao gồm */}
            <Form.Item
              name="excludedServices"
              label="❌ Dịch vụ không bao gồm"
              rules={[{ required: true, message: 'Vui lòng nhập dịch vụ không bao gồm!' }]}
            >
              <TextArea 
                rows={4}
                placeholder={`Mỗi dòng là một dịch vụ không được bao gồm
VD:
- Vé máy bay khứ hồi
- Chi phí cá nhân
- Thuế VAT
- Đồ uống có cồn`}
                style={{ fontSize: '14px', lineHeight: '1.6' }}
              />
            </Form.Item>

            {/* Chính sách */}
            <Form.Item
              name="policies"
              label="📋 Chính sách"
              rules={[{ required: true, message: 'Vui lòng nhập chính sách!' }]}
            >
              <TextArea 
                rows={4}
                placeholder={`Mỗi dòng là một điều khoản/chính sách
VD:
- Trẻ em dưới 5 tuổi miễn phí
- Trẻ em từ 5-9 tuổi: 50% giá tour
- Hủy tour trước 3 ngày hoàn 100%
- Thời tiết xấu có thể thay đổi lịch trình`}
                style={{ fontSize: '14px', lineHeight: '1.6' }}
              />
            </Form.Item>

            {/* Thư viện hình ảnh */}
            <Form.Item
              name="gallery"
              label="🖼️ Thư viện hình ảnh (tùy chọn)"
            >
              <ImageUpload 
                maxCount={10}
                placeholder="Upload hình ảnh cho tour"
              />
            </Form.Item>
          </Card>
        </Form>
      </Modal>
    </Layout>
  );
}
