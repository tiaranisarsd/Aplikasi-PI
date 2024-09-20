/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormEditTentangKegiatan = () => {
    const [judulKegiatan, setJudulKegiatan] = useState("");
    const [image, setImage] = useState(null);
    const [tanggal, setTanggal] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        const getTentangKegiatanById = async () => {
            try {
                const response = await axios.get(`http://194.59.165.159:5000/tentangKegiatan/${id}`);
                setJudulKegiatan(response.data.judulKegiatan);
                setImage(response.data.image);
                setTanggal(response.data.tanggal.split("T")[0]); // Mengambil hanya bagian tanggal
                setKeterangan(response.data.keterangan);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getTentangKegiatanById();
    }, [id]);

    const updateTentangKegiatan = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("judulKegiatan", judulKegiatan);
        if (image instanceof File) {
            formData.append("image", image);
        }
        formData.append("tanggal", tanggal);
        formData.append("keterangan", keterangan);

        try {
            await axios.patch(`http://194.59.165.159:5000/tentangKegiatan/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/tentangKegiatan");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleKeteranganChange = (value) => {
        setKeterangan(value);
    };

    return (
        <div>
            <h1 style={{ marginLeft: '1%', color: hslValue }} className="title"> Tentang Kegiatan Admin</h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className="subtitle"> Edit Informasi Kegiatan</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateTentangKegiatan}>
                            {msg && <p className="has-text-centered" style={{ color: 'red' }}>{msg}</p>}
                            <div className="field">
                                <label style={{ color: hslValue }} className="label">Nama Kegiatan</label>
                                <div className="control">
                                    <textarea
                                        type="text"
                                        className="textarea"
                                        value={judulKegiatan}
                                        onChange={(e) => setJudulKegiatan(e.target.value)}
                                        placeholder='Nama Kegiatan'
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
                                    />
                                       {image && typeof image === 'object' && (
                                        <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                                            <img src={URL.createObjectURL(image)} alt="Selected" style={{ maxWidth: '200px' }} />
                                        </div>
                                    )}
                                    {image && typeof image === 'string' && (
                                        <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                                            <img src={`http://194.59.165.159:5000/uploads/tentangKegiatan/${image}`} alt={image} style={{ maxWidth: '200px' }} />
                                            <p>{image}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="field">
                                <label style={{ color: hslValue }} className="label">Tanggal</label>
                                <div className="control">
                                    <input
                                        type="date"
                                        className="input"
                                        value={tanggal}
                                        onChange={(e) => setTanggal(e.target.value)}
                                        placeholder='Tanggal'
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label style={{ color: hslValue }} className="label">Keterangan</label>
                                <div className="control">
                                    <ReactQuill
                                        value={keterangan}
                                        onChange={handleKeteranganChange}
                                        placeholder="Keterangan"
                                        modules={{
                                            toolbar: [
                                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                                [{ size: [] }],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                                { 'indent': '-1' }, { 'indent': '+1' }],
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

export default FormEditTentangKegiatan;
