import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const PendaftaranList = () => {
    const [Pendaftaran, setPendaftaran] = useState([]);
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        getPendaftaran();
    }, []);

    const getPendaftaran = async () => {
        try {
            const response = await axios.get("http://194.59.165.159:5000/Pendaftaran");
            setPendaftaran(response.data);
        } catch (error) {
            console.error("Error fetching Pendaftaran:", error);
        }
    };

    const deletePendaftaran = async (PendaftaranId) => {
        try {
            await axios.delete(`http://194.59.165.159:5000/Pendaftaran/${PendaftaranId}`);
            getPendaftaran();
        } catch (error) {
            console.error("Error deleting Pendaftaran:", error);
        }
    };

    return (
        <div>
            <h1 style={{ marginLeft: '1%', color: hslValue }} className='title'>Pendaftaran</h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className='subtitle'>Daftar Pendaftaran</h2>
            <Link style={{ color: "white" }} to="/Pendaftaran/add" className="button is-primary mb-2">
                Tambah Pendaftaran
            </Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Rw</th>
                        <th>Lomba</th>
                        <th>Kategori</th>
                        <th>Dibuat Oleh</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Pendaftaran.map((pendaftaran, index) => (
                        
                        <tr key={pendaftaran.uuid}>
                            <td>{index + 1}</td>
                            <td>{pendaftaran.name}</td>
                            <td>{pendaftaran.rw}</td>
                            <td>{pendaftaran.lomba.lombaName}</td>
                            <td>{pendaftaran.category.categoryName}</td>
                            <td>{pendaftaran.user.name}</td>
                            <td>
                                <Link
                                    style={{ color: "white", marginRight: "3%" }}
                                    to={`/Pendaftaran/edit/${pendaftaran.uuid}`}
                                    className="button is-small is-info"
                                >
                                    Edit
                                </Link>
                                <button
                                    style={{ color: "white" }}
                                    onClick={() => deletePendaftaran(pendaftaran.uuid)}
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

export default PendaftaranList;
