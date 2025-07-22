import React from "react";
import "../styles/BishopMessage.css";
import Button from "./button";

function BishopMessage() {
  const vimeoVideoId = "76979871"; // Replace with your bishop's message video ID

  return (
    <section className="BishopMessage-hero">
      <div className="BishopMessage-overlay"></div>

      <div className="BishopMessage-container">
        <div className="BishopMessage-content">
          <div className="BishopMessage-header">
            <div className="BishopMessage-badge">New Month Message</div>
            <h1 className="BishopMessage-title">
              <span className="BishopMessage-titleHighlight">Bishop's</span>{" "}
              Divine Word
            </h1>
            <p className="BishopMessage-intro">
              Watch this month's special message from our beloved Bishop
            </p>
          </div>

          <div className="BishopMessage-videoContainer">
            <div className="BishopMessage-videoWrapper">
              <iframe
                src={`https://player.vimeo.com/video/${vimeoVideoId}?autoplay=0&title=0&byline=0&portrait=0`}
                className="BishopMessage-video"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Bishop's New Month Message"
              ></iframe>
              <div className="BishopMessage-videoOverlay"></div>
              {/* <div className="BishopMessage-videoBadge">LIVE</div> */}
            </div>

            <div className="BishopMessage-videoControls">
              <Button
                size="medium"
                onClick={() => {
                  console.log("hi");
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
                Play Full Message
              </Button>
            </div>
          </div>

          <div className="BishopMessage-footer">
            <p className="BishopMessage-date">
              Posted on the 1st of every month
            </p>
            <button className="BishopMessage-ctaButton">
              View Previous Messages
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BishopMessage;
