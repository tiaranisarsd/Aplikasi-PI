/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormAddTentangKegiatan = () => {
    const hslValue = 'hsl(200, 90%, 25%)';
    const [setTentangKegiatan] = useState("");
    const [judulKegiatan, setJudulKegiatan] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [image, setImage] = useState(null);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getTentangKegiatan();
    }, []);

    const saveTentangKegiatan = async (e) => {
        e.preventDefault();
        if (!judulKegiatan || !image || !tanggal || !keterangan) {
            setMsg("Semua bidang harus diisi.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("judulKegiatan", judulKegiatan);
            formData.append("image", image);
            formData.append("tanggal", tanggal);
            formData.append("keterangan", keterangan);

            await axios.post("http://localhost:5000/tentangKegiatan", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/tentangKegiatan");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const getTentangKegiatan = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tentangKegiatan");
            setTentangKegiatan(response.data);
        } catch (error) {
            console.error("Error fetching tentangKegiatan:", error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleKeteranganChange = (value) => {
        setKeterangan(value);
    };

    return (
        <div>
            <h1 style={{ marginTop: '10%', marginLeft: '1%', color: hslValue }} className="title"> Tentang Kegiatan Admin</h1>
            <h2 style={{marginLeft: '1%', color: hslValue }} className="subtitle"> Tambah Informasi Kegiatan Baru</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveTentangKegiatan} encType="multipart/form-data">
                            {msg && <p className="has-text-centered" style={{ color: 'red' }}>{msg}</p>}
                            <div className="field">
                                <label style={{color: hslValue}} className="label">Nama Kegiatan</label>
                                <div className="control">
                                    <textarea
                                        type="text"
                                        className="textarea"
                                        value={judulKegiatan}
                                        onChange={(e) => setJudulKegiatan(e.target.value)}
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
                                        required
                                    />
                                      {image && typeof image === 'object' && (
                                        <img src={URL.createObjectURL(image)} alt="Selected" style={{ marginBottom: '10px', marginTop: '10px',  maxWidth: '200px' }} />
                                    )}
                                </div>
                            </div>

                            <div className="field">
                                <label style={{color: hslValue}} className="label">Tanggal</label>
                                <div className="control">
                                    <input
                                        type="date"
                                        className="input"
                                        value={tanggal}
                                        onChange={(e) => setTanggal(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label style={{ color: hslValue }} className="label">Keterangan</label>
                                <div className="control">
                                    <ReactQuill
                                        value={keterangan}
                                        onChange={handleKeteranganChange}
                                        placeholder="Aturan Lomba"
                                        modules={{
                                            toolbar: [
                                                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                                                [{size: []}],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{'list': 'ordered'}, {'list': 'bullet'}, 
                                                 {'indent': '-1'}, {'indent': '+1'}],
                                                ['link', 'image', 'video'],
                                                ['clean']
                                              ]
                                        }}
                                    />
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

export default FormAddTentangKegiatan;
