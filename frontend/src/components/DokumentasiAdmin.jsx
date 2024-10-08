import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DokumentasiAdmin = () => {
    const [dokumentasi, setDokumentasi] = useState([]);
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        getDokumentasi();
    }, []);

    const getDokumentasi = async () => {
        try {
            const response = await axios.get('http://194.59.165.159:5000/dokumentasi');
            setDokumentasi(response.data);
        } catch (error) {
            console.error('Error fetching dokumentasi:', error);
        }
    };

    const deleteDokumentasi = async (dokumentasiId) => {
        try {
            await axios.delete(`http://194.59.165.159:5000/dokumentasi/${dokumentasiId}`);
            getDokumentasi();
        } catch (error) {
            console.error('Error deleting dokumentasi:', error);
        }
    };

    return (
        <div>
            <h1 style={{marginLeft: '1%', color: hslValue }} className="title">
                Dokumentasi Admin
            </h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className="subtitle">
                Daftar Dokumentasi
            </h2>
            <Link style={{ color: "white" }} to="/dokumentasi/add" className="button is-primary mb-2">
                Tambah Dokumentasi
            </Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Kegiatan</th>
                        <th>Gambar</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dokumentasi.map((dokumentasi, index) => (
                        <tr key={dokumentasi.id}>
                            <td>{index + 1}</td>
                            <td>{dokumentasi.kegiatanName}</td>
                            <td>
                            <a href={`http://194.59.165.159:5000/uploads/dokumentasi/${dokumentasi.imageKegiatan}`} target="_blank" rel="noopener noreferrer">
                                {dokumentasi.imageKegiatan}
                            </a>
                            </td>
                            <td>
                                <Link
                                    style={{ color: "white", marginRight: "3%" }}
                                    to={`/dokumentasi/edit/${dokumentasi.uuid}`}
                                    className="button is-small is-info mr-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    style={{ color: "white", marginRight: "3%" }}
                                    onClick={() => deleteDokumentasi(dokumentasi.uuid)}
                                    className="button is-small is-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DokumentasiAdmin;
