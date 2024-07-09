import { FC, ReactNode } from "react";
import { useMediaQuery } from "../../hooks/UseMediaQuery";
interface MediaQueryProps {
  orientation?: "landscape" | "portrait";
  minResolution?: `${number}dppx` | number;
  maxResolution?: `${number}dppx` | number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  children: ((matches: boolean) => ReactNode) | ReactNode;
}

const MediaQuery: FC<MediaQueryProps> = ({ children, ...props }) => {
  const getUnits = (key: string) => {
    if (key === "minResolution" || key === "maxResolution") return "dppx";
    return "px";
  };

  const propsToQuery = () => {
    const mediaQueries: string[] = [];
    Object.entries(props).forEach(([key, value]) => {
      const formattedKey = key.replace(
        /(?!^)[A-Z]/g,
        (match) => `-${match.toLowerCase()}`,
      );
      const units = getUnits(key);
      const formattedValue =
        typeof value === "number" ? `${value}${units}` : value;
      const query = `(${formattedKey}: ${formattedValue})`;
      mediaQueries.push(query);
    });
    return mediaQueries;
  };

  const isMatching = useMediaQuery({ query: propsToQuery() });

  if (typeof children === "function") {
    return children(isMatching);
  } else {
    return isMatching ? children : null;
  }
};

export default MediaQuery;
