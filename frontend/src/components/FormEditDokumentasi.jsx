/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditDokumentasi = () => {
    const [kegiatanName, setKegiatanName] = useState("");
    const [imageKegiatan, setImageKegiatan] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        const getDokumentasiById = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5000/dokumentasi/${id}`
            );
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
        try {
          await axios.patch(`http://localhost:5000/Dokumentasi/${id}`, {
            kegiatanName: kegiatanName,
            imageKegiatan: imageKegiatan,
          });
          navigate("/Dokumentasi");
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      };



    const handleImageChange = (e) => {
        setImageKegiatan(e.target.files[0]);
    };

    return (
        <div>
            <h1 style={{ marginTop: '10%', marginLeft: '1%', color: hslValue }} className="title"> Dokumentasi</h1>
            <h2 style={{marginLeft: '1%', color: hslValue }} className="subtitle"> Tambah Dokumentasi Baru</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateDokumentasi} encType="multipart/form-data">
                            {msg && <p className="has-text-centered" style={{ color: 'red' }}>{msg}</p>}
                            <div className="field">
                                <label style={{color: hslValue}} className="label">Nama Kegiatan</label>
                                <div className="control">
                                <textarea
                                        type="text"
                                        className="textarea"
                                        value={kegiatanName}
                                        onChange={(e) => setKegiatanName(e.target.value)}
                                        placeholder='Nama Kegiatan'
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label style={{ color: hslValue }} className="label">Image</label>
                                <div className="control">
                                    <input
                                        type="file"
                                        className="input"
                                        onChange={handleImageChange}
                                        required
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


export default FormEditDokumentasi;