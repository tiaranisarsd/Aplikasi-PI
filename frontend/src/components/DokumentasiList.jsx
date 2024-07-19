/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import ModalImage from "react-modal-image";
import '../style.css';

const DokumentasiList = () => {
    const [dokumentasi, setDokumentasi] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        getDokumentasi();
    }, []);

    const getDokumentasi = async () => {
        try {
            const response = await axios.get("https://app-katar.vercel.app/dokumentasi");
            setDokumentasi(response.data);
        } catch (error) {
            console.error("Error fetching dokumentasi:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); 
    };

    const filteredDokumentasi = dokumentasi.filter((item) =>
        item.kegiatanName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1 style={{ marginLeft: '1%', color: hslValue }} className="title">Dokumentasi</h1>
            
            <div className="field" style={{ marginLeft: '2%', marginBottom: '1%', width: '30%' }}>
                <div className="control">
                    <input
                        type="text"
                        className="input"
                        placeholder="Cari berdasarkan nama kegiatan"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="content-dokumentasi">
                {filteredDokumentasi.length > 0 ? (
                    filteredDokumentasi.map((item, index) => (
                        <article key={index}>
                            <ModalImage
                                small={`https://app-katar.vercel.app/uploads/dokumentasi/${item.imageKegiatan}`}
                                large={`https://app-katar.vercel.app/uploads/dokumentasi/${item.imageKegiatan}`}
                                alt={item.kegiatanName}
                                className="featured-image-modal"
                            />
                            <h1 style={{ color: hslValue }}>{item.kegiatanName}</h1>
                        </article>
                    ))
                ) : (
                    <p style={{ color: hslValue, marginLeft: '1%' }}>Kegiatan tidak ditemukan</p>
                )}
            </div>
        </div>
    );
};

export default DokumentasiList;
