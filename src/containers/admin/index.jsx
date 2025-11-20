import React, { useState } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import AdminImageGallery from "../../components/gallery-form";
import UploadAlbum from "../../components/upload-album";
import AlbumList from "../../components/album-list";

const AdminContainer = () => {
  const [key, setKey] = useState("gallery");
  const [editingAlbum, setEditingAlbum] = useState(null);

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContainer;
