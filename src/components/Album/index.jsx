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
    return (
      <p style={styles.loadingText} className="px-4">
        Loading album details...
      </p>
    );
  }

  if (error) {
    return <p style={styles.errorText}>{error}</p>;
  }

  return (
    <div style={styles.pageContainer}>
      {album && (
        <>
          {/* Responsive Banner Section */}
          {album.showbanner && (
            <header style={styles.banner}>
              <img src={album.bannerimage} alt={album.title} style={styles.bannerImage} />
            </header>
          )}

          {/* Album Card Section */}
          <div style={styles.container}>
            <section style={styles.albumCard} align="center">
              <h1 style={styles.albumTitle}>{album.title}</h1>

              {/* Thumbnail - Clickable */}
              <div style={styles.thumbnailWrapper}>
                <a href={album.albumlink} target="_blank" rel="noopener noreferrer">
                  <img src={album.thumbnail} alt={album.title} style={styles.thumbnailImg} />
                </a>
              </div>

              <p style={styles.albumDescription}>{album.description}</p>

              <div style={styles.albumMeta}>
                <span style={styles.albumName}>{album.albumname}</span>
              </div>

              <div>
                <a href={album.albumlink} target="_blank" align="center" className="btn-warning text-dark w-100" rel="noopener noreferrer" style={styles.downloadBtn}>
                  View Photo Album
                </a>
              </div>
              {album.downloadbtnlink ||
                (album.downloadbtnlink !== "" && (
                  <div>
                    <a href={album.downloadbtnlink} target="_blank" align="center" className="btn-warning text-dark w-100" rel="noopener noreferrer" style={styles.downloadBtn}>
                      {album.downloadbtnname || "Download"}
                    </a>
                  </div>
                ))}
            </section>
          </div>

          {/* Footer Section */}
          <footer style={styles.footer}>
            <div style={styles.footerLinks} align="center">
              <a href="/" className="text-secondary" style={styles.footerLink}>
                <span>SSN Digital Media - Photography</span>
              </a>
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
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "'Arial', sans-serif",
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
    flex: 1, // Make the container grow to fill space
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },
  albumCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
    marginBottom: "2rem",
  },
  albumTitle: {
    fontSize: "1.5rem",
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
    borderRadius: "5px",
    cursor: "pointer",
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
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "1rem",
  },
  footer: {
    padding: "0.5rem 0",
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #ddd",
  },
  footerLinks: {
    marginBottom: "0rem",
    fontSize: "1rem",
  },
  footerLink: {
    textDecoration: "none",
    color: "#007bff",
    margin: "0 0.5rem",
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
