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


    return (
        <div>
            <h1 style={{marginTop: '10%', marginLeft: '1%', color: hslValue }} className="title"> Tentang Kegiatan</h1>

            <div id="content">

                {TentangKegiatan.map((item, index) => (
                    <article key={index} className="card">
                        <h1 style={{ color: hslValue }} className="title">{item.judulKegiatan}</h1>
                        <img src={`http://localhost:5000/uploads/tentangKegiatan${item.image}`} alt={item.image} className="featured-image" />
                        <h2>Tanggal: {item.tanggal}</h2>
                        <h2>keterangan :</h2>
                        <nav className="list-aturan">
                            <ol>
                                <li dangerouslySetInnerHTML={{ __html: item.aturanLomba }} />
                            </ol>
                        </nav>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default TentangKegiatan;
