import { Layout, Menu, Card, Button, Table, Space, Tag, Modal, Form, Input, Select, Upload, message, Popconfirm, Typography, Row, Col, Divider, UploadProps, TimePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, UploadOutlined, SaveOutlined, CloseOutlined, DownloadOutlined, ImportOutlined, MinusCircleOutlined, ReloadOutlined, FileTextOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { tours, TourItem, ItineraryItem, ItineraryEntry } from '../data/tours';
import { TourDataManager } from '../data/TourDataManager';
import { useTours } from '../contexts/TourContext';
import dayjs from 'dayjs';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function AdminPage() {
  const { tours: toursData, addTour, updateTour, deleteTour, refreshTours, forceRefresh } = useTours();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTour, setEditingTour] = useState<TourItem | null>(null);
  const [form] = Form.useForm();

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
            onConfirm={() => handleDelete(record.id)}
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
    form.setFieldsValue({
      ...tour,
      itinerary: tour.itinerary.map((raw: ItineraryEntry) => {
        if (typeof raw === 'string') {
          return {
            activity: raw,
            images: '',
            time: undefined
          };
        }
        return {
          ...raw,
          images: raw.images?.join('\n') || '',
          time: raw.time ? dayjs(raw.time, 'HH:mm') : undefined
        };
      }), // Normalize legacy string items; convert images array to string and time to dayjs
      includedServices: tour.includedServices.join('\n'),
      excludedServices: tour.excludedServices.join('\n'),
      policies: tour.policies.join('\n'),
      gallery: tour.gallery?.join('\n') || ''
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    console.log('AdminPage - Deleting tour with id:', id);
    deleteTour(id);
    message.success('Xóa tour thành công!');
    // Don't force refresh - let the context handle the update
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      
      const tourData: TourItem = {
        id: editingTour?.id || Date.now().toString(),
        slug: values.slug,
        title: values.title,
        region: values.region,
        image: values.image,
        price: values.price,
        duration: values.duration,
        transport: values.transport,
        summary: '', // Empty summary since we removed the field
        itinerary: values.itinerary ? values.itinerary.map((item: any) => ({
          ...item,
          images: item.images ? item.images.split('\n').filter((img: string) => img.trim()) : [],
          time: item.time ? item.time.format('HH:mm') : item.time
        })) : [], // Process images from string to array and time from dayjs to string
        includedServices: values.includedServices.split('\n').filter((item: string) => item.trim()),
        excludedServices: values.excludedServices.split('\n').filter((item: string) => item.trim()),
        policies: values.policies.split('\n').filter((item: string) => item.trim()),
        gallery: values.gallery ? values.gallery.split('\n').filter((item: string) => item.trim()) : [],
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

  const handleExport = () => {
    const data = TourDataManager.exportTours();
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

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (TourDataManager.importTours(content)) {
        refreshTours(); // Refresh tours from context
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
      key: 'tours',
      label: 'Quản lý Tour',
    },
    {
      key: 'settings',
      label: 'Cài đặt',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} style={{ background: '#fff' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
            🛠️ Admin Panel
          </Title>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['tours']}
          items={menuItems}
          style={{ border: 'none' }}
        />
      </Sider>
      
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3} style={{ margin: 0 }}>
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
                  onClick={() => {
                    // Clear correct storage key and reload defaults
                    localStorage.removeItem('travel_tours_data');
                    // Also clear legacy key if present
                    localStorage.removeItem('tours');
                    forceRefresh();
                    message.success('Đã xóa dữ liệu bộ nhớ trình duyệt và làm mới!');
                  }}
                  size="large"
                >
                  Làm mới dữ liệu
                </Button>
                <Button 
                  icon={<EyeOutlined />}
                  onClick={() => {
                    console.log('Current tours:', toursData);
                    console.log('LocalStorage tours:', TourDataManager.loadTours());
                    message.info(`Hiện có ${toursData.length} tour trong hệ thống`);
                  }}
                  size="large"
                >
                  Kiểm tra dữ liệu
                </Button>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={handleAdd}
                  size="large"
                >
                  ➕ Thêm tour mới
                </Button>
                <Button 
                  icon={<FileTextOutlined />}
                  onClick={() => {
                    // Tạo tour mẫu nhanh
                    const quickTour = {
                      slug: `tour-mau-${Date.now()}`,
                      title: 'Tour mẫu - Chỉnh sửa tên',
                      region: 'BinhDinh',
                      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop',
                      price: 'Liên hệ',
                      duration: '1 ngày',
                      transport: 'Xe ô tô',
                      itinerary: [
                        {
                          time: dayjs('08:00', 'HH:mm'),
                          activity: 'Khởi hành',
                          description: 'Đón khách tại điểm hẹn'
                        },
                        {
                          time: dayjs('10:00', 'HH:mm'),
                          activity: 'Tham quan điểm đến',
                          description: 'Khám phá địa điểm nổi tiếng'
                        },
                        {
                          time: dayjs('12:00', 'HH:mm'),
                          activity: 'Ăn trưa',
                          description: 'Thưởng thức đặc sản địa phương'
                        },
                        {
                          time: dayjs('14:00', 'HH:mm'),
                          activity: 'Tiếp tục tham quan',
                          description: 'Khám phá thêm các điểm đến'
                        },
                        {
                          time: dayjs('16:00', 'HH:mm'),
                          activity: 'Kết thúc tour',
                          description: 'Trở về điểm đón ban đầu'
                        }
                      ],
                      includedServices: [
                        'Xe đưa đón',
                        'Hướng dẫn viên',
                        'Vé vào cổng',
                        'Bảo hiểm du lịch'
                      ],
                      excludedServices: [
                        'Ăn uống',
                        'Chi phí cá nhân',
                        'Thuế VAT'
                      ],
                      policies: [
                        'Trẻ em 0-4 tuổi: Miễn phí',
                        'Trẻ em 5-9 tuổi: 50% giá vé',
                        'Trẻ em từ 10 tuổi: 100% như người lớn'
                      ]
                    };
                    
                    form.setFieldsValue(quickTour);
                    setIsModalVisible(true);
                    message.success('Đã tạo tour mẫu! Bạn chỉ cần chỉnh sửa thông tin.');
                  }}
                  size="large"
                >
                  🚀 Tạo tour mẫu nhanh
                </Button>
              </Space>
            </Col>
          </Row>
        </Header>
        
        <Content style={{ padding: '24px', background: '#f5f5f5' }}>
          <Card>
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
            <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
              {editingTour ? '📝 Chỉnh sửa Tour' : '➕ Thêm Tour Mới'}
            </Title>
          </div>
        }
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        width={1000}
        style={{ top: 20 }}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            <CloseOutlined /> Hủy
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
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
          <Divider orientation="left" style={{ color: '#1890ff', fontWeight: 'bold' }}>
            📝 Thông tin cơ bản
          </Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label={<span style={{ fontWeight: 'bold', color: '#333' }}>🏷️ Tên tour</span>}
                rules={[{ required: true, message: 'Vui lòng nhập tên tour!' }]}
              >
                <Input 
                  placeholder="VD: Đảo Lý Sơn 2N1Đ" 
                  style={{ borderRadius: '6px' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="slug"
                label={<span style={{ fontWeight: 'bold', color: '#333' }}>🔗 Slug (URL)</span>}
                rules={[{ required: true, message: 'Vui lòng nhập slug!' }]}
              >
                <Input 
                  placeholder="dao-ly-son-2n1d" 
                  style={{ borderRadius: '6px' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="region"
                label={<span style={{ fontWeight: 'bold', color: '#333' }}>🗺️ Khu vực</span>}
                rules={[{ required: true, message: 'Vui lòng chọn khu vực!' }]}
              >
                <Select style={{ borderRadius: '6px' }}>
                  <Option value="BinhDinh">Bình Định</Option>
                  <Option value="MienTrungTayNguyen">Miền Trung & Tây Nguyên</Option>
                  <Option value="MienNam">Miền Nam</Option>
                  <Option value="MienBac">Miền Bắc</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="duration"
                label={<span style={{ fontWeight: 'bold', color: '#333' }}>⏱️ Thời gian</span>}
                rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
              >
                <Input 
                  placeholder="VD: 2 ngày 1 đêm" 
                  style={{ borderRadius: '6px' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="transport"
                label={<span style={{ fontWeight: 'bold', color: '#333' }}>🚗 Phương tiện</span>}
                rules={[{ required: true, message: 'Vui lòng nhập phương tiện!' }]}
              >
                <Input 
                  placeholder="VD: Ô tô + Máy bay" 
                  style={{ borderRadius: '6px' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label={<span style={{ fontWeight: 'bold', color: '#333' }}>💰 Giá tour</span>}
              >
                <Input 
                  placeholder="VD: 1,500,000đ/khách (để trống nếu liên hệ)" 
                  style={{ borderRadius: '6px' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label={<span style={{ fontWeight: 'bold', color: '#333' }}>🖼️ Hình ảnh chính</span>}
                rules={[{ required: true, message: 'Vui lòng nhập URL hình ảnh!' }]}
              >
                <Input 
                  placeholder="URL hình ảnh chính của tour" 
                  style={{ borderRadius: '6px' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left" style={{ color: '#1890ff', fontWeight: 'bold' }}>
            📋 Lịch trình tour chi tiết
          </Divider>

          <Form.Item
            name="itinerary"
            rules={[{ required: true, message: 'Vui lòng nhập lịch trình!' }]}
          >
            <Form.List name="itinerary">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card 
                      key={key} 
                      size="small" 
                      style={{ 
                        marginBottom: 20, 
                        background: '#fafafa',
                        border: '1px solid #e6f7ff',
                        borderRadius: '8px'
                      }}
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#1890ff', fontWeight: 'bold' }}>
                            Hoạt động #{name + 1}
                          </span>
                          <Button 
                            type="text" 
                            danger 
                            size="small"
                            icon={<MinusCircleOutlined />} 
                            onClick={() => remove(name)}
                          >
                            Xóa
                          </Button>
                        </div>
                      }
                    >
                     {/* Thông tin cơ bản - chỉ những trường bắt buộc */}
                     <Row gutter={16}>
                       <Col span={6}>
                         <Form.Item
                           {...restField}
                           name={[name, 'time']}
                           label={<span style={{ fontWeight: 'bold', color: '#333' }}>⏰ Thời gian</span>}
                           rules={[{ required: true, message: 'Nhập thời gian!' }]}
                         >
                           <TimePicker
                             format="HH:mm"
                             placeholder="Chọn thời gian"
                             style={{ width: '100%', borderRadius: '6px' }}
                           />
                         </Form.Item>
                       </Col>
                       <Col span={18}>
                         <Form.Item
                           {...restField}
                           name={[name, 'activity']}
                           label={<span style={{ fontWeight: 'bold', color: '#333' }}>🎯 Hoạt động</span>}
                           rules={[{ required: true, message: 'Nhập hoạt động!' }]}
                         >
                           <Input
                             placeholder="VD: Ăn sáng, Tham quan chùa, Check-in..."
                             style={{ borderRadius: '6px' }}
                           />
                         </Form.Item>
                       </Col>
                     </Row>

                     {/* Mô tả chi tiết - tùy chọn */}
                     <Form.Item
                       {...restField}
                       name={[name, 'description']}
                       label={<span style={{ fontWeight: 'bold', color: '#333' }}>📝 Mô tả chi tiết (tùy chọn)</span>}
                     >
                       <TextArea
                         rows={2}
                         placeholder="Mô tả ngắn gọn về hoạt động..."
                         style={{ borderRadius: '6px' }}
                       />
                     </Form.Item>

                     {/* Hình ảnh - tùy chọn */}
                     <Form.Item
                       {...restField}
                       name={[name, 'images']}
                       label={<span style={{ fontWeight: 'bold', color: '#333' }}>🖼️ Hình ảnh (tùy chọn - mỗi dòng 1 URL)</span>}
                     >
                       <TextArea
                         rows={2}
                         placeholder="URL hình ảnh 1&#10;URL hình ảnh 2"
                         style={{ borderRadius: '6px' }}
                       />
                     </Form.Item>

                     {/* Các trường nâng cao - có thể ẩn/hiện */}
                     <div style={{ marginTop: '16px', padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
                       <Text style={{ fontSize: '12px', color: '#666', fontWeight: 'bold' }}>
                         🔧 Tùy chọn nâng cao (không bắt buộc)
                       </Text>
                       
                       <Row gutter={16} style={{ marginTop: '12px' }}>
                         <Col span={12}>
                           <Form.Item
                             {...restField}
                             name={[name, 'dayTitle']}
                             label={<span style={{ fontSize: '12px', color: '#666' }}>📅 Tiêu đề ngày</span>}
                           >
                             <Input
                               placeholder="VD: NGÀY 1"
                               size="small"
                               style={{ borderRadius: '4px' }}
                             />
                           </Form.Item>
                         </Col>
                         <Col span={12}>
                           <Form.Item
                             {...restField}
                             name={[name, 'periodTitle']}
                             label={<span style={{ fontSize: '12px', color: '#666' }}>🌅 Thời gian</span>}
                           >
                             <Input
                               placeholder="VD: Sáng:, Chiều:"
                               size="small"
                               style={{ borderRadius: '4px' }}
                             />
                           </Form.Item>
                         </Col>
                       </Row>

                       <Row gutter={16}>
                         <Col span={16}>
                           <Form.Item
                             {...restField}
                             name={[name, 'locationTitle']}
                             label={<span style={{ fontSize: '12px', color: '#666' }}>📍 Địa điểm</span>}
                           >
                             <Input
                               placeholder="VD: Tháp Đôi:"
                               size="small"
                               style={{ borderRadius: '4px' }}
                             />
                           </Form.Item>
                         </Col>
                         <Col span={8}>
                           <Form.Item
                             {...restField}
                             name={[name, 'imageCaption']}
                             label={<span style={{ fontSize: '12px', color: '#666' }}>💬 Chú thích</span>}
                           >
                             <Input
                               placeholder="Chú thích hình ảnh"
                               size="small"
                               style={{ borderRadius: '4px' }}
                             />
                           </Form.Item>
                         </Col>
                       </Row>
                     </div>
                    </Card>
                  ))}
                  
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      style={{ 
                        height: '50px',
                        borderRadius: '8px',
                        border: '2px dashed #1890ff',
                        color: '#1890ff',
                        fontWeight: 'bold'
                      }}
                    >
                      ➕ Thêm hoạt động mới
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Divider orientation="left" style={{ color: '#1890ff', fontWeight: 'bold' }}>
            💼 Dịch vụ và chính sách
          </Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="includedServices"
                label={<span style={{ fontWeight: 'bold', color: '#333' }}>✅ Dịch vụ bao gồm</span>}
                rules={[{ required: true, message: 'Vui lòng nhập dịch vụ bao gồm!' }]}
              >
                <TextArea 
                  rows={5} 
                  placeholder="Mỗi dòng là một dịch vụ được bao gồm&#10;VD:&#10;- Vé tham quan các điểm du lịch&#10;- HDV chuyên nghiệp&#10;- Bảo hiểm du lịch"
                  style={{ borderRadius: '6px' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="excludedServices"
                label={<span style={{ fontWeight: 'bold', color: '#333' }}>❌ Dịch vụ không bao gồm</span>}
                rules={[{ required: true, message: 'Vui lòng nhập dịch vụ không bao gồm!' }]}
              >
                <TextArea 
                  rows={5} 
                  placeholder="Mỗi dòng là một dịch vụ không được bao gồm&#10;VD:&#10;- Vé máy bay khứ hồi&#10;- Chi phí cá nhân&#10;- Thuế VAT"
                  style={{ borderRadius: '6px' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="policies"
            label={<span style={{ fontWeight: 'bold', color: '#333' }}>📋 Chính sách và điều khoản</span>}
            rules={[{ required: true, message: 'Vui lòng nhập chính sách!' }]}
          >
            <TextArea 
              rows={5} 
              placeholder="Mỗi dòng là một điều khoản/chính sách&#10;VD:&#10;- Trẻ em dưới 5 tuổi miễn phí&#10;- Hủy tour trước 3 ngày hoàn 100%&#10;- Thời tiết xấu có thể thay đổi lịch trình"
              style={{ borderRadius: '6px' }}
            />
          </Form.Item>

          <Form.Item
            name="gallery"
            label={<span style={{ fontWeight: 'bold', color: '#333' }}>🖼️ Thư viện hình ảnh (tùy chọn)</span>}
          >
            <TextArea 
              rows={3} 
              placeholder="Mỗi dòng là một URL hình ảnh&#10;VD:&#10;https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              style={{ borderRadius: '6px' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}
