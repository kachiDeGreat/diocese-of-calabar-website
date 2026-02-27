import ArchdeaconryGrid from "../page-components/ArchdeaconryGrid";
import Banner from "../page-components/Banner";
import { archdeaconries } from "../../data/archdeaconries";

function Archdeaconry() {
  return (
    <>
      <Banner title="Archdeaconry" />
      <div className="container">
        <ArchdeaconryGrid data={archdeaconries} />
      </div>
    </>
  );
}

export default Archdeaconry;
