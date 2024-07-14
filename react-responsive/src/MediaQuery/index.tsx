import { FC, ReactNode } from "react";
import { useMediaQuery } from "../UseMediaQuery";

type ResolutionType = `${number}dppx` | number;
interface MediaQueryProps {
  orientation?: "landscape" | "portrait";
  minResolution?: ResolutionType;
  maxResolution?: ResolutionType;
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

  return typeof children === "function" ? children(isMatching): isMatching ? children: null;
};

export default MediaQuery;
