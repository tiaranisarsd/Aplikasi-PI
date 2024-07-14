/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormEditTentangKegiatan = () => {
    const [judulKegiatan, setJudulKegiatan] = useState("");
    const [image, setImage] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        const getTentangKegiatanById = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5000/tentangKegiatan/${id}`
            );
            setJudulKegiatan(response.data.judulKegiatan);
            setImage(response.data.image);
            setTanggal(response.data.tanggal);
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
        try {
          await axios.patch(`http://localhost:5000/TentangKegiatan/${id}`, {
            judulKegiatan: judulKegiatan,
            image: image,
            tanggal: tanggal,
            keterangan: keterangan
          });
          navigate("/TentangKegiatan");
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
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
            <h1 style={{ marginTop: '10%', marginLeft: '1%', color: hslValue }} className="title"> Tentang Kegiatan</h1>
            <h2 style={{marginLeft: '1%', color: hslValue }} className="subtitle"> Tambah Informasi Kegiatan Baru</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateTentangKegiatan} encType="multipart/form-data">
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
                                <label style={{color: hslValue}} className="label">Tanggal</label>
                                <div className="control">
                                <textarea
                                        type="date"
                                        className="date"
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


export default FormEditTentangKegiatan;