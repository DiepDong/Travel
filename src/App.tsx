import { Layout, Menu, Input, Button, Typography, Space, Divider, BackTop, Drawer } from 'antd';
import { PhoneOutlined, SearchOutlined, DownOutlined, MenuOutlined, FacebookOutlined, MessageOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useNavigationRefresh } from './hooks/useNavigationRefresh';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const menuItems: MenuProps['items'] = [
  { key: 'home', label: <Link to="/">TRANG CHỦ</Link> },
  { key: 'about', label: <Link to="/gioi-thieu">GIỚI THIỆU</Link> },
  {
    key: 'domestic',
    label: (
      <Space>
        <span>TOUR TRONG NƯỚC</span>
        <DownOutlined />
      </Space>
    ),
    children: [
      { key: 'bd', label: <Link to="/region/binhdinh">Quy Nhơn - Phú Yên</Link> },
      { key: 'mt', label: <Link to="/region/mientrung">Miền Trung & Tây Nguyên</Link> },
      { key: 'mn', label: <Link to="/region/miennam">Miền Nam</Link> },
      { key: 'mb', label: <Link to="/region/mienbac">Miền Bắc</Link> },
    ],
  },
  { key: 'news', label: <a>TIN TỨC</a> },
  // Removed 'VÉ MÁY BAY' per request
  { key: 'contact', label: <Link to="/lien-he">LIÊN HỆ</Link> },
];

// Layout only; pages are in routes via <Outlet />

export default function App() {
  const [openMenu, setOpenMenu] = useState(false);
  
  // Temporarily disable navigation refresh to fix routing issue
  // useNavigationRefresh();
  
  return (
    <Layout>
      <Header className="app-header">
        <div className="container header-inner">
          <div className="brand">
            <img src="/logo.jpg" alt="Tâm Thắng Travel" className="brand-logo" />
            <span>Tâm Thắng Travel</span>
          </div>
          <Menu mode="horizontal" items={menuItems} className="nav" selectedKeys={[]} />
          <Button className="menu-toggle" icon={<MenuOutlined />} onClick={() => setOpenMenu(true)} />
        </div>
      </Header>
      <Drawer
        title="Tâm Thắng Travel"
        placement="left"
        onClose={() => setOpenMenu(false)}
        open={openMenu}
        bodyStyle={{ padding: 0 }}
      >
        <Menu mode="inline" items={menuItems} style={{ borderRight: 0 }} selectedKeys={[]} />
      </Drawer>

      <Content>
        <Outlet />
      </Content>

      <Footer className="app-footer">
        <div className="container footer-grid">
          <div>
            <Title level={4} style={{ color: 'white' }}>VỀ CHÚNG TÔI</Title>
            <Paragraph style={{ color: '#d9e1e7' }}>
              Kinh nghiệm nhiều năm điều hành tour. Mang đến sự hài lòng với chi phí hợp lý.
            </Paragraph>
          </div>
          <div>
            <Title level={4} style={{ color: 'white' }}>THÔNG TIN HỮU ÍCH</Title>
            <Space direction="vertical">
              <Text className="footer-link">Hình thức thanh toán</Text>
              <Text className="footer-link">Chính sách hoàn hủy</Text>
            </Space>
          </div>
          <div>
            <Title level={4} style={{ color: 'white' }}>LIÊN HỆ</Title>
            <Space direction="vertical">
              <Text className="footer-link">Tổ 45B, Khu Phố 30, P. Quy Nhơn Nam, Tỉnh Gia Lai</Text>
              <Text className="footer-link">0377 28 06 97</Text>
              <Text className="footer-link">tamthangtravel@gmail.com</Text>
            </Space>
          </div>
        </div>
        <Divider style={{ borderColor: 'rgba(255,255,255,.2)' }} />
        <div className="container copyright">
          <Text style={{ color: '#b3c0c8' }}>
            © 2025 Tâm Thắng Travel. All rights reserved.
          </Text>
        </div>
      </Footer>

      <BackTop />
      <div className="contact-fabs">
        <a className="fab hotline" href="tel:0377280697">
          <span className="i"><img src="/icons/hotline.png" alt="Hotline" /></span>
          <span className="label">Hotline: 0377 280 697</span>
        </a>
        <a className="fab zalo" href="https://zalo.me/0377280697" target="_blank" rel="noreferrer">
          <span className="i"><img src="/icons/zalo.png" alt="Zalo" /></span>
          <span className="label">Zalo: 0377 280 697</span>
        </a>
        <a className="fab messenger" href="https://m.me/tamthangtravel" target="_blank" rel="noreferrer">
          <span className="i"><img src="/icons/mes.png" alt="Messenger" /></span>
          <span className="label">Messenger</span>
        </a>
      </div>
    </Layout>
  );
}


