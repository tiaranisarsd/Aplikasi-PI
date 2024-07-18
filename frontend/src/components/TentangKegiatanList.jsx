/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../style.css';

const TentangKegiatan = () => {
    const [TentangKegiatan, setTentangKegiatan] = useState([]);
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        getTentangKegiatan();
    }, []);

    const getTentangKegiatan = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tentangKegiatan");
            setTentangKegiatan(response.data);
        } catch (error) {
            console.error("Error fetching tentangKegiatan:", error);
        }
    };

    // Fungsi untuk memformat tanggal
    const formatTanggal = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <div>
            <h1 style={{marginLeft: '1%', color: hslValue }} className="title"> Tentang Kegiatan</h1>

            <div id="content">

                {TentangKegiatan.map((item, index) => (
                    <article key={index} className="card-tentangKegiatan">
                        <h1 style={{ color: hslValue }} className="title">{item.judulKegiatan}</h1>
                        <img src={`http://localhost:5000/uploads/tentangKegiatan/${item.image}`} alt={item.image} className="image-tentangKegiatan" />
                        <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Tanggal: {formatTanggal(item.tanggal)}</h2>
                        <h2>Keterangan :</h2>
                        <div className="keterangan" dangerouslySetInnerHTML={{ __html: item.keterangan }} />
                    </article>
                ))}
            </div>
        </div>
    );
};

export default TentangKegiatan;
