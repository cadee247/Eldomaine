import React, { useState, useEffect, useRef } from "react";
import "../css/Gallery.css";
import { FaSearchPlus, FaTimesCircle, FaCameraRetro, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Automatically import all .png, .jpg, and .jpeg images
const importImages = () => {
  const images = import.meta.glob("../assets/Gallery/*.{png,jpg,jpeg}", {
    eager: true,
    import: "default",
  });
  return Object.values(images);
};

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const imgs = importImages();
    console.log("🖼️ Loaded gallery images:", imgs);
    setImages(imgs);
  }, []);

  // Intersection Observer for fade-in animations (already handled by CSS, but can enhance if needed)

  const openLightbox = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'auto';
  };

  const goToPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // Generate dummy captions for wow factor (can customize)
  const getCaption = (index) => {
    const captions = [
      "Capturing joyful moments in class",
      "Blood donations",
      "Sport's day",
      "Chess tournament intensity",
      "Netball team spirit",
      "SANBS visit for blood donation",
      "Netball team spirit",
      "Blood donations",
      "Dedicated teacher",
      "Bring anything but a school bag day",
      "Sports event",
      "Presentation",
      "Collaborations with other schools",
      "Grade 11's",
      "Science experiments in action",
      "Soccer match preparation",
      "Chess match focus",
      "Soccer match action",
      "Netball practice",
      // Add more or make dynamic
    ];
    return captions[index % captions.length];
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="gallery-overlay">
          <h1>
            <FaCameraRetro /> School Memories Gallery
          </h1>
          <p>Moments captured through the lens of learning, laughter, and legacy. Dive into our stunning collection!</p>
        </div>
      </section>

      {/* Image Grid */}
      <section className="gallery-grid-section" ref={galleryRef}>
        <h2>📸 Explore Our Highlights</h2>

        {images.length === 0 ? (
          <div className="gallery-loading">
            <h3>⚠️ No images found in <code>src/assets/Gallery/</code></h3>
            <p>Check file names, extensions (.png/.jpg/.jpeg), and capitalization.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {images.map((img, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => openLightbox(index)}
              >
                <img src={img} alt={`Gallery ${index + 1}`} loading="lazy" />
                <div className="overlay">
                  <FaSearchPlus className="zoom-icon" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Enhanced Lightbox */}
      {selectedIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <FaTimesCircle className="close-icon" onClick={closeLightbox} />
            <FaChevronLeft className="nav-arrow nav-left" onClick={goToPrev} />
            <img src={images[selectedIndex]} alt="Full preview" className="lightbox-img" />
            <FaChevronRight className="nav-arrow nav-right" onClick={goToNext} />
            <p className="lightbox-caption">{getCaption(selectedIndex)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;