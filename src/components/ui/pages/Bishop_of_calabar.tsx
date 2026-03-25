import Banner from "../page-components/Banner";
import BishopIntro from "../page-components/BishopIntro";
import SEO from "../page-components/SEO"; // <-- Import SEO

function Bishop_of_calabar() {
  return (
    <>
      <SEO
        title="The Bishop of Calabar"
        description="Meet The Rt. Rev'd. Prof. Nneoyi Onen Egbe, Lord Bishop of Calabar, and explore his messages, biography, and teachings."
        url="/bishop-of-calabar/"
        image="https://dropimg.onyekachi.dev/wnpxtpcee40rzbs4gt4p"
      />
      <Banner title="Bishop of Calabar Diocese" />
      <BishopIntro />
    </>
  );
}

export default Bishop_of_calabar;
