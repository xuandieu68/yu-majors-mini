// Trạng thái của một đợt tuyển sinh so với hôm nay (giờ Hàn Quốc)
export function roundStatus(round, now = new Date()) {
  const start = new Date(`${round.start}T09:00:00+09:00`);
  const end = new Date(`${round.end}T${round.endTime ?? '23:59'}:00+09:00`);
  if (now < start) return 'upcoming';
  if (now > end) return 'closed';
  return 'open';
}

export const fmtDate = (iso, lang) => {
  const [y, m, d] = iso.split('-');
  return lang === 'ko' ? `${y}. ${m}. ${d}.` : `${d}/${m}/${y}`;
};
