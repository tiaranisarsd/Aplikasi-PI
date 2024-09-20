import React, { useState,  useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddLomba = () => {
    const [lomba, setLomba] = useState([]);
    const [lombaName, setName] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        getLomba();
    }, []);

    const saveLomba = async (e) => {
        e.preventDefault();
        if (!lombaName) {
          setMsg("Nama Lomba harus diisi.");
          return;
      }
        try {
          await axios.post("http://194.59.165.159:5000/Lomba", {
            lombaName: lombaName,
            lombaId: lomba.id,
          });
          navigate("/Lomba");
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      };

      const getLomba = async () => {
        try {
            const response = await axios.get("http://194.59.165.159:5000/Lomba");
            setLomba(response.data);
        } catch (error) {
            console.error("Error fetching Lomba:", error);
        }
    };

  return (
    <div>
        <h1 style={{marginLeft: '1%',color: hslValue}} className='title'>Lomba</h1>
        <h2 style={{marginLeft: '1%',color: hslValue}} className='subtitle'>Tambah Lomba Baru</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveLomba}>
                    <p className="has-text-centered"> {msg} </p>
                <div className="field">
                    <label style={{color: hslValue}} className="label">Nama Lomba</label>
                    <div className="control">
                        <textarea
                        type="text" 
                        className="textarea" 
                        value={lombaName}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name' 
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

export default FormAddLomba;