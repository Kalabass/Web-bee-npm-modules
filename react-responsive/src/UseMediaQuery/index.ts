import { useEffect, useState } from "react";

interface UseMediaQueryProps {
  query: string | string[];
}

export const useMediaQuery = ({ query }: UseMediaQueryProps): boolean => {
  const queries = Array.isArray(query) ? query : [query];
  const mediaQueries = queries.join(" and ");

  const [isMatching, setIsMatching] = useState(() => {
    return window.matchMedia(mediaQueries).matches;
  });
  const handleMediaQuery = (e: MediaQueryListEvent) => {
    setIsMatching(e.matches);
  };
  useEffect(() => {
    const mql = window.matchMedia(mediaQueries);
    mql.addEventListener("change", handleMediaQuery);
    return () => {
      mql.removeEventListener("change", handleMediaQuery);
    };
  }, []);

  return isMatching;
};
