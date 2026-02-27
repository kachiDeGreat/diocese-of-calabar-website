import Banner from "../page-components/Banner";
import OfficialsSection from "../page-components/OfficialsSection";
import { officialsData } from "../../data/officialsData";

function DiocesanOfficials() {
  return (
    <>
      <Banner title="Diocesan Officials" />
      <OfficialsSection
        officials={officialsData}
        // headerSubtitle="LEADERSHIP"
        // headerTitle="diocesan officials"
      />
    </>
  );
}

export default DiocesanOfficials;
