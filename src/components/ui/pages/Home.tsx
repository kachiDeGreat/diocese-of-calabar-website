import React from "react";
import Carousel from "../page-components/Carousel";
import Intro from "../page-components/Intro";
import Featured from "../page-components/Featured";
import BishopMessage from "../page-components/BishopMessage";

function Home() {
  return (
    <div>
      <Carousel />
      <Intro />
      <BishopMessage />
      {/* <Featured /> */}
    </div>
  );
}

export default Home;
