import { useEffect, useState } from 'react';

// Đọc dữ liệu từ public/data/departments.json (khi build, file này được chép nguyên vào dist/)
// import.meta.env.BASE_URL = giá trị `base` trong vite.config.js
let cache = null;

export function useDepartments() {
  const [data, setData] = useState(cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache) return;
    fetch(`${import.meta.env.BASE_URL}data/departments.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((json) => { cache = json; setData(json); })
      .catch(setError);
  }, []);

  return { data, departments: data?.departments ?? [], loading: !data && !error, error };
}
