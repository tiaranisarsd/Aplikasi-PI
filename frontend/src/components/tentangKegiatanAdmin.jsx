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

    return (
        <div>
            <h1 style={{marginTop: '10%', marginLeft: '1%', color: hslValue }} className="title">
                TentangKegiatan List
            </h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className="subtitle">
                List of TentangKegiatan
            </h2>
            <Link to="/tentangKegiatan/add" className="button is-primary mb-2">
                Tambah Tentang Kegiatan
            </Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Judul Kegiatan</th>
                        <th>Image</th>
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
                            <td>{tentangKegiatan.tanggal}</td>
                            <td>
                                <Link
                                    to={`/tentangKegiatan/edit/${tentangKegiatan.uuid}`}
                                    className="button is-small is-info mr-2"
                                >
                                    Edit
                                </Link>
                                <button
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
