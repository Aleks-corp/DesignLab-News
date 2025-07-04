import { useEffect, useState } from "react";

function getLimit() {
  if (typeof window === "undefined") return 9; // fallback для SSR
  const width = window.innerWidth;
  if (width < 860) return 3; // mobile (1 ряд)
  if (width < 1156) return 6; // tablet (2 ряди)
  return 9; // desktop (3 ряди)
}

export function useArticlesLimit() {
  const [limit, setLimit] = useState(getLimit());

  useEffect(() => {
    const handler = () => setLimit(getLimit());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return limit;
}
