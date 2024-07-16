import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddCategory = () => {
    const [categoryName, setName] = useState("");
    const hslValue = 'hsl(200, 90%, 25%)';
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [lomba, setLomba] = useState([]);
    const [lombaId, setLombaId] = useState("");

    useEffect(() => {
      getLomba();
  }, []);

    const saveCategory = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:5000/Category", {
            categoryName: categoryName,
            lombaId
          });
          navigate("/Category");
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
            console.error("Error fetching lomba:", error);
        }
    };

  return (
    <div>
        <h1 style={{marginTop: '10%', marginLeft: '1%', color: hslValue}} className='title'>Kategori</h1>
        <h2 style={{marginLeft: '1%', color: hslValue}} className='subtitle'>Tambah Category Baru</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveCategory}>
                    <p className="has-text-centered"> {msg} </p>
                <div className="field">
                    <label style={{color: hslValue}} className="label">Nama Kategori</label>
                    <div className="control">
                        <textarea
                        type="text" 
                        className="textarea" 
                        value={categoryName}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Category Name' 
                        />
                    </div>
                </div>

                <div className="field">
                                <label style={{color: hslValue}} className="label">Lomba</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={lombaId}
                                            placeholder="Pilih Lomba"
                                            onChange={(e) => setLombaId(e.target.value)}
                                        >
                                            <option value="" disabled>Pilih Lomba</option>
                                            {lomba.map((lomba) => (
                                                <option key={lomba.id} value={lomba.id}>
                                                    {lomba.lombaName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
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

export default FormAddCategory;