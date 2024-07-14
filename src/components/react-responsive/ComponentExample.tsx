import MediaQuery from "@kalabass/react-responsive";
import { FC } from "react";

const ComponentExample: FC = () => {
  return (
    <div>
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
      <MediaQuery minWidth={1224} orientation="landscape">
        <p>You are a desktop or laptop in landscape orientation</p>
      </MediaQuery>
      <MediaQuery>
        <p>empty media query</p>
      </MediaQuery>
    </div>
  );
};

export default ComponentExample;
