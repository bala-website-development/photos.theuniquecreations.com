import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";

import { Helmet } from "react-helmet";

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
        const albumData = response.data[0];
        // Only show active albums on public page
        if (albumData.isactive === 1) {
          setAlbum(albumData);
        } else {
          setError("Album not found");
        }
      } else {
        setError("Album not found");
      }
    } catch (err) {
      setError("Failed to fetch album details");
    }
    setLoading(false);
  };

  const calculateDaysRemaining = (createdDate) => {
    if (!createdDate) return 0;

    const created = new Date(createdDate);
    const today = new Date();
    const expiryDate = new Date(created);
    expiryDate.setDate(created.getDate() + 90);

    const timeDiff = expiryDate - today;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysRemaining > 0 ? daysRemaining : 0;
  };

  if (loading) {
    return (
      <p style={styles.loadingText} className="px-4">
        Loading album details...
      </p>
    );
  }

  if (error) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.errorContainer}>
          <h2 style={styles.errorTitle}>Album Not Available</h2>
          <p style={styles.errorMessage}>
            The album you're looking for is not available or has been removed.
          </p>
          <a href="/" style={styles.homeLink}>
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      {album && (
        <>
          <Helmet>
            <title>{album.title} | SSN Digital Media</title>
            <meta property="og:title" content={album.title} />
            <meta property="og:description" content={album.description || `View the album: ${album.title}`} />
            <meta property="og:image" content={album.thumbnail} />
            <meta property="og:url" content={`https://${config.website}/album/${album.slug}`} />
            <meta property="og:type" content="website" />
          </Helmet>

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
              {album.albumlink && (
                <div>
                  <a href={album.albumlink} target="_blank" align="center" className="btn-warning text-dark w-100" rel="noopener noreferrer" style={styles.downloadBtn}>
                    View Photo Album
                  </a>
                </div>
              )}
              {album.downloadbtnlink && (
                <div className="mt-1">
                  <a href={album.downloadbtnlink} target="_blank" align="center" className="btn-warning text-dark w-100" rel="noopener noreferrer" style={styles.downloadBtn}>
                    {album.downloadbtnname || "Download"}
                  </a>
                </div>
              )}
              {/* added new */}
              {album.viewlink1 && (
                <div className="mt-1">
                  <a href={album.viewlink1} target="_blank" align="center" className="btn-warning text-dark w-100" rel="noopener noreferrer" style={styles.downloadBtn}>
                    {album.viewlinkname1 || "Download"}
                  </a>
                </div>
              )}
              {album.viewlink2 && (
                <div className="mt-1">
                  <a href={album.viewlink2} target="_blank" align="center" className="btn-warning text-dark w-100" rel="noopener noreferrer" style={styles.downloadBtn}>
                    {album.viewlinkname2 || "Download"}
                  </a>
                </div>
              )}
              {album.downloadbtnlink1 && (
                <div className="mt-1">
                  <a href={album.downloadbtnlink1} target="_blank" align="center" className="btn-warning text-dark w-100" rel="noopener noreferrer" style={styles.downloadBtn}>
                    {album.downloadbtnname1 || "Download"}
                  </a>
                </div>
              )}
              {album.downloadbtnlink2 && (
                <div className="mt-1">
                  <a href={album.downloadbtnlink2} target="_blank" align="center" className="btn-warning text-dark w-100" rel="noopener noreferrer" style={styles.downloadBtn}>
                    {album.downloadbtnname2 || "Download"}
                  </a>
                </div>
              )}
              <div style={styles.daysRemaining}>
                <small style={{ color: calculateDaysRemaining(album.createddate) <= 10 ? "#dc3545" : "#666" }}>
                  {calculateDaysRemaining(album.createddate)} days remaining to expire
                </small>
              </div>
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
  daysRemaining: {
    marginTop: "0.5rem",
    fontSize: "0.9rem",
  },
  loadingText: {
    fontSize: "1.5rem",
    marginTop: "3rem",
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    padding: "2rem",
    textAlign: "center",
  },
  errorTitle: {
    fontSize: "2rem",
    color: "#dc3545",
    marginBottom: "1rem",
  },
  errorMessage: {
    fontSize: "1.1rem",
    color: "#666",
    marginBottom: "2rem",
    maxWidth: "500px",
  },
  homeLink: {
    fontSize: "1rem",
    color: "#c69203ff",
    textDecoration: "none",
    padding: "0.5rem 1.5rem",
    border: "1px solid #c69203ff",
    borderRadius: "5px",
    transition: "all 0.3s ease",
  },
};

export default AlbumDetail;
