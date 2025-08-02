import React from "react";
import Carousel from "../page-components/Carousel";
import Intro from "../page-components/Intro";
import BishopMessage from "../page-components/BishopMessage";
import EventSection from "../page-components/EventSection";
import ArchTest from "../page-components/ArchTest";
import GallerySection from "../page-components/GallerySection";
import { archdeaconries } from "../../data/archdeaconries";

function Home() {
  return (
    <div>
      <Carousel />
      <Intro />
      <BishopMessage />
      <ArchTest
        data={archdeaconries}
        header="ARCHDEACONRIES"
        title="Our Archdeaconries"
      />
      <EventSection />
      <GallerySection />
      {/* <Featured /> */}
    </div>
  );
}

export default Home;
