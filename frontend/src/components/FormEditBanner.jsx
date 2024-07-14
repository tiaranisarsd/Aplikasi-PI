import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditBanner = () => {
    const [bannerName, setBannerName] = useState("");
    const [imageBanner, setImageBanner] = useState(null); // State untuk menyimpan file gambar
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        const getBannerById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/Banner/${id}`);
                setBannerName(response.data.bannerName);
                // Hanya set imageBanner jika ada imageUrl yang sudah ada di server
                if (response.data.imageBanner) {
                    setImageBanner(response.data.imageBanner);
                } else {
                    setImageBanner(null); // Set null jika tidak ada gambar yang tersedia
                }
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getBannerById();
    }, [id]);

    const updateBanner = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("bannerName", bannerName);
            if (imageBanner) {
                formData.append("imageBanner", imageBanner);
            }

            await axios.patch(`http://localhost:5000/Banner/${id}`, {
              bannerName: bannerName,
              imageBanner: imageBanner
          });

            navigate("/Banner");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            } else {
                setMsg("An error occurred while updating the banner.");
            }
        }
    };

    const handleImageChange = (e) => {
        setImageBanner(e.target.files[0]); // Mengambil file gambar dari input
    };

    return (
        <div>
            <h1 style={{ marginTop: '10%', marginLeft: '1%', color: hslValue }} className='title'>Banner</h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className='subtitle'>Edit Banner</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateBanner}>
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
                                <label style={{ color: hslValue }} className="label">Image</label>
                                <div className="control">
                                {imageBanner && (
                                        <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                                            <img src={`http://localhost:5000/uploads/banner/${imageBanner}`} alt={imageBanner} style={{ maxWidth: '200px' }} />
                                            <p>{imageBanner}</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="input"
                                        onChange={handleImageChange}
                                        accept="image/*" // Hanya menerima file gambar
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

export default FormEditBanner;
