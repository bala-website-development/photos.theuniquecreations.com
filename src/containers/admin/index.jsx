import React, { useState, useEffect } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import AdminImageGallery from "../../components/gallery-form";
import UploadAlbum from "../../components/upload-album";
import AlbumList from "../../components/album-list";

const AdminContainer = () => {
  const [key, setKey] = useState("gallery");
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [authorise, setAuthorise] = useState(false);

  const handleEdit = (album) => {
    setEditingAlbum(album);
  };

  const handleBackToList = () => {
    setEditingAlbum(null);
  };

  const handleSuccess = () => {
    setEditingAlbum(null);
    // Optionally refresh list or show success message
  };

  const password = (e) => {
    if (e === "pappu") {
      setAuthorise(true);
      const session = {
        value: btoa("pappu"), // Simple encoding
        expiry: new Date().getTime() + 7 * 24 * 60 * 60 * 1000, // 7 days
      };
      localStorage.setItem("admin_session", JSON.stringify(session));
    } else {
      setAuthorise(false);
    }
  };

  useEffect(() => {
    const checkSession = () => {
      const sessionStr = localStorage.getItem("admin_session");
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        if (new Date().getTime() < session.expiry && atob(session.value) === "pappu") {
          setAuthorise(true);
        } else {
          localStorage.removeItem("admin_session");
          setAuthorise(false);
        }
      }
    };
    checkSession();
  }, []);

  return (
    <div className="admin-area py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-lg-8 m-auto text-center mb-5" data-aos="fade-up">
            <h2 className="title">Admin Dashboard</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            {!authorise ? (
              <div className="text-center">
                <div className="form-group" style={{ maxWidth: "400px", margin: "0 auto" }}>
                  <input
                    className="form-control"
                    type="password"
                    onChange={(e) => password(e.target.value)}
                    placeholder="Enter password"
                    autoFocus
                  />
                  <small className="form-text text-muted mt-2">
                    Please enter the admin password to access the dashboard
                  </small>
                </div>
              </div>
            ) : (
              <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="admin-tabs" className="mb-4 justify-content-center">
                <Tab eventKey="gallery" title="Gallery Management">
                  <div className="contact-form">
                    <div className="text-center" data-aos="fade-up">
                      <AdminImageGallery />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="upload-album" title="Upload Album">
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <UploadAlbum />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="view-edit-album" title="View/Edit Album">
                  <div className="row justify-content-center">
                    <div className="col-md-10">
                      {editingAlbum ? (
                        <div>
                          <Button variant="secondary" className="mb-3" onClick={handleBackToList}>
                            &larr; Back to List
                          </Button>
                          <UploadAlbum initialData={editingAlbum} onSuccess={handleSuccess} />
                        </div>
                      ) : (
                        <AlbumList onEdit={handleEdit} />
                      )}
                    </div>
                  </div>
                </Tab>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContainer;
