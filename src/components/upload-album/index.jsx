
import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import AWS from "aws-sdk";
import config from "../../config.json";

const UploadAlbum = ({ initialData, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        thumbnail: "",
        downloadbtnlink1: "",
        downloadbtnname1: "",
        downloadbtnlink2: "",
        downloadbtnname2: "",
        viewlink1: "",
        viewlinkname1: "",
        viewlink2: "",
        viewlinkname2: "",
    });
    const [status, setStatus] = useState({ type: "", message: "" });
    const [submitting, setSubmitting] = useState(false);
    const [file, setFile] = useState(null);
    const [secret, setSecret] = useState(null);
    const [progress, setProgress] = useState("");

    useEffect(() => {
        getsecrets();
    }, []);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                slug: initialData.slug || "",
                thumbnail: initialData.thumbnail || "",
                downloadbtnlink1: initialData.downloadbtnlink1 || "",
                downloadbtnname1: initialData.downloadbtnname1 || "",
                downloadbtnlink2: initialData.downloadbtnlink2 || "",
                downloadbtnname2: initialData.downloadbtnname2 || "",
                viewlink1: initialData.viewlink1 || "",
                viewlinkname1: initialData.viewlinkname1 || "",
                viewlink2: initialData.viewlink2 || "",
                viewlinkname2: initialData.viewlinkname2 || "",
            });
        }
    }, [initialData]);

    const getsecrets = async () => {
        try {
            const response = await fetch(config.aws_service_url + "getsecrets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: "Get Secrets" }),
            });
            const data = await response.json();
            setSecret(data);
        } catch (err) {
            console.error("Failed to fetch secrets:", err);
        }
    };

    const slugify = (text) => {
        return text
            .toString()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const newData = {
                ...prev,
                [name]: value,
            };
            if (name === "title") {
                newData.slug = slugify(value);
            }
            return newData;
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFileToS3 = async () => {
        if (!file || !secret) return null;

        const S3_BUCKET = config.S3_BUCKET_NAME + "home";
        const REGION = "ap-south-1";

        AWS.config.update({
            accessKeyId: secret.s3key,
            secretAccessKey: secret.s3secret,
        });

        const s3 = new AWS.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        });

        const filename = slugify(formData.title) + "-ssndigitalmedia-" + file.name.replace(/\s+/g, "-");
        const params = {
            Bucket: S3_BUCKET,
            Key: filename,
            Body: file,
        };

        return new Promise((resolve, reject) => {
            s3.putObject(params)
                .on("httpUploadProgress", (evt) => {
                    setProgress("Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%");
                })
                .send((err, data) => {
                    if (err) reject(err);
                    else resolve(config.bucketurl + "home/" + filename);
                });
        });
    };

    const getDate = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setStatus({ type: "", message: "" });
        setProgress("");

        try {
            let thumbnailUrl = formData.thumbnail;

            if (file) {
                thumbnailUrl = await uploadFileToS3();
                if (!thumbnailUrl) throw new Error("Failed to upload image");
            }

            const currentYear = new Date().getFullYear();
            const finalData = {
                id: `${formData.slug}-${currentYear}`,
                createdby: "ssndigitalmedia",
                createddate: getDate(),
                downloadbtnlink1: formData.downloadbtnlink1,
                downloadbtnlink2: formData.downloadbtnlink2,
                downloadbtnname1: formData.downloadbtnname1,
                downloadbtnname2: formData.downloadbtnname2,
                isactive: 1,
                slug: formData.slug,
                thumbnail: thumbnailUrl,
                title: formData.title,
                type: "album",
                viewlink1: formData.viewlink1,
                viewlink2: formData.viewlink2,
                viewlinkname1: formData.viewlinkname1,
                viewlinkname2: formData.viewlinkname2
            };

            console.log("Submitting album data:", finalData);

            await fetch(config.aws_service_url + "/items", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                mode: "no-cors",
                body: JSON.stringify(finalData),
            })
                .then((response) => response)
                .then((data) => {
                    if (data.status === 200 || data.status === 0) {
                        setStatus({ type: "success", message: "Album uploaded successfully!" });
                        setFormData({
                            title: "",
                            slug: "",
                            thumbnail: "",
                            downloadbtnlink1: "",
                            downloadbtnname1: "",
                            downloadbtnlink2: "",
                            downloadbtnname2: "",
                            viewlink1: "",
                            viewlinkname1: "",
                            viewlink2: "",
                            viewlinkname2: "",
                        });
                        setFile(null);
                        setProgress("");
                    } else {
                        setStatus({ type: "danger", message: "Upload might have failed or returned unexpected status." });
                    }
                })
                .catch((err) => {
                    console.error("Upload error:", err);
                    setStatus({ type: "danger", message: "Failed to upload album: " + err.message });
                });
        } catch (error) {
            console.error("Upload failed:", error);
            setStatus({ type: "danger", message: "Failed to upload album: " + error.message });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="upload-album-form p-4 bg-white rounded shadow-sm">
            <h3 className="mb-4">Upload New Album</h3>
            {status.message && <Alert variant={status.type}>{status.message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Album Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="e.g., First Birthday 2025"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Slug (Auto-populated)</Form.Label>
                            <Form.Control
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                placeholder="e.g., first-birthday-2025"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Thumbnail Image</Form.Label>
                            {formData.thumbnail && (
                                <div className="mb-2">
                                    <img src={formData.thumbnail} alt="Current Thumbnail" style={{ width: "100px", height: "auto", marginRight: "10px" }} />
                                    <small className="text-muted d-block mt-1">Current URL: {formData.thumbnail}</small>
                                </div>
                            )}
                            <Form.Control
                                type="file"
                                onChange={handleFileChange}
                                required={!formData.thumbnail}
                            />
                            <Form.Text className="text-muted">
                                {formData.thumbnail ? "Upload a new file to replace the current thumbnail, or leave empty to keep it." : "Upload a thumbnail image."}
                            </Form.Text>
                            {progress && <div className="text-muted small mt-1">{progress}</div>}
                        </Form.Group>
                    </Col>
                </Row>

                <hr />
                <h5>Download Links</h5>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Download Button 1 Name</Form.Label>
                            <Form.Control type="text" name="downloadbtnname1" value={formData.downloadbtnname1} onChange={handleChange} placeholder="e.g., Download High Quality Photo Album" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Download Button 1 Link</Form.Label>
                            <Form.Control type="text" name="downloadbtnlink1" value={formData.downloadbtnlink1} onChange={handleChange} placeholder="https://..." />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Download Button 2 Name</Form.Label>
                            <Form.Control type="text" name="downloadbtnname2" value={formData.downloadbtnname2} onChange={handleChange} placeholder="e.g., Download 4K Video" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Download Button 2 Link</Form.Label>
                            <Form.Control type="text" name="downloadbtnlink2" value={formData.downloadbtnlink2} onChange={handleChange} placeholder="https://..." />
                        </Form.Group>
                    </Col>
                </Row>

                <hr />
                <h5>View Links</h5>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>View Link 1 Name</Form.Label>
                            <Form.Control type="text" name="viewlinkname1" value={formData.viewlinkname1} onChange={handleChange} placeholder="e.g., View Photo Album" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>View Link 1 URL</Form.Label>
                            <Form.Control type="text" name="viewlink1" value={formData.viewlink1} onChange={handleChange} placeholder="https://..." />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>View Link 2 Name</Form.Label>
                            <Form.Control type="text" name="viewlinkname2" value={formData.viewlinkname2} onChange={handleChange} placeholder="e.g., Watch Video" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>View Link 2 URL</Form.Label>
                            <Form.Control type="text" name="viewlink2" value={formData.viewlink2} onChange={handleChange} placeholder="https://..." />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="warning" type="submit" disabled={submitting} className="mt-3">
                    {submitting ? "Uploading..." : "Upload Album"}
                </Button>
            </Form>
        </div>
    );
};

export default UploadAlbum;

