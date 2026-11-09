import { createContext, useContext, useEffect, useState } from 'react';

// Song ngữ đơn giản: 1 Context giữ ngôn ngữ hiện tại + từ điển chữ trên giao diện.
// Dữ liệu ngành đã có sẵn dạng { vi, ko } nên chỉ cần hàm L() để chọn đúng ngôn ngữ.
const UI = {
  vi: {
    brand: 'Ngành học YU',
    tagline: 'Hướng dẫn chọn ngành cho du học sinh',
    nav: { home: 'Trang chủ', departments: 'Ngành học', recommend: 'Gợi ý ngành', admissions: 'Tuyển sinh' },
    heroKicker: 'Đại học Yeungnam · Daegu–Gyeongsan, Hàn Quốc',
    heroTitle: 'Tìm ngành học phù hợp với bạn',
    heroText: 'Giới thiệu, chương trình học, việc làm sau tốt nghiệp và hình thức tuyển sinh của các ngành nhận du học sinh.',
    searchPlaceholder: 'Tìm ngành: máy tính, tiếng Anh, 경영…',
    search: 'Tìm',
    quick: 'Gợi ý tìm kiếm',
    stats: { departments: 'ngành nhận du học sinh', colleges: 'trường thành viên', tracks: 'hình thức: năm nhất & liên thông' },
    byField: 'Ngành học theo khối',
    viewAll: 'Xem tất cả',
    loading: 'Đang tải dữ liệu…',
    freshman: 'Năm nhất',
    transfer: 'Liên thông',
    transferYears: (ys) => `Liên thông năm ${ys.join(', ')}`,
    hoverHint: 'Xem chi tiết',
    careers: 'Việc làm sau tốt nghiệp',
    results: (n) => `${n} ngành`,
    allFields: 'Tất cả khối',
    allColleges: 'Tất cả trường',
    allTracks: 'Mọi hình thức',
    noResult: 'Không tìm thấy ngành phù hợp. Thử từ khóa khác nhé.',
    back: 'Danh sách ngành',
    sections: {
      intro: 'Giới thiệu', majors: 'Chuyên ngành', curriculum: 'Chương trình học theo năm',
      careers: 'Việc làm sau tốt nghiệp', certificates: 'Chứng chỉ có thể lấy', programs: 'Hoạt động & hỗ trợ',
      apply: 'Tuyển du học sinh', links: 'Liên kết', sameCollege: 'Ngành cùng trường',
    },
    official: 'Trang giới thiệu chính thức',
    homepage: 'Trang chủ của khoa',
    phone: 'Điện thoại khoa',
    notFound: 'Không tìm thấy ngành.',
    admissionCta: 'Xem lịch & cách nộp hồ sơ',
    recommendTitle: 'Gợi ý ngành học',
    recommendText: (n) => `Trả lời ${n} câu hỏi ngắn để biết khối ngành hợp với bạn.`,
    question: (i, n) => `Câu ${i}/${n}`,
    resultField: 'Khối ngành hợp với bạn nhất',
    alsoField: 'Bạn cũng có thể cân nhắc',
    restart: 'Làm lại',
    ctaRecommend: 'Chưa biết chọn gì? Làm bài gợi ý 3 câu',
    ctaAdmissions: 'Lịch tuyển sinh kỳ xuân 2027',
    footer: 'Dự án học tập, không phải trang chính thức của Đại học Yeungnam. Nội dung ngành học © Yeungnam University.',
    dataFrom: (d) => `Dữ liệu ngành cập nhật ngày ${d}`,
    status: { open: 'Đang nhận hồ sơ', upcoming: 'Sắp mở', closed: 'Đã kết thúc' },
  },
  ko: {
    brand: 'YU 학과 안내',
    tagline: '유학생을 위한 학과 선택 가이드',
    nav: { home: '홈', departments: '학과', recommend: '학과 추천', admissions: '입학' },
    heroKicker: '영남대학교 · 대한민국 경산',
    heroTitle: '나에게 맞는 학과를 찾아보세요',
    heroText: '유학생 모집 학과의 소개, 교육과정, 졸업 후 진로, 모집 유형을 한눈에 확인하세요.',
    searchPlaceholder: '학과 검색: 컴퓨터, 영어, kinh doanh…',
    search: '검색',
    quick: '추천 검색어',
    stats: { departments: '유학생 모집 학과', colleges: '단과대학', tracks: '모집 유형: 신입학·편입학' },
    byField: '계열별 학과',
    viewAll: '전체 보기',
    loading: '불러오는 중…',
    freshman: '신입학',
    transfer: '편입학',
    transferYears: (ys) => `${ys.join('·')}학년 편입`,
    hoverHint: '자세히 보기',
    careers: '졸업 후 진로',
    results: (n) => `${n}개 학과`,
    allFields: '전체 계열',
    allColleges: '전체 단과대학',
    allTracks: '전체 유형',
    noResult: '검색 결과가 없습니다. 다른 검색어를 입력해 보세요.',
    back: '학과 목록',
    sections: {
      intro: '학과 소개', majors: '전공', curriculum: '학년별 교육과정',
      careers: '졸업 후 진로', certificates: '취득 가능 자격증', programs: '특성화 프로그램',
      apply: '유학생 모집', links: '바로가기', sameCollege: '같은 단과대학 학과',
    },
    official: '공식 학과 소개',
    homepage: '학과 홈페이지',
    phone: '학과 전화',
    notFound: '학과를 찾을 수 없습니다.',
    admissionCta: '모집 일정·지원 방법 보기',
    recommendTitle: '학과 추천',
    recommendText: (n) => `${n}개의 질문에 답하고 나에게 맞는 계열을 알아보세요.`,
    question: (i, n) => `질문 ${i}/${n}`,
    resultField: '나에게 가장 잘 맞는 계열',
    alsoField: '함께 살펴볼 계열',
    restart: '다시 하기',
    ctaRecommend: '고민된다면? 3문항 학과 추천',
    ctaAdmissions: '2027학년도 1학기 모집 일정',
    footer: '학습용 프로젝트이며 영남대학교 공식 사이트가 아닙니다. 학과 정보 © 영남대학교.',
    dataFrom: (d) => `학과 정보 갱신일 ${d}`,
    status: { open: '접수 중', upcoming: '접수 예정', closed: '마감' },
  },
};

const LangContext = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'vi' || saved === 'ko') return saved;
  } catch { /* trình duyệt chặn localStorage: dùng mặc định */ }
  return 'vi';
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch { /* bỏ qua */ }
  }, [lang]);

  // L({ vi, ko }) -> chuỗi đúng ngôn ngữ, nếu thiếu thì lấy ngôn ngữ còn lại
  const L = (obj) => (obj ? obj[lang] || obj.ko || obj.vi || '' : '');
  return <LangContext.Provider value={{ lang, setLang, t: UI[lang], L }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
