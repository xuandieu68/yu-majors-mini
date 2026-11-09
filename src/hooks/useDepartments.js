import { useEffect, useState } from 'react';

// Tải public/data/departments.json một lần, các trang dùng chung bản đã tải (cache)
let cache = null;
let pending = null;

export function useDepartments() {
  const [data, setData] = useState(cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache) return;
    pending ??= fetch(`${import.meta.env.BASE_URL}data/departments.json`).then((r) =>
      r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))
    );
    pending.then((json) => { cache = json; setData(json); }).catch(setError);
  }, []);

  return {
    data,
    departments: data?.departments ?? [],
    colleges: data?.colleges ?? [],
    loading: !data && !error,
    error,
  };
}
