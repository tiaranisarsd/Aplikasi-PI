import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TentangKegiatanAdmin = () => {
    const [tentangKegiatan, setTentangKegiatan] = useState([]);
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        getTentangKegiatan();
    }, []);

    const getTentangKegiatan = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tentangKegiatan');
            setTentangKegiatan(response.data);
        } catch (error) {
            console.error('Error fetching tentangKegiatan:', error);
        }
    };

    const deleteTentangKegiatan = async (tentangKegiatanId) => {
        try {
            await axios.delete(`http://localhost:5000/tentangKegiatan/${tentangKegiatanId}`);
            getTentangKegiatan();
        } catch (error) {
            console.error('Error deleting tentangKegiatan:', error);
        }
    };

        // Fungsi untuk memformat tanggal
        const formatTanggal = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('id-ID', options);
        };
    

    return (
        <div>
            <h1 style={{marginLeft: '1%', color: hslValue }} className="title">
                Tentang Kegiatan Admin
            </h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className="subtitle">
                Daftar Tentang Kegiatan
            </h2>
            <Link style={{ color: "white" }} to="/tentangKegiatan/add" className="button is-primary mb-2">
                Tambah Informasi Kegiatan
            </Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Judul Kegiatan</th>
                        <th>Gambar</th>
                        <th>Tanggal</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tentangKegiatan.map((tentangKegiatan, index) => (
                        <tr key={tentangKegiatan.id}>
                            <td>{index + 1}</td>
                            <td>{tentangKegiatan.judulKegiatan}</td>
                            <td>
                            <a href={`http://localhost:5000/uploads/tentangKegiatan/${tentangKegiatan.image}`} target="_blank" rel="noopener noreferrer">
                                {tentangKegiatan.image}
                            </a>
                            </td>
                            <td>{formatTanggal(tentangKegiatan.tanggal)}</td>
                            <td>
                                <Link
                                    style={{ color: "white", marginRight: "3%" }}
                                    to={`/tentangKegiatan/edit/${tentangKegiatan.uuid}`}
                                    className="button is-small is-info mr-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    style={{ color: "white", marginRight: "3%" }}
                                    onClick={() => deleteTentangKegiatan(tentangKegiatan.uuid)}
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

export default TentangKegiatanAdmin;
