import React, { useState, useEffect } from "react";
import "../css/Gallery.css";
import { FaTimesCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import coverImg from "../assets/cover.png"; // ✅ hero image
import Hero from "../Components/Hero"; // reusable Hero component

// Automatically import all .png, .jpg, and .jpeg images
const importImages = () => {
  const images = import.meta.glob("../assets/Gallery/*.{png,jpg,jpeg}", {
    eager: true,
    import: "default",
  });
  const imgsArray = Object.values(images);
  return imgsArray.slice(1); // skip first if needed
};

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const imgs = importImages();
    setImages(imgs);
  }, []);

  const openLightbox = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "auto";
  };

  const goToPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <Hero image={coverImg} title="Gallery Highlights" type="gallery" />

      {/* Gallery Grid */}
      <section className="gallery-grid-section">
        <h2>Explore Our Highlights</h2>
        {images.length === 0 ? (
          <div className="gallery-loading">
            <h3>No images found in <code>src/assets/Gallery/</code></h3>
          </div>
        ) : (
          <div className="gallery-grid">
            {images.map((img, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <FaTimesCircle
              className="close-icon"
              onClick={closeLightbox}
              style={{ color: "#ff5555" }}
            />
            <FaChevronLeft className="nav-arrow nav-left" onClick={goToPrev} />
            <img
              src={images[selectedIndex]}
              alt="Full preview"
              className="lightbox-img"
              style={{
                maxHeight: "80vh",
                maxWidth: "90vw",
                objectFit: "contain",
              }}
            />
            <FaChevronRight className="nav-arrow nav-right" onClick={goToNext} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
