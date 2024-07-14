/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditBanner = () => {
    const [bannerName, setName] = useState("");
    const [imageBanner, setImageBanner] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        const getBannerById = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5000/banner/${id}`
            );
            setName(response.data.bannerName);
            setImageBanner(response.data.imageBanner);
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
          await axios.patch(`http://localhost:5000/Banner/${id}`, {
            bannerName: bannerName,
            imageBanner: imageBanner,
          });
          navigate("/Banner");
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      };



    const handleImageChange = (e) => {
        setImageBanner(e.target.files[0]);
    };

  return (
    <div>
        <h1 style={{marginTop: '10%', marginLeft: '1%',color: hslValue}} className='title'>Banner</h1>
        <h2 style={{marginLeft: '1%',color: hslValue}} className='subtitle'>Add New Banner</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={updateBanner}>
                    <p className="has-text-centered"> {msg} </p>
                <div className="field">
                    <label style={{color: hslValue}} className="label">Nama Banner</label>
                    <div className="control">
                        <textarea
                        type="text" 
                        className="textarea" 
                        value={bannerName}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name' 
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
                    <button style={{ color: "white" }} type="submit" className="button is-success">
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