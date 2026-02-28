import Banner from "../page-components/Banner";
import ArchdeaconrySlider from "../page-components/ArchTest";
import { bishop } from "../../data/bishops";
import History from "../page-components/History";
import useScrollToHash from "../../../hooks/useScrollToHash";
import SEO from "../page-components/SEO"; // <-- Import SEO

function About() {
  useScrollToHash();
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about the history, mission, and vision of the Anglican Diocese of Calabar and our commitment to the word of God."
      />
      <Banner title="About Us" />
      <div style={{ padding: "3rem 0" }}>
        <div id="history">
          <History />
        </div>
      </div>
      {/* bishops  */}
      <div
        id="bishop"
        style={{ backgroundColor: "#f8f9fa", padding: "3rem 0" }}
      >
        <ArchdeaconrySlider
          style={{ backgroundColor: "#f8f9fa" }}
          data={bishop}
          header="Our Fathers in God"
          title="Bishops Of Calabar Diocese"
        />
      </div>
    </>
  );
}

export default About;
