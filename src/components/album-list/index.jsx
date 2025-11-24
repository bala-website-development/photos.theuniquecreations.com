
import React, { useState, useEffect } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import axios from "axios";
import config from "../../config.json";

const AlbumList = ({ onEdit }) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copiedId, setCopiedId] = useState(null);

    const handleCopyUrl = (slug, albumId) => {
        const url = `https://${config.website}/album/${slug}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopiedId(albumId);
            setTimeout(() => setCopiedId(null), 2000);
        }).catch(err => {
            console.error('Failed to copy URL:', err);
            alert('Failed to copy URL');
        });
    };

    const handleToggleActive = async (album) => {
        try {
            const updatedAlbum = {
                ...album,
                isactive: album.isactive === 1 ? 0 : 1,
                updateddate: new Date().toLocaleDateString('en-US')
            };

            await fetch(config.aws_service_url + "/items", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
                mode: "no-cors",
                body: JSON.stringify(updatedAlbum),
            });

            // Refresh the album list
            fetchAlbums();
        } catch (err) {
            console.error('Failed to toggle album status:', err);
            alert('Failed to update album status');
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            const value = "album";
            const response = await axios.get(config.aws_service_url + "itemsbytype/" + value);
            const sorteddata = response?.data.sort((b, a) => {
                const dateA = new Date(a.createddate);
                const dateB = new Date(b.createddate);
                return dateA - dateB;
            });
            setAlbums(sorteddata || []);
        } catch (err) {
            console.error("Failed to fetch albums:", err);
            setError("Failed to load albums.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading albums...</p>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div className="album-list bg-white p-4 rounded shadow-sm">
            <h3 className="mb-4">Existing Albums</h3>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Title/View</th>
                        {/* <th>Description</th> */}
                        {/* <th>Slug</th> */}
                        <th>Share</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {albums.map((album) => (
                        <tr key={album.id || album.slug} style={{ verticalAlign: "middle" }}>
                            <td>
                                {album.thumbnail && (
                                    <img
                                        src={album.thumbnail}
                                        alt={album.title}
                                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                                    />
                                )}
                            </td>
                            <td>
                                <a
                                    href={`https://${config.website}/album/${album.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#b37905", textDecoration: "none", fontWeight: "500" }}
                                >
                                    {album.title}
                                </a><br /><small>{album.slug}</small>
                            </td>
                            {/* <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {album.description || "-"}
                            </td> */}
                            {/* <td>{album.slug}</td> */}
                            <td>
                                <Button
                                    variant={copiedId === album.id ? "success" : "outline-secondary"}
                                    size="sm"
                                    onClick={() => handleCopyUrl(album.slug, album.id)}
                                    title="Copy URL to clipboard"
                                    style={{ padding: "2px 8px", fontSize: "0.8rem" }}
                                >
                                    {copiedId === album.id ? (
                                        <>✓ Copied!</>
                                    ) : (
                                        <>Copy</>
                                    )}
                                </Button>
                            </td>
                            <td>{album.createddate}</td>
                            <td>{album.updateddate || "-"}</td>
                            <td>
                                <Button
                                    variant={album.isactive === 1 ? "success" : "danger"}
                                    size="sm"

                                    onClick={() => handleToggleActive(album)}
                                    style={{ minWidth: "80px" }}
                                >
                                    {album.isactive === 1 ? "Active" : "Inactive"}
                                </Button>
                            </td>
                            <td>
                                <Button variant="info" size="sm" onClick={() => onEdit(album)}>
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {albums.length === 0 && (
                        <tr>
                            <td colSpan="9" className="text-center">No albums found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default AlbumList;
