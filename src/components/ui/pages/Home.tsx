import React from "react";
import Carousel from "../page-components/Carousel";
import Intro from "../page-components/Intro";
import BishopMessage from "../page-components/BishopMessage";
import EventSection from "../page-components/EventSection";
import ArchTest from "../page-components/ArchTest";
import GallerySection from "../page-components/GallerySection";
import { archdeaconries } from "../../data/archdeaconries";
import SEO from "../page-components/SEO"; 

function Home() {
  return (
    <div>
      <SEO 
        title="Welcome" 
        description="Official website of the Diocese of Calabar, Church of Nigeria (Anglican Communion) — proclaiming the Gospel, equipping believers, and advancing the mission of Christ through worship, teaching, and service."
      />
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