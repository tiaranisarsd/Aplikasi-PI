/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import ModalImage from "react-modal-image";
import '../style.css';

const DokumentasiList = () => {
    const [dokumentasi, setDokumentasi] = useState([]);
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        getDokumentasi();
    }, []);


    const getDokumentasi = async () => {
        try {
            const response = await axios.get("http://localhost:5000/dokumentasi");
            setDokumentasi(response.data);
        } catch (error) {
            console.error("Error fetching dokumentasi:", error);
        }
    };

    return (
        <div>
            <h1 style={{ marginLeft: '1%', color: hslValue }} className="title">Dokumentasi</h1>

            <div className="content-dokumentasi">
                {dokumentasi.map((item, index) => (
                    <article key={index}>
                        <ModalImage
                            small={`http://localhost:5000/uploads/dokumentasi/${item.imageKegiatan}`}
                            large={`http://localhost:5000/uploads/dokumentasi/${item.imageKegiatan}`}
                            alt={item.kegiatanName}
                            className="featured-image-modal"
                        />
                        <h1 style={{ color: hslValue }}>{item.kegiatanName}</h1>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default DokumentasiList;
