/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditDokumentasi = () => {
    const [kegiatanName, setKegiatanName] = useState("");
    const [imageKegiatan, setImageKegiatan] = useState(null);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        const getDokumentasiById = async () => {
            try {
                const response = await axios.get(`http://194.59.165.159:5000/dokumentasi/${id}`);
                setKegiatanName(response.data.kegiatanName);
                setImageKegiatan(response.data.imageKegiatan);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getDokumentasiById();
    }, [id]);

    const updateDokumentasi = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("kegiatanName", kegiatanName);
        if (imageKegiatan instanceof File) {
            formData.append("imageKegiatan", imageKegiatan);
        }

        try {
            await axios.patch(`http://194.59.165.159:5000/dokumentasi/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/dokumentasi");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            } else {
                setMsg("An error occurred while updating the documentation.");
            }
        }
    };

    const handleImageChange = (e) => {
        setImageKegiatan(e.target.files[0]);
    };

    return (
        <div>
            <h1 style={{ marginLeft: '1%', color: hslValue }} className="title"> Dokumentasi</h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className="subtitle"> Edit Dokumentasi</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateDokumentasi} encType="multipart/form-data">
                            {msg && <p className="has-text-centered" style={{ color: 'red' }}>{msg}</p>}
                            <div className="field">
                                <label style={{ color: hslValue }} className="label">Nama Kegiatan</label>
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
                                    />
                                    {imageKegiatan && typeof imageKegiatan === 'object' && (
                                        <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                                            <img src={URL.createObjectURL(imageKegiatan)} alt="Selected" style={{ maxWidth: '200px' }} />
                                        </div>
                                    )}
                                    {imageKegiatan && typeof imageKegiatan === 'string' && (
                                        <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                                            <img src={`http://194.59.165.159:5000/uploads/dokumentasi/${imageKegiatan}`} alt={imageKegiatan} style={{ maxWidth: '200px' }} />
                                            <p>{imageKegiatan}</p>
                                        </div>
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

export default FormEditDokumentasi;
