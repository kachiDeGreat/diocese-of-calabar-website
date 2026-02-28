import ArchdeaconryGrid from "../page-components/ArchdeaconryGrid";
import Banner from "../page-components/Banner";
import { archdeaconries } from "../../data/archdeaconries";
import SEO from "../page-components/SEO"; // <-- Import SEO

function Archdeaconry() {
  return (
    <>
      <SEO
        title="Our Archdeaconries"
        description="Explore the various Archdeaconries and Deaneries that make up the Anglican Diocese of Calabar."
      />
      <Banner title="Archdeaconry" />
      <div className="container">
        <ArchdeaconryGrid data={archdeaconries} />
      </div>
    </>
  );
}

export default Archdeaconry;
