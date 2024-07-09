import { useMediaQuery } from "../hooks/UseMediaQuery";
import MediaQuery from "./MediaQuery";

const ReactResponsive = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const isisDesktopOrLaptopAndLandscape = useMediaQuery({
    query: ["(min-width: 1824px)", "(orientation: landscape)"],
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isTabletOrMobile ? "column" : "row",
      }}
    >
      <div
        style={{
          flex: 1,
          height: isTabletOrMobile ? "50vh" : "auto",
        }}
      >
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
      <div
        style={{
          flex: 1,
          height: isTabletOrMobile ? "50vh" : "auto",
        }}
      >
        <h1>Component Device Test!</h1>
        <MediaQuery minWidth={1224}>
          <p>You are a desktop or laptop</p>
          <MediaQuery minWidth={1824}>
            <p>You also have a huge screen</p>
          </MediaQuery>
        </MediaQuery>

        <h2>Resolution with string prop: </h2>
        <MediaQuery minResolution="2dppx">
          {(matches) =>
            matches ? <p>You are retina</p> : <p>You are not retina </p>
          }
        </MediaQuery>

        <h2>Resolution with number prop: </h2>
        <MediaQuery minResolution={2}>
          {(matches) =>
            matches ? <p>You are retina</p> : <p>You are not retina </p>
          }
        </MediaQuery>
        <MediaQuery minWidth={1824} orientation="landscape">
          <p>You are a desktop or laptop in landscape orientation</p>
        </MediaQuery>
        <MediaQuery>
          <p>empty media query</p>
        </MediaQuery>
      </div>
    </div>
  );
};

export default ReactResponsive;
