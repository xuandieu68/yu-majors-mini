// Bỏ dấu tiếng Việt + chữ thường, để gõ "may tinh" vẫn ra "Máy tính"
export const norm = (s = '') =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd').toLowerCase();

// Lấy n câu đầu của một đoạn văn (dùng cho thẻ xem nhanh)
export function firstSentences(s = '', n = 2) {
  const parts = s.match(/[^.!?。]+[.!?。]+/g);
  if (!parts) return s;
  return parts.slice(0, n).join(' ').trim();
}
