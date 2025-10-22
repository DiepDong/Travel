// Image Storage Service - Quản lý ảnh local với ID ngắn
class ImageStorageService {
  private static instance: ImageStorageService;
  private imageMap: Map<string, string> = new Map(); // ID -> Data URL
  private nextId: number = 1;

  static getInstance(): ImageStorageService {
    if (!ImageStorageService.instance) {
      ImageStorageService.instance = new ImageStorageService();
    }
    return ImageStorageService.instance;
  }

  // Lưu ảnh và trả về ID ngắn
  saveImage(dataUrl: string, fileName: string): string {
    const id = `img_${this.nextId++}_${Date.now()}`;
    this.imageMap.set(id, dataUrl);
    
    // Lưu vào localStorage để persist
    this.saveToLocalStorage();
    
    return id;
  }

  // Lấy ảnh từ ID
  getImage(id: string): string | null {
    return this.imageMap.get(id) || null;
  }

  // Tạo URL ngắn cho markdown
  createImageMarkdown(id: string, fileName: string): string {
    return `![${fileName}](@${id})`;
  }

  // Parse markdown và thay thế @id bằng data URL thật
  parseMarkdown(markdown: string): string {
    return markdown.replace(/!\[([^\]]*)\]\(@([^)]+)\)/g, (match, alt, id) => {
      const dataUrl = this.getImage(id);
      if (dataUrl) {
        return `![${alt}](${dataUrl})`;
      }
      return match; // Giữ nguyên nếu không tìm thấy
    });
  }

  // Lưu vào localStorage
  private saveToLocalStorage(): void {
    try {
      const data = Array.from(this.imageMap.entries());
      localStorage.setItem('imageStorage', JSON.stringify(data));
    } catch (error) {
      console.warn('Không thể lưu ảnh vào localStorage:', error);
    }
  }

  // Load từ localStorage
  loadFromLocalStorage(): void {
    try {
      const data = localStorage.getItem('imageStorage');
      if (data) {
        const entries = JSON.parse(data);
        this.imageMap = new Map(entries);
        
        // Tìm ID lớn nhất để tiếp tục đánh số
        let maxId = 0;
        for (const [id] of this.imageMap) {
          const match = id.match(/img_(\d+)_/);
          if (match) {
            const num = parseInt(match[1]);
            if (num > maxId) maxId = num;
          }
        }
        this.nextId = maxId + 1;
      }
    } catch (error) {
      console.warn('Không thể load ảnh từ localStorage:', error);
    }
  }

  // Xóa ảnh không sử dụng
  cleanupUnusedImages(usedIds: string[]): void {
    const usedSet = new Set(usedIds);
    for (const [id] of this.imageMap) {
      if (!usedSet.has(id)) {
        this.imageMap.delete(id);
      }
    }
    this.saveToLocalStorage();
  }
}

export const imageStorage = ImageStorageService.getInstance();

// Load data khi khởi tạo
imageStorage.loadFromLocalStorage();
