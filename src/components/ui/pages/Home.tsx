import React from "react";
import Carousel from "../page-components/Carousel";
import Intro from "../page-components/Intro";
import Featured from "../page-components/Featured";

function Home() {
  return (
    <div>
      <Carousel />
      <Intro />
      <Featured />
    </div>
  );
}

export default Home;
