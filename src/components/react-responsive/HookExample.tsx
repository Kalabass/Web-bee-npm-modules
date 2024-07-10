import { useMediaQuery } from "@kalabass/react-responsive";
import { FC } from "react";

const HookExample: FC = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const isisDesktopOrLaptopAndLandscape = useMediaQuery({
    query: ["(min-width: 1224px)", "(orientation: landscape)"],
  });

  return (
    <div>
      <h1>Hook Device Test!</h1>
      {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
      {isBigScreen && <p>You have a huge screen</p>}
      {isTabletOrMobile && <p>You are a tablet or mobile phone</p>}
      <p>Your are in {isPortrait ? "portrait" : "landscape"} orientation</p>
      {isRetina && <p>You are retina</p>}
      {isisDesktopOrLaptopAndLandscape && (
        <p>You are a desktop or laptop in landscape orientation</p>
      )}
    </div>
  );
};

export default HookExample;
