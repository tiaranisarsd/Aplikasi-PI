import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditLomba = () => {
  const [lomba, setLomba] = useState([]);
  const [lombaName, setName] = useState("");
  const [lombaId, setLombaId] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const hslValue = 'hsl(200, 90%, 25%)';

  useEffect(() => {
    const getLombaById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/lomba/${id}`
        );
        setName(response.data.lombaName);
        setLombaId(response.data.lombaId);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getLomba();
    getLombaById();
  }, [id]);
  
    const updateLomba = async (e) => {
      e.preventDefault();
      try {
        await axios.patch(`http://localhost:5000/Lomba/${id}`, {
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
          const response = await axios.get("http://localhost:5000/Lomba");
          setLomba(response.data);
      } catch (error) {
          console.error("Error fetching Lomba:", error);
      }
  };

  return (
    <div>
        <h1 style={{ marginTop: '10%', marginLeft: '1%', color: hslValue }} className='title'>Lomba</h1>
        <h2 style={{ marginTop: '10%', marginLeft: '1%', color: hslValue }} className='subtitle'>Edit Lomba</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={updateLomba}>
                    <p className="has-text-centered"> {msg} </p>
                <div className="field">
                    <label className="label">Nama Lomba</label>
                    <div className="control">
                        <input 
                        type="text" 
                        className="input"
                        value={lombaName}
                        key={lombaId}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name' 
                        />
                    </div>
                </div>
                
                <div className="field">
                    <div className="control">
                    <button style={{ color: "white" }} type="submit" className="button is-success">
                        Update
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

export default FormEditLomba;