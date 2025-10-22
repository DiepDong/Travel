import React, { useRef } from 'react';
import { Button, Tooltip, Upload, message } from 'antd';
import { 
  BoldOutlined, 
  ItalicOutlined, 
  UnderlineOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  LinkOutlined,
  PictureOutlined,
  MinusOutlined,
  ClearOutlined,
  QuestionCircleOutlined,
  UploadOutlined
} from '@ant-design/icons';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  height?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = '',
  onChange,
  placeholder = 'Nhập nội dung...',
  height = 200
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const formatText = (command: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);
    
    let newText = '';
    let newCursorPos = start;

    switch (command) {
      case 'bold':
        newText = beforeText + `**${selectedText}**` + afterText;
        newCursorPos = start + 2;
        break;
      case 'italic':
        newText = beforeText + `*${selectedText}*` + afterText;
        newCursorPos = start + 1;
        break;
      case 'underline':
        newText = beforeText + `<u>${selectedText}</u>` + afterText;
        newCursorPos = start + 3;
        break;
      case 'bullet':
        const lines = value.split('\n');
        const currentLine = value.substring(0, start).split('\n').length - 1;
        lines[currentLine] = lines[currentLine].replace(/^(\s*)(\*|\-|\+)?\s*/, '$1→ ');
        newText = lines.join('\n');
        break;
      case 'number':
        const lines2 = value.split('\n');
        const currentLine2 = value.substring(0, start).split('\n').length - 1;
        const lineNumber = currentLine2 + 1;
        lines2[currentLine2] = lines2[currentLine2].replace(/^(\s*)(\d+\.\s*)?/, `$1${lineNumber}. `);
        newText = lines2.join('\n');
        break;
      case 'link':
        const url = prompt('Nhập URL:');
        if (url) {
          newText = beforeText + `[${selectedText || 'Link'}](${url})` + afterText;
          newCursorPos = start + (selectedText ? selectedText.length : 4);
        }
        break;
      case 'image':
        // Trigger file upload directly
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const dataUrl = e.target?.result as string;
              
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const beforeText = value.substring(0, start);
              const afterText = value.substring(end);
              
              const newText = beforeText + `![Hình ảnh](${dataUrl})` + afterText;
              onChange?.(newText);
              message.success('Upload hình ảnh thành công!');
            };
            reader.readAsDataURL(file);
          }
        };
        fileInput.click();
        return;
      case 'hr':
        newText = beforeText + '\n---\n' + afterText;
        newCursorPos = start + 5;
        break;
      case 'clear':
        newText = beforeText + selectedText.replace(/\*\*(.*?)\*\*/g, '$1')
          .replace(/\*(.*?)\*/g, '$1')
          .replace(/<u>(.*?)<\/u>/g, '$1')
          .replace(/\[(.*?)\]\(.*?\)/g, '$1')
          .replace(/!\[(.*?)\]\(.*?\)/g, '$1') + afterText;
        break;
    }

    onChange?.(newText);
    
    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const uploadProps = {
    name: 'file',
    action: 'https://httpbin.org/post', // Mock upload endpoint
    beforeUpload: (file: File) => {
      // Convert file to data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        
        const textarea = textareaRef.current;
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const beforeText = value.substring(0, start);
          const afterText = value.substring(end);
          
          const newText = beforeText + `![Hình ảnh](${dataUrl})` + afterText;
          onChange?.(newText);
          message.success('Upload hình ảnh thành công!');
        }
      };
      reader.readAsDataURL(file);
      return false; // Prevent actual upload
    },
    showUploadList: false,
  };

  const content = value;

  return (
    <div style={{ border: '1px solid #d9d9d9', borderRadius: '6px', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ 
        background: '#f9f9f9',
        borderBottom: '1px solid #d9d9d9',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        <Tooltip title="In đậm">
          <Button 
            size="small" 
            icon={<BoldOutlined />} 
            onClick={() => formatText('bold')}
          />
        </Tooltip>
        <Tooltip title="In nghiêng">
          <Button 
            size="small" 
            icon={<ItalicOutlined />} 
            onClick={() => formatText('italic')}
          />
        </Tooltip>
        <Tooltip title="Gạch chân">
          <Button 
            size="small" 
            icon={<UnderlineOutlined />} 
            onClick={() => formatText('underline')}
          />
        </Tooltip>
        <Tooltip title="Danh sách có dấu đầu dòng">
          <Button 
            size="small" 
            icon={<UnorderedListOutlined />} 
            onClick={() => formatText('bullet')}
          />
        </Tooltip>
        <Tooltip title="Danh sách có số">
          <Button 
            size="small" 
            icon={<OrderedListOutlined />} 
            onClick={() => formatText('number')}
          />
        </Tooltip>
        <Tooltip title="Chèn liên kết">
          <Button 
            size="small" 
            icon={<LinkOutlined />} 
            onClick={() => formatText('link')}
          />
        </Tooltip>
        <Tooltip title="Chèn hình ảnh">
          <Button 
            size="small" 
            icon={<PictureOutlined />} 
            onClick={() => formatText('image')}
          />
        </Tooltip>
        <Tooltip title="Upload hình ảnh">
          <Upload {...uploadProps}>
            <Button size="small" icon={<UploadOutlined />} />
          </Upload>
        </Tooltip>
        <Tooltip title="Đường kẻ ngang">
          <Button 
            size="small" 
            icon={<MinusOutlined />} 
            onClick={() => formatText('hr')}
          />
        </Tooltip>
        <Tooltip title="Xóa định dạng">
          <Button 
            size="small" 
            icon={<ClearOutlined />} 
            onClick={() => formatText('clear')}
          />
        </Tooltip>
        <Tooltip title="Trợ giúp">
          <Button 
            size="small" 
            icon={<QuestionCircleOutlined />} 
            onClick={() => alert('Sử dụng các nút trên để định dạng văn bản. Chọn văn bản trước khi áp dụng định dạng.')}
          />
        </Tooltip>
      </div>

      {/* Text Area */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          height: `${height}px`,
          border: 'none',
          padding: '12px',
          fontSize: '14px',
          lineHeight: '1.6',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          resize: 'vertical',
          outline: 'none'
        }}
      />

    </div>
  );
};

export default RichTextEditor;