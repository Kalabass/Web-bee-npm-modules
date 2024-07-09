import { useEffect, useState } from "react";

interface UseMediaQueryProps {
  query: string | string[];
}

export const useMediaQuery = ({ query }: UseMediaQueryProps): boolean => {
  const [isMatching, setIsMatching] = useState(() => {
    if (Array.isArray(query)) {
      return query.every((q) => window.matchMedia(q).matches);
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const handleMatch = () => {
      if (Array.isArray(query)) {
        setIsMatching(query.every((q) => window.matchMedia(q).matches));
      } else {
        setIsMatching(window.matchMedia(query).matches);
      }
    };

    if (Array.isArray(query)) {
      const mqlArr = query.map((q) => window.matchMedia(q));
      mqlArr.forEach((mql) => mql.addEventListener("change", handleMatch));
      return () => {
        mqlArr.forEach((mql) => mql.removeEventListener("change", handleMatch));
      };
    } else {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", handleMatch);
      return () => {
        mql.removeEventListener("change", handleMatch);
      };
    }
  }, []);

  return isMatching;
};
