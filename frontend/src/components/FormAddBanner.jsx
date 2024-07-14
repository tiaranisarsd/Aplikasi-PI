/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddBanner = () => {
    const [bannerName, setName] = useState("");
    const [imageBanner, setImageBanner] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const hslValue = 'hsl(200, 90%, 25%)';


    const saveBanner = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:5000/Banner", {
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
                <form onSubmit={saveBanner}>
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

export default FormAddBanner;