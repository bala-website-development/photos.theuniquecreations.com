import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";

const AlbumDetail = () => {
  const { slug } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAlbumDetails();
  }, [slug]);

  const fetchAlbumDetails = async () => {
    try {
      const response = await axios.get(`${config.aws_service_url}/items/slug/${slug}`);
      if (response.data && response.data.length > 0) {
        setAlbum(response.data[0]); // Assuming first match
      } else {
        setError("Album not found");
      }
    } catch (err) {
      setError("Failed to fetch album details");
    }
    setLoading(false);
  };

  if (loading) {
    return <p style={styles.loadingText}>Loading album details...</p>;
  }

  if (error) {
    return <p style={styles.errorText}>{error}</p>;
  }

  return (
    <div style={styles.pageContainer}>
      {album && (
        <>
          {/* Responsive Banner Section */}
          <header style={styles.banner}>
            <img src={album.bannerimage} alt={album.title} style={styles.bannerImage} />
          </header>

          {/* Album Card Section */}
          <div style={styles.container}>
            <section style={styles.albumCard}>
              {/* Album Title */}
              <h1 style={styles.albumTitle}>{album.title}</h1>

              {/* Thumbnail - Clickable */}
              <div style={styles.thumbnailWrapper}>
                <a href={album.albumlink} target="_blank" rel="noopener noreferrer" style={styles.thumbnailLink}>
                  <img src={album.thumbnail} alt={album.title} style={styles.thumbnailImg} />
                </a>
              </div>

              {/* Description */}
              <p style={styles.albumDescription}>{album.description}</p>

              {/* Album Name */}
              <div style={styles.albumMeta}>
                <strong>Album Name: </strong>
                <span style={styles.albumName}>{album.albumname}</span>
              </div>

              {/* View Album Button */}
              <div>
                <a href={album.albumlink} target="_blank" className="btn-warning text-dark w-100" rel="noopener noreferrer" style={styles.downloadBtn}>
                  View Album
                </a>
              </div>
            </section>
          </div>

          {/* Footer Section */}
          <footer style={styles.footer}>
            <div style={styles.footerLinks}>
              <a href="/" style={styles.footerLink}>
                Home
              </a>{" "}
              | <span>SSN Digital Media Services</span>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  pageContainer: {
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
    paddingBottom: "0rem",
  },
  banner: {
    width: "100%",
    maxHeight: "auto",
    overflow: "hidden",
    padding: "0.5rem",
  },
  bannerImage: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "10px",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },
  albumCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "2rem",
    marginBottom: "2rem",
  },
  albumTitle: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  thumbnailWrapper: {
    marginBottom: "1.5rem",
  },
  thumbnailImg: {
    width: "100%",
    maxWidth: "600px",
    height: "auto",
    objectFit: "cover",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  thumbnailImgHover: {
    transform: "scale(1.05)",
  },
  albumDescription: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "1.5rem",
  },
  albumMeta: {
    fontSize: "1.1rem",
    marginBottom: "1rem",
  },
  albumName: {
    fontWeight: "bold",
    color: "#333",
  },
  downloadBtn: {
    display: "inline-block",
    padding: "1rem 2rem",

    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  footer: {
    marginTop: "4rem",
    padding: "1rem 0",
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #ddd",
  },
  footerLinks: {
    marginBottom: "0rem",
    fontSize: "1.1rem",
  },
  footerLink: {
    textDecoration: "none",
    color: "#007bff",
    margin: "0 0.5rem",
  },
  footerText: {
    fontSize: "1rem",
    color: "#555",
  },
  loadingText: {
    fontSize: "1.5rem",
    marginTop: "3rem",
  },
  errorText: {
    fontSize: "1.5rem",
    color: "red",
    marginTop: "3rem",
  },
};

export default AlbumDetail;
