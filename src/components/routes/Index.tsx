import React from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "../ui/pages/Home";
import About from "../ui/pages/About";
import LineLoader from "../ui/page-components/LineLoader";
import Bishops from "../ui/pages/Bishops";
import Archdeaconry from "../ui/pages/Archdeaconry";
import ArchdeaconryDetails from "../ui/pages/ArchdeaconryDetails";
import NotFound from "../ui/pages/NotFound";
import ScrollToTop from "../ui/page-components/ScrollToTop ";

function Index() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <LineLoader />
      <Routes>
        {/* LIVE PAGES (Already Built) */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us/" element={<About />} />
        <Route path="/bishop-of-calabar/" element={<Bishops />} />
        <Route path="/archdeaconries/" element={<Archdeaconry />} />
        <Route path="/archdeaconries/:slug" element={<ArchdeaconryDetails />} />

        <Route
          path="/give"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="Our online giving portal is currently being set up. Check back soon!"
            />
          }
        />
        <Route
          path="/vacancies"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="Diocesan job vacancies will be posted here."
            />
          }
        />

        <Route
          path="/diocesan-officials/"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="The Diocesan Officials directory is currently being compiled."
            />
          }
        />
        <Route
          path="/synod-office"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="Information regarding the Synod Office will be available shortly."
            />
          }
        />
        <Route
          path="/schools"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="Information about our Diocesan Schools is coming soon."
            />
          }
        />

        <Route
          path="/find-church"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="Our Church Locator tool is currently under construction."
            />
          }
        />
        <Route
          path="/clergy-directory"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="The Clergy Directory is currently being updated for the new year."
            />
          }
        />
        <Route
          path="/contact"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="Our official Contact page will be available shortly."
            />
          }
        />

        <Route
          path="/directorates"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="The Directorates section is under construction."
            />
          }
        />
        <Route
          path="/womens-girls"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="The Women's & Girls Organisations page is coming soon."
            />
          }
        />
        <Route
          path="/children"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="The Children's Ministry page is coming soon."
            />
          }
        />
        <Route
          path="/young-people"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="The Young People's Ministry page is coming soon."
            />
          }
        />
        <Route
          path="/elders"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="The Elders Ministry page is coming soon."
            />
          }
        />

        <Route
          path="/video"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="Our Video Library and Bishop's Messages are currently being uploaded."
            />
          }
        />
        <Route
          path="/podcast"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="Our Diocesan Podcast will be launching soon."
            />
          }
        />
        <Route
          path="/store"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="The Diocesan Store is currently under construction."
            />
          }
        />
        <Route
          path="/downloads"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="The Downloads Hub will be available shortly."
            />
          }
        />

        <Route
          path="/diocesan-reports"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="Diocesan Reports are being digitized and will be here soon."
            />
          }
        />
        <Route
          path="/policies"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="Policies and Procedures are currently being updated."
            />
          }
        />
        <Route
          path="/catechism"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="The Catechism resource page is coming soon."
            />
          }
        />
        <Route
          path="/creeds"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="The Collection of Creeds will be available shortly."
            />
          }
        />
        <Route
          path="/39-articles"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="The 39 Articles of Religion page is coming soon."
            />
          }
        />
        <Route
          path="/gafcon"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="GAFCON Statements will be posted here soon."
            />
          }
        />
        <Route
          path="/others-library"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="Additional library resources are currently being compiled."
            />
          }
        />
        <Route
          path="/forms"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="Forms and Applications will be ready for download soon."
            />
          }
        />

        <Route
          path="/news"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="We are currently working on the News section. Check back soon for updates from the Diocese!"
            />
          }
        />
        <Route
          path="/events"
          element={
            <NotFound
              is404={false}
              title="Coming Soon"
              message="Our Events calendar is being prepared."
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HelmetProvider>
  );
}

export default Index;
