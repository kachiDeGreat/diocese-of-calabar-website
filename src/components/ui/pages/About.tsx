import React from "react";
import Banner from "../page-components/Banner";
import VisionAndMission from "../page-components/VisionAndMission";
import Belief from "../page-components/Belief";
import BishopMessage from "../page-components/BishopMessage";
import ArchdeaconrySlider from "../page-components/ArchTest";
import { bishop } from "../../data/bishops";
import History from "../page-components/History";
import useScrollToHash from "../../../hooks/useScrollToHash";

function About() {
  useScrollToHash();
  return (
    <>
      <Banner title="About US" />
      <br />
      <div id="mission">
        <VisionAndMission />
      </div>
      <br />
      {/* <Belief /> */}
      {/* <br /> */}
      <div id="history">
        <History />
      </div>
      {/* bishops  */}
      <div id="bishop" style={{ backgroundColor: "#f8f9fa", padding: "2rem" }}>
        <ArchdeaconrySlider
          style={{ backgroundColor: "#f8f9fa" }}
          data={bishop}
          header="Our Fathers..."
          title="Bishops Of Calabar Diocese"
        />
      </div>
      {/* <BishopMessage /> */}
    </>
  );
}

export default About;
