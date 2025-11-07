import React from "react";
import "../css/hero.css";

const Hero = ({ image, title, type }) => {
  return (
    <section className={`hero ${type}`}>
      <img src={image} alt={`${title} background`} />
      <div className="hero-text">
        <h1>{title}</h1>
      </div>
    </section>
  );
};

export default Hero;
