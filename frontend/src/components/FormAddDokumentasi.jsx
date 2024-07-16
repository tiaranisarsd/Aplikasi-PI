/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddDokumentasi = () => {
    const hslValue = 'hsl(200, 90%, 25%)';
    const [setDokumentasi] = useState("");
    const [kegiatanName, setKegiatanName] = useState("");
    const [imageKegiatan, setImageKegiatan] = useState(null); // Menggunakan null sebagai nilai awal
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getDokumentasi();
    }, []);

    const saveDokumentasi = async (e) => {
        e.preventDefault();
        if (!kegiatanName || !imageKegiatan) {
            setMsg("Semua bidang harus diisi.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("kegiatanName", kegiatanName);
            formData.append("imageKegiatan", imageKegiatan);

            await axios.post("http://localhost:5000/dokumentasi", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/dokumentasi");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            } else {
                setMsg("Terjadi kesalahan saat menyimpan dokumentasi.");
            }
        }
    };

    const getDokumentasi = async () => {
        try {
            const response = await axios.get("http://localhost:5000/dokumentasi");
            setDokumentasi(response.data);
        } catch (error) {
            console.error("Error fetching dokumentasi:", error);
        }
    };

    const handleImageChange = (e) => {
        setImageKegiatan(e.target.files[0]);
    };

    return (
        <div>
            <h1 style={{ marginTop: '10%', marginLeft: '1%', color: hslValue }} className="title"> Dokumentasi Admin</h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className="subtitle"> Tambah Dokumentasi Baru</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveDokumentasi} encType="multipart/form-data">
                            {msg && <p className="has-text-centered" style={{ color: 'red' }}>{msg}</p>}
                            <div className="field">
                                <label style={{color: hslValue}} className="label">Nama Kegiatan</label>
                                <div className="control">
                                    <textarea
                                        className="textarea"
                                        value={kegiatanName}
                                        onChange={(e) => setKegiatanName(e.target.value)}
                                        placeholder='Nama Kegiatan'
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label style={{ color: hslValue }} className="label">Gambar</label>
                                <div className="control">
                                    <input
                                        type="file"
                                        className="input"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        required
                                    />
                                     {imageKegiatan && typeof imageKegiatan === 'object' && (
                                        <img src={URL.createObjectURL(imageKegiatan)} alt="Selected" style={{ marginBottom: '10px', marginTop: '10px',  maxWidth: '200px' }} />
                                    )}
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success">
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAddDokumentasi;
