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
            const response = await axios.get('http://localhost:5000/dokumentasi');
            setDokumentasi(response.data);
        } catch (error) {
            console.error('Error fetching dokumentasi:', error);
        }
    };

    const deleteDokumentasi = async (dokumentasiId) => {
        try {
            await axios.delete(`http://localhost:5000/dokumentasi/${dokumentasiId}`);
            getDokumentasi();
        } catch (error) {
            console.error('Error deleting dokumentasi:', error);
        }
    };

    return (
        <div>
            <h1 style={{marginTop: '10%', marginLeft: '1%', color: hslValue }} className="title">
                Dokumentasi Admin
            </h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className="subtitle">
                Daftar Dokumentasi
            </h2>
            <Link to="/dokumentasi/add" className="button is-primary mb-2">
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
                            <a href={`http://localhost:5000/uploads/dokumentasi/${dokumentasi.imageKegiatan}`} target="_blank" rel="noopener noreferrer">
                                {dokumentasi.imageKegiatan}
                            </a>
                            </td>
                            <td>
                                <Link
                                    to={`/dokumentasi/edit/${dokumentasi.uuid}`}
                                    className="button is-small is-info mr-2"
                                >
                                    Edit
                                </Link>
                                <button
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
