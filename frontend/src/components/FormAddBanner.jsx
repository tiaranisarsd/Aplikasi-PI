import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddBanner = () => {
    const [bannerName, setBannerName] = useState("");
    const [imageBanner, setImageBanner] = useState(null); // State untuk menyimpan file gambar
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const hslValue = 'hsl(200, 90%, 25%)';

    const saveBanner = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("bannerName", bannerName);
            formData.append("imageBanner", imageBanner); // Memasukkan file gambar ke FormData

            await axios.post("http://localhost:5000/Banner", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Header penting untuk FormData
                },
            });

            navigate("/Banner");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            } else {
                setMsg("An error occurred while saving the banner.");
            }
        }
    };

    const handleImageChange = (e) => {
        setImageBanner(e.target.files[0]); // Mengambil file gambar dari input
    };

    return (
        <div>
            <h1 style={{ marginLeft: '1%', color: hslValue }} className='title'>Banner</h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className='subtitle'>Tambah Banner Baru</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveBanner}>
                            <p className="has-text-centered"> {msg} </p>
                            <div className="field">
                                <label style={{ color: hslValue }} className="label">Nama Banner</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={bannerName}
                                        onChange={(e) => setBannerName(e.target.value)}
                                        placeholder='Name'
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
                                        accept="image/*" // Hanya menerima file gambar
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

export default FormAddBanner;
