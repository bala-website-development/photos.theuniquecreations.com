
import React, { useState, useEffect } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import axios from "axios";
import config from "../../config.json";

const AlbumList = ({ onEdit }) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
                        <th>Title</th>
                        <th>Description</th>
                        <th>Slug</th>
                        <th>Share URL</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {albums.map((album) => (
                        <tr key={album.id || album.slug}>
                            <td>
                                {album.thumbnail && (
                                    <img
                                        src={album.thumbnail}
                                        alt={album.title}
                                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                                    />
                                )}
                            </td>
                            <td>{album.title}</td>
                            <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {album.description || "-"}
                            </td>
                            <td>{album.slug}</td>
                            <td>
                                <a
                                    href={`https://${config.website}/album/${album.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontSize: "0.9rem" }}
                                >
                                    View
                                </a>
                            </td>
                            <td>{album.createddate}</td>
                            <td>
                                <Button variant="info" size="sm" onClick={() => onEdit(album)}>
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                    {albums.length === 0 && (
                        <tr>
                            <td colSpan="7" className="text-center">No albums found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default AlbumList;
