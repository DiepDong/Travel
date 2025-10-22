import React, { useState } from 'react';
import { Upload, Button, Image, Modal, message } from 'antd';
import { UploadOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

interface ImageUploadProps {
  value?: string[];
  onChange?: (urls: string[]) => void;
  maxCount?: number;
  placeholder?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  value = [], 
  onChange, 
  maxCount = 10,
  placeholder = "Nhập URL hình ảnh hoặc upload file"
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [urlInput, setUrlInput] = useState('');

  const handleAddUrl = () => {
    if (urlInput.trim() && value.length < maxCount) {
      const newUrls = [...value, urlInput.trim()];
      onChange?.(newUrls);
      setUrlInput('');
      message.success('Thêm hình ảnh thành công!');
    } else if (value.length >= maxCount) {
      message.warning(`Tối đa ${maxCount} hình ảnh!`);
    }
  };

  const handleRemove = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index);
    onChange?.(newUrls);
    message.success('Xóa hình ảnh thành công!');
  };

  const handlePreview = (url: string) => {
    setPreviewImage(url);
    setPreviewVisible(true);
  };

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://httpbin.org/post', // Mock upload endpoint
    beforeUpload: (file: File) => {
      // Convert file to data URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (value.length < maxCount) {
          const newUrls = [...value, dataUrl];
          onChange?.(newUrls);
          message.success('Upload hình ảnh thành công!');
        } else {
          message.warning(`Tối đa ${maxCount} hình ảnh!`);
        }
      };
      reader.readAsDataURL(file);
      return false; // Prevent actual upload
    },
    showUploadList: false,
  };

  return (
    <div style={{ border: '1px dashed #d9d9d9', borderRadius: '6px', padding: '16px' }}>
      {/* URL Input */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Nhập URL hình ảnh..."
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              fontSize: '14px'
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleAddUrl()}
          />
          <Button 
            type="primary" 
            onClick={handleAddUrl}
            disabled={!urlInput.trim() || value.length >= maxCount}
          >
            Thêm URL
          </Button>
        </div>
        
        {/* File Upload */}
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} disabled={value.length >= maxCount}>
            Upload File ({value.length}/{maxCount})
          </Button>
        </Upload>
      </div>

      {/* Image Grid */}
      {value.length > 0 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
          gap: '8px',
          marginTop: '16px'
        }}>
          {value.map((url, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  border: '1px solid #d9d9d9'
                }}
                preview={false}
              />
              <div style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                display: 'flex',
                gap: '4px'
              }}>
                <Button
                  size="small"
                  icon={<EyeOutlined />}
                  onClick={() => handlePreview(url)}
                  style={{ 
                    background: 'rgba(0,0,0,0.5)', 
                    border: 'none',
                    color: 'white'
                  }}
                />
                <Button
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemove(index)}
                  danger
                  style={{ 
                    background: 'rgba(255,77,79,0.8)', 
                    border: 'none'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      <Modal
        open={previewVisible}
        title="Xem trước hình ảnh"
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width="80%"
        style={{ top: 20 }}
      >
        <Image
          src={previewImage}
          style={{ width: '100%' }}
          preview={false}
        />
      </Modal>
    </div>
  );
};

export default ImageUpload;

