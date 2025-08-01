import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/visionAndMission.css";

function VisionAndMission() {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="fs-1 text-center fw-bold text-uppercase mt-4">
              mission & <span style={{ background: "#c52810" }}>vision</span>
            </h1>
            <div className="archtitle-underline"></div>

            <div className="mt-3">
              <p className="v-p">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                pariatur aut cumque temporibus, molestiae ut accusantium?
              </p>
              <p className="v-p">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius
                nisi nobis laborum, numquam, cumque similique corporis at nam,
                consequuntur doloribus officiis eum ab recusandae.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisionAndMission;
