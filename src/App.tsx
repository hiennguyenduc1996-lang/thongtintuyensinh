import React, { useState, useEffect, useRef } from 'react';
import {
  Trash2,
  ArrowUp,
  ArrowDown,
  Plus,
  Copy,
  LogIn,
  LogOut,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// Dữ liệu thô từ yêu cầu
const INITIAL_RAW_DATA = [
  { "id": 1, "ten_truong": "ĐẠI HỌC VIỆT ĐỨC", "phuong_thuc": "Xét tuyển học bạ", "thoi_gian": "01/4/2026 đến ngày 14/07/2026", "link": "apply.vgu.edu.vn", "ho_so": "CCCD/hộ chiếu, Chứng nhận tốt nghiệp, Học bạ lớp 10, 11, 12, Chứng nhận giải thưởng, Bằng quốc tế, Chứng chỉ tiếng Anh", "luu_y": "Đăng ký tài khoản trên web trường và vẫn phải đăng ký trên hệ thống của Bộ." },
  { "id": 2, "ten_truong": "ĐẠI HỌC SƯ PHẠM TP. HỒ CHÍ MINH", "phuong_thuc": "Xét tuyển kết hợp (Sử dụng kết quả học tập THPT + Thi ĐGNL chuyên biệt)", "thoi_gian": "Dự kiến từ ngày 25/6 đến 15/7/2026 (nhập minh chứng)", "link": "xettuyen.hcmue.edu.vn", "ho_so": "Học bạ, chứng chỉ tiếng Anh và các minh chứng khác", "luu_y": "Học sinh vẫn đăng ký trên hệ thống của Bộ, sau đó mới nhập minh chứng lên web trường." },
  { "id": 3, "ten_truong": "ĐẠI HỌC NGOẠI NGỮ VÀ TIN HỌC (HUFLIT)", "phuong_thuc": "Xét tuyển học bạ", "thoi_gian": "Hạn chót 31/07/2026", "link": "tuyensinh.huflit.edu.vn/tuyen-sinh", "ho_so": "Học bạ, chứng chỉ tiếng Anh", "luu_y": "Đăng ký riêng bên trường và đồng thời trên hệ thống của Bộ." },
  { "id": 4, "ten_truong": "ĐẠI HỌC TÀI NGUYÊN VÀ MÔI TRƯỜNG", "phuong_thuc": "Xét tuyển học bạ (Xét theo tổ hợp 3 môn hoặc điểm trung bình 3 năm)", "thoi_gian": "Dự kiến từ 01/6 đến 14/7/2026", "link": "ts.hcmunre.edu.vn", "ho_so": "Phiếu đăng ký, học bạ photo công chứng, chứng chỉ tiếng Anh", "luu_y": "Nộp hồ sơ trực tiếp tại trường hoặc qua bưu điện sau khi đăng ký online." },
  { "id": 5, "ten_truong": "ĐẠI HỌC LUẬT", "phuong_thuc": "Xét tuyển học bạ (Dành cho 149 trường hoặc trường thường kèm CC ngoại ngữ)", "thoi_gian": "Theo lịch của Bộ GD&ĐT", "link": "Hệ thống của Bộ GD&ĐT", "ho_so": "Không cần nộp học bạ riêng cho trường", "luu_y": "Chỉ cần đăng ký nguyện vọng trên hệ thống của Bộ, hệ thống tự động đối chiếu điểm." },
  { "id": 6, "ten_truong": "HỌC VIỆN HÀNG KHÔNG", "phuong_thuc": "Xét tuyển học bạ", "thoi_gian": "Theo lịch của Bộ GD&ĐT", "link": "Hệ thống của Bộ GD&ĐT", "ho_so": "Không cần nộp học bạ riêng cho trường", "luu_y": "Chỉ cần đăng ký nguyện vọng trên hệ thống của Bộ." },
  { "id": 7, "ten_truong": "ĐẠI HỌC TÀI CHÍNH – MARKETING (UFM)", "phuong_thuc": "Xét tuyển học bạ giỏi/kết hợp", "thoi_gian": "Theo quy định từng diện xét tuyển", "link": "Đang cập nhật", "ho_so": "Học bạ, chứng chỉ IELTS (nếu có), minh chứng giải HSG", "luu_y": "Chia làm 4 diện xét tuyển tùy theo học lực và chứng chỉ tiếng Anh." },
  { "id": 8, "ten_truong": "ĐẠI HỌC MỞ", "phuong_thuc": "Xét tuyển học bạ/kết hợp", "thoi_gian": "06/5 đến 17g00 ngày 14/7/2026", "link": "minhchungxettuyen.ou.edu.vn/2026", "ho_so": "Học bạ, chứng chỉ tiếng Anh", "luu_y": "Nộp minh chứng trên web trường không bắt buộc nhưng nên làm để đảm bảo quyền lợi." },
  { "id": 9, "ten_truong": "ĐẠI HỌC KINH TẾ TÀI CHÍNH (UEF)", "phuong_thuc": "Phương thức 2 (Mã 200): Xét học bạ 6 học kỳ", "thoi_gian": "Theo lịch của Bộ GD&ĐT", "link": "Hệ thống của Bộ GD&ĐT", "ho_so": "Không cần nộp học bạ riêng cho trường", "luu_y": "Hệ thống của Bộ tự động đối chiếu dữ liệu." },
  { "id": 10, "ten_truong": "ĐẠI HỌC CÔNG NGHIỆP (IUH)", "phuong_thuc": "Xét tuyển kết hợp (Mã 301) - Không xét học bạ thuần túy", "thoi_gian": "Trước ngày 30/06/2026", "link": "tuyensinh.iuh.edu.vn", "ho_so": "Phiếu đăng ký sơ tuyển, photocopy CCCD, lệ phí 50.000đ", "luu_y": "Đăng ký online sau đó nộp hồ sơ bản cứng trực tiếp tại trường." },
  { "id": 11, "ten_truong": "ĐẠI HỌC KINH TẾ LUẬT (UEL)", "phuong_thuc": "Xét tuyển kết hợp", "thoi_gian": "04/5/2026 đến ngày 20/6/2026", "link": "dkxtdhcq.uel.edu.vn", "ho_so": "Học bạ file PDF công chứng, chứng chỉ tiếng Anh", "luu_y": "Chỉ đăng ký trực tuyến, không gửi hồ sơ về trường. Thuộc danh sách 149 trường được cộng điểm." },
  { "id": 12, "ten_truong": "ĐẠI HỌC KINH TẾ TP. HỒ CHÍ MINH (UEH)", "phuong_thuc": "Xét tuyển kết hợp", "thoi_gian": "Đang cập nhật", "link": "xettuyenk52.ueh.edu.vn", "ho_so": "Học bạ, chứng chỉ tiếng Anh", "luu_y": "Cập nhật minh chứng online, không gửi hồ sơ về trường." },
  { "id": 13, "ten_truong": "ĐẠI HỌC NGÂN HÀNG TP. HỒ CHÍ MINH (HUB)", "phuong_thuc": "Xét tuyển học bạ (PT2)", "thoi_gian": "15/05/2026 đến 17h00 ngày 30/06/2026", "link": "xettuyen.hub.edu.vn", "ho_so": "Học bạ, chứng chỉ tiếng Anh", "luu_y": "Cập nhật minh chứng online, không gửi hồ sơ về trường." },
  { "id": 14, "ten_truong": "ĐẠI HỌC QUỐC TẾ", "phuong_thuc": "Xét tuyển tổng hợp", "thoi_gian": "Theo lịch của Bộ GD&ĐT", "link": "Hệ thống của Bộ GD&ĐT", "ho_so": "Không cần nộp học bạ riêng", "luu_y": "Thuộc danh sách 149 trường được cộng điểm." },
  { "id": 15, "ten_truong": "ĐẠI HỌC BÁCH KHOA", "phuong_thuc": "Xét tuyển tổng hợp", "thoi_gian": "Đang cập nhật", "link": "Web riêng của trường và hệ thống Bộ", "ho_so": "Minh chứng cập nhật lên web trường", "luu_y": "Thuộc danh sách 149 trường được cộng điểm." },
  { "id": 16, "ten_truong": "ĐẠI HỌC CÔNG NGHỆ THÔNG TIN (UIT)", "phuong_thuc": "Xét tuyển tổng hợp", "thoi_gian": "Theo lịch của Bộ GD&ĐT", "link": "Hệ thống của Bộ GD&ĐT", "ho_so": "Không cần nộp học bạ riêng", "luu_y": "Hệ thống tự động đối chiếu. Thuộc danh sách 149 trường được cộng điểm." },
  { "id": 17, "ten_truong": "ĐẠI HỌC KHOA HỌC XÃ HỘI VÀ NHÂN VĂN", "phuong_thuc": "Xét tuyển tổng hợp", "thoi_gian": "Theo lịch của Bộ GD&ĐT", "link": "Hệ thống của Bộ GD&ĐT", "ho_so": "Không cần nộp học bạ riêng", "luu_y": "Hệ thống tự động đối chiếu. Thuộc danh sách 149 trường được cộng điểm." },
  { "id": 18, "ten_truong": "ĐẠI HỌC CÔNG THƯƠNG (HUIT)", "phuong_thuc": "Xét tuyển học bạ", "thoi_gian": "Theo quy định của trường", "link": "tuyensinh.huit.edu.vn/dang-ky-xet-tuyen.html", "ho_so": "Phiếu đăng ký, phiếu điểm ĐGNL, học bạ, CCCD, lệ phí 30.000đ/NV", "luu_y": "Có thể nộp online hoặc hồ sơ giấy. Có quy đổi điểm ngoại ngữ nếu có đơn đề nghị." },
  { "id": 19, "ten_truong": "ĐẠI HỌC CÔNG NGHỆ TP. HỒ CHÍ MINH (HUTECH)", "phuong_thuc": "Xét tuyển học bạ", "thoi_gian": "Đang cập nhật", "link": "dangkytuyensinh.hutech.edu.vn/register", "ho_so": "Hồ sơ xét tuyển online", "luu_y": "Đăng ký tài khoản và xét tuyển trực tiếp trên web trường." },
  { "id": 20, "ten_truong": "ĐẠI HỌC SƯ PHẠM KĨ THUẬT", "phuong_thuc": "Xét tuyển kết hợp", "thoi_gian": "25/5/2026 đến 17 giờ 00 ngày 20/6/2026", "link": "xettuyen.hcmute.edu.vn", "ho_so": "Học bạ, chứng chỉ tiếng Anh", "luu_y": "Cập nhật minh chứng trực tuyến trên trang xét tuyển của trường." }
];

const COLORS = ['Xanh dương', 'Xanh lá', 'Cam', 'Tím', 'Đỏ đô'];

const COLOR_MAP: Record<string, string> = {
  'Xanh dương': 'bg-[#2563eb]',
  'Xanh lá': 'bg-[#16a34a]',
  'Cam': 'bg-[#ea580c]',
  'Tím': 'bg-[#9333ea]',
  'Đỏ đô': 'bg-[#dc2626]',
};

const TAB_COLOR_MAP: Record<string, string> = {
  'Xanh dương': 'bg-[#2563eb]',
  'Xanh lá': 'bg-[#16a34a]',
  'Cam': 'bg-[#ea580c]',
  'Tím': 'bg-[#9333ea]',
  'Đỏ đô': 'bg-[#dc2626]',
};

// Hàm chuyển đổi dữ liệu thô sang định dạng mới có hỗ trợ nhiều phương thức
const getInitialData = () => {
  return INITIAL_RAW_DATA.map((item) => ({
    id: crypto.randomUUID(),
    ten_truong: item.ten_truong,
    color: 'Xanh dương', // Mặc định
    cac_phuong_thuc: [
      {
        id: crypto.randomUUID(),
        ten_phuong_thuc: item.phuong_thuc,
        thoi_gian: item.thoi_gian,
        link: item.link,
        ho_so: item.ho_so,
        luu_y: item.luu_y
      }
    ]
  }));
};

export default function App() {
  const [data, setData] = useState<any[]>(() => {
    const saved = localStorage.getItem('admissionData');
    return saved ? JSON.parse(saved) : getInitialData();
  });
  
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const isInitialMount = useRef(true);

  // Chọn trường đầu tiên lúc mới load
  useEffect(() => {
    if (data.length > 0 && !selectedSchoolId) {
      setSelectedSchoolId(data[0].id);
    }
  }, [data, selectedSchoolId]);

  // Tự động lưu dữ liệu vào localStorage
  useEffect(() => {
    localStorage.setItem('admissionData', JSON.stringify(data));
    
    // Không hiện toast lần mount đầu tiên
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (isAdmin) {
      showToast('Đã lưu thay đổi', 'success');
    }
  }, [data]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'nguyenduchien') {
      setIsAdmin(true);
      setPasswordInput('');
      showToast('Đăng nhập thành công', 'success');
    } else {
      showToast('Sai mật khẩu', 'error');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    showToast('Đã đăng xuất', 'success');
  };

  const exportJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    showToast('Đã copy dữ liệu JSON', 'success');
  };

  // --- ACTIONS TRƯỜNG (SCHOOL) ---
  const addSchool = () => {
    const newSchool = {
      id: crypto.randomUUID(),
      ten_truong: 'Tên trường mới',
      color: 'Xanh dương',
      cac_phuong_thuc: [
        {
          id: crypto.randomUUID(),
          ten_phuong_thuc: 'Tên phương thức mới',
          thoi_gian: 'Thời gian...',
          link: 'Link...',
          ho_so: 'Hồ sơ...',
          luu_y: 'Lưu ý...'
        }
      ]
    };
    setData([...data, newSchool]);
    setSelectedSchoolId(newSchool.id);
  };

  const deleteSchool = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Chắc chắn xóa trường này?')) {
      const newData = data.filter(s => s.id !== id);
      setData(newData);
      if (selectedSchoolId === id && newData.length > 0) {
        setSelectedSchoolId(newData[0].id);
      } else if (newData.length === 0) {
        setSelectedSchoolId('');
      }
    }
  };

  const moveSchool = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === data.length - 1) return;
    
    const newData = [...data];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newData[index], newData[swapIndex]] = [newData[swapIndex], newData[index]];
    setData(newData);
  };

  const changeSchoolColor = (id: string, newColor: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setData(data.map(s => s.id === id ? { ...s, color: newColor } : s));
  };

  const updateSchoolName = (id: string, newName: string) => {
    setData(data.map(s => s.id === id ? { ...s, ten_truong: newName } : s));
  };

  // --- ACTIONS PHƯƠNG THỨC (METHOD) ---
  const addMethod = (schoolId: string) => {
    const newMethod = {
      id: crypto.randomUUID(),
      ten_phuong_thuc: 'Tên phương thức mới',
      thoi_gian: 'Thời gian...',
      link: 'Link...',
      ho_so: 'Hồ sơ...',
      luu_y: 'Lưu ý...'
    };
    setData(data.map(s => {
      if (s.id === schoolId) {
        return { ...s, cac_phuong_thuc: [...s.cac_phuong_thuc, newMethod] };
      }
      return s;
    }));
  };

  const deleteMethod = (schoolId: string, methodId: string) => {
    if (window.confirm('Xóa phương thức này?')) {
      setData(data.map(s => {
        if (s.id === schoolId) {
          return { ...s, cac_phuong_thuc: s.cac_phuong_thuc.filter((m: any) => m.id !== methodId) };
        }
        return s;
      }));
    }
  };

  const moveMethod = (schoolId: string, methodIndex: number, direction: 'up' | 'down') => {
    setData(data.map(s => {
      if (s.id === schoolId) {
        if (direction === 'up' && methodIndex === 0) return s;
        if (direction === 'down' && methodIndex === s.cac_phuong_thuc.length - 1) return s;
        
        const newMethods = [...s.cac_phuong_thuc];
        const swapIndex = direction === 'up' ? methodIndex - 1 : methodIndex + 1;
        [newMethods[methodIndex], newMethods[swapIndex]] = [newMethods[swapIndex], newMethods[methodIndex]];
        return { ...s, cac_phuong_thuc: newMethods };
      }
      return s;
    }));
  };

  const updateMethod = (schoolId: string, methodId: string, field: string, value: string) => {
    setData(data.map(s => {
      if (s.id === schoolId) {
        return {
          ...s,
          cac_phuong_thuc: s.cac_phuong_thuc.map((m: any) => m.id === methodId ? { ...m, [field]: value } : m)
        };
      }
      return s;
    }));
  };

  const selectedSchool = data.find(s => s.id === selectedSchoolId);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans text-[#1e293b]">
      
      {/* HEADER & ADMIN LOGIN */}
      <header className="bg-white border-b border-[#e2e8f0] sticky top-0 z-10">
        <div className="w-full px-6 h-[60px] flex items-center justify-between">
          <h1 className="text-[18px] font-bold text-[#2563eb] tracking-tight">
            THÔNG TIN TUYỂN SINH ĐẠI HỌC NĂM HỌC 2025 - 2026
          </h1>
          
          <div className="flex items-center gap-2">
            {!isAdmin ? (
              <form onSubmit={handleLogin} className="flex items-center gap-2">
                <input
                  type="password"
                  placeholder="Mật khẩu Admin..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="px-3 py-1.5 border border-[#cbd5e1] rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#2563eb] focus:border-[#2563eb]"
                />
                <button
                  type="submit"
                  className="bg-[#2563eb] text-white px-3 py-1.5 rounded-md text-[13px] font-medium hover:bg-[#1d4ed8] transition"
                >
                  Đăng nhập
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-[#16a34a] font-semibold flex items-center gap-1 text-[13px]">
                  ● ADMIN MODE
                </span>
                <button
                  onClick={addSchool}
                  className="bg-[#2563eb] text-white px-3 py-1.5 rounded-md text-[13px] font-medium hover:bg-[#1d4ed8] transition"
                >
                  + Thêm Trường
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-[#f1f5f9] text-[#1e293b] px-3 py-1.5 rounded-md text-[13px] font-medium hover:bg-[#e2e8f0] transition"
                >
                  Thoát
                </button>
                <button
                  onClick={exportJSON}
                  className="bg-[#f1f5f9] text-[#1e293b] px-3 py-1.5 rounded-md text-[13px] font-medium hover:bg-[#e2e8f0] transition"
                >
                  Copy JSON
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex-1 w-full flex overflow-hidden">
        
        {/* SIDEBAR */}
        <aside className="w-[256px] shrink-0 bg-white border-r border-[#e2e8f0] flex flex-col h-[calc(100vh-60px)]">
          <div className="p-4 border-b border-[#f1f5f9] flex justify-between items-center">
            <span className="text-[12px] font-semibold text-[#64748b]">DANH SÁCH TRƯỜNG</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {data.map((school, index) => {
              const isSelected = selectedSchoolId === school.id;
              
              return (
                <div 
                  key={school.id}
                  onClick={() => setSelectedSchoolId(school.id)}
                  className={`group relative flex items-center p-[10px_12px] rounded-lg text-[13px] cursor-pointer transition border ${
                    isSelected 
                      ? 'bg-[#eff6ff] border-[#bfdbfe] text-[#2563eb] font-semibold' 
                      : 'border-transparent hover:bg-[#f8fafc]'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full mr-2 shrink-0 ${TAB_COLOR_MAP[school.color] || 'bg-[#2563eb]'}`} />
                  
                  <div className="flex-1 truncate">
                    {isAdmin && isSelected ? (
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updateSchoolName(school.id, e.currentTarget.innerText)}
                        onClick={(e) => e.stopPropagation()}
                        className="outline-none tracking-normal font-sans border border-dashed border-[#94a3b8] bg-[#fcfcfc] focus:border-[#2563eb] focus:bg-white rounded px-1 -mx-1"
                      >
                        {school.ten_truong}
                      </div>
                    ) : (
                      <span className="truncate">{school.ten_truong}</span>
                    )}
                  </div>
                  
                  {/* Nút thao tác Admin trên Trường */}
                  {isAdmin && isSelected && (
                    <div className="flex items-center gap-1 ml-2">
                      <button 
                        onClick={(e) => moveSchool(index, 'up', e)} 
                        className="w-6 h-6 flex items-center justify-center bg-[#f1f5f9] hover:bg-[#e2e8f0] rounded text-[#1e293b]"
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button 
                        onClick={(e) => moveSchool(index, 'down', e)} 
                        className="w-6 h-6 flex items-center justify-center bg-[#f1f5f9] hover:bg-[#e2e8f0] rounded text-[#1e293b]"
                      >
                        <ArrowDown size={12} />
                      </button>
                      <button 
                        onClick={(e) => deleteSchool(school.id, e)} 
                        className="w-6 h-6 flex items-center justify-center bg-[#f1f5f9] hover:bg-red-50 hover:text-red-600 rounded text-[#dc2626]"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col h-[calc(100vh-60px)] overflow-y-auto p-8 relative">
          {selectedSchool ? (
            <div className="bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] p-6 max-w-[800px] mx-auto w-full">
              
              <div className="mb-6">
                <div className="text-[11px] uppercase tracking-[0.05em] text-[#64748b] mb-[6px] font-semibold">Tên Trường</div>
                {isAdmin ? (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateSchoolName(selectedSchool.id, e.currentTarget.innerText)}
                    className="text-[24px] font-bold text-[#2563eb] outline-none border border-dashed border-[#94a3b8] bg-[#fcfcfc] focus:border-[#2563eb] focus:bg-white rounded p-1 -ml-1 inline-block min-w-[200px]"
                  >
                    {selectedSchool.ten_truong}
                  </div>
                ) : (
                  <div className="text-[24px] font-bold text-[#2563eb]">{selectedSchool.ten_truong}</div>
                )}
                
                {/* Bảng chọn màu */}
                {isAdmin && (
                  <div className="mt-6 flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-[0.05em] text-[#64748b] font-semibold">Màu chủ đạo:</span>
                    {COLORS.map(color => (
                        <button
                          key={color}
                          onClick={(e) => changeSchoolColor(selectedSchool.id, color, e)}
                          title={`Chọn màu ${color}`}
                          className={`w-5 h-5 rounded-full ${TAB_COLOR_MAP[color]} ${
                            selectedSchool.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                          }`}
                        />
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {selectedSchool.cac_phuong_thuc.map((method: any, index: number) => {
                  return (
                    <div key={method.id} className="relative">
                      {/* Controls Phương Thức (Admin) */}
                      {isAdmin && (
                        <div className="absolute right-0 top-0 flex items-center gap-1 z-10 translate-y-[-100%] pb-1">
                          <button onClick={() => moveMethod(selectedSchool.id, index, 'up')} className="w-6 h-6 flex items-center justify-center bg-[#f1f5f9] hover:bg-[#e2e8f0] rounded text-[12px]">↑</button>
                          <button onClick={() => moveMethod(selectedSchool.id, index, 'down')} className="w-6 h-6 flex items-center justify-center bg-[#f1f5f9] hover:bg-[#e2e8f0] rounded text-[12px]">↓</button>
                          <button onClick={() => deleteMethod(selectedSchool.id, method.id)} className="w-6 h-6 flex items-center justify-center bg-[#f1f5f9] hover:bg-red-50 text-[12px] text-[#dc2626]">×</button>
                        </div>
                      )}

                      <div className={`space-y-5 ${index > 0 ? 'pt-6 border-t border-[#e2e8f0]' : ''}`}>
                        <div className="mb-5">
                          <label className="text-[11px] uppercase tracking-[0.05em] text-[#64748b] mb-[6px] font-semibold block">Phương thức</label>
                          <div
                            contentEditable={isAdmin}
                            suppressContentEditableWarning
                            onBlur={(e) => updateMethod(selectedSchool.id, method.id, 'ten_phuong_thuc', e.currentTarget.innerText)}
                            className={`outline-none ${isAdmin ? 'border border-dashed border-[#94a3b8] bg-[#fcfcfc] focus:border-[#2563eb] focus:bg-white p-2 rounded -mx-2' : ''}`}
                          >
                            {method.ten_phuong_thuc}
                          </div>
                        </div>

                        <div className="mb-5">
                          <label className="text-[11px] uppercase tracking-[0.05em] text-[#64748b] mb-[6px] font-semibold block">Thời gian</label>
                          <div
                            contentEditable={isAdmin}
                            suppressContentEditableWarning
                            onBlur={(e) => updateMethod(selectedSchool.id, method.id, 'thoi_gian', e.currentTarget.innerText)}
                            className={`outline-none ${isAdmin ? 'border border-dashed border-[#94a3b8] bg-[#fcfcfc] focus:border-[#2563eb] focus:bg-white p-2 rounded -mx-2' : ''}`}
                          >
                            {method.thoi_gian}
                          </div>
                        </div>

                        <div className="mb-5">
                          <label className="text-[11px] uppercase tracking-[0.05em] text-[#64748b] mb-[6px] font-semibold block">Link đăng ký</label>
                          <div
                            contentEditable={isAdmin}
                            suppressContentEditableWarning
                            onBlur={(e) => updateMethod(selectedSchool.id, method.id, 'link', e.currentTarget.innerText)}
                            className={`outline-none text-[#3b82f6] underline ${isAdmin ? 'border border-dashed border-[#94a3b8] bg-[#fcfcfc] focus:border-[#2563eb] focus:bg-white p-2 rounded -mx-2' : ''}`}
                          >
                            {method.link}
                          </div>
                        </div>

                        <div className="mb-5">
                          <label className="text-[11px] uppercase tracking-[0.05em] text-[#64748b] mb-[6px] font-semibold block">Hồ sơ</label>
                          <div
                            contentEditable={isAdmin}
                            suppressContentEditableWarning
                            onBlur={(e) => updateMethod(selectedSchool.id, method.id, 'ho_so', e.currentTarget.innerText)}
                            className={`outline-none whitespace-pre-wrap ${isAdmin ? 'border border-dashed border-[#94a3b8] bg-[#fcfcfc] focus:border-[#2563eb] focus:bg-white p-2 rounded -mx-2' : ''}`}
                          >
                            {method.ho_so}
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] uppercase tracking-[0.05em] text-[#64748b] mb-[6px] font-semibold block">Lưu ý</label>
                          <div
                            contentEditable={isAdmin}
                            suppressContentEditableWarning
                            onBlur={(e) => updateMethod(selectedSchool.id, method.id, 'luu_y', e.currentTarget.innerText)}
                            className={`outline-none whitespace-pre-wrap ${isAdmin ? 'border border-dashed border-[#94a3b8] bg-[#fcfcfc] focus:border-[#2563eb] focus:bg-white p-3 rounded' : 'bg-[#fff7ed] p-3 rounded-lg text-[#1e293b]'}`}
                          >
                            {method.luu_y}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {isAdmin && (
                  <div className="pt-4 flex justify-center">
                    <button
                     onClick={() => addMethod(selectedSchool.id)}
                     className="bg-[#f1f5f9] text-[#1e293b] px-4 py-2 rounded-md text-[13px] font-medium hover:bg-[#e2e8f0] transition text-center"
                    >
                      + Thêm phương thức
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-[#94a3b8]">
              <p>Chọn một trường để xem chi tiết</p>
            </div>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="h-[40px] shrink-0 bg-white border-t border-[#e2e8f0] flex items-center px-6 justify-between text-[12px] text-[#475569]">
        <div>Cập nhật: 12/2025</div>
      </footer>

      {/* TOAST SYSTEM */}
      {toast && (
        <div className="fixed bottom-[60px] right-6 z-50 animate-fade-in-up">
          <div className="bg-[#1e293b] text-white px-6 py-3 rounded-lg text-[13px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
            {toast.message}
          </div>
        </div>
      )}
      
      {/* TOAST ANIMATION CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(150%); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}} />
    </div>
  );
}
