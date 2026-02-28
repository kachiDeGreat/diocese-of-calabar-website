import Banner from "../page-components/Banner";
import BishopIntro from "../page-components/BishopIntro";
import SEO from "../page-components/SEO"; // <-- Import SEO

function Bishops() {
  return (
    <>
      <SEO
        title="The Bishop of Calabar"
        description="Meet The Rt. Rev'd. Prof. Nneoyi Onen Egbe, Lord Bishop of Calabar, and explore his messages, biography, and teachings."
      />
      <Banner title="Bishop of Calabar Diocese" />
      <BishopIntro />
    </>
  );
}

export default Bishops;
