import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/intro.module.css";

function Belief() {
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-12 col-lg-5 p-0">
            <img
              src="https://placehold.co/600x700"
              className="img-fluid"
              alt="..."
            ></img>
          </div>
          <div className="col-12 col-lg-7 p-4 pr">
            <h1 className={styles.mainTitle} style={{textTransform: "uppercase"}}>
              Our Belief
              <span className={styles.titleYear}> </span>
            </h1>

            <div
              className="archtitle-underline"
              style={{ margin: "1rem" }}
            ></div>
            <p className="b-p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              corrupti vero cum eius quibusdam voluptas hic natus tempore, eum
              mollitia quos accusamus? Ratione, voluptatum vero!
            </p>
            <p className="b-p">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Excepturi nihil officiis blanditiis itaque harum dignissimos at
              tenetur voluptates animi iure eius ea molestiae, esse quaerat
              dolorum! Tempore ut alias repudiandae?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Belief;
