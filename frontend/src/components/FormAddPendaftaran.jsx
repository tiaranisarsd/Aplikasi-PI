import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddPendaftaran = () => {
    const hslValue = 'hsl(200, 90%, 25%)';
    const [lomba, setLomba] = useState([]);
    const [category, setCategory] = useState([]);
    const [name, setNamePemain] = useState("");
    const [lombaId, setLombaId] = useState("");
    const [rw, setRw] = useState("");  
    const [categoryId, setCategoryId] = useState(null); 
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getLomba();
    }, []);

    const savePendaftaran = async (e) => {
        e.preventDefault();
        if (!name) {
            setMsg("Nama harus diisi.");
            return;
        }
        if (!rw) {
            setMsg("Rw harus dipilih.");
            return;
        }
        if (!lombaId) {
            setMsg("Lomba harus dipilih.");
            return;
        }
        if (categoryId === null) {
            setMsg("Category harus dipilih.");
            return;
        }

        try {
            await axios.post("http://194.59.165.159:5000/Pendaftaran", {
                name: name,
                rw: rw,
                lombaId: lombaId,
                categoryId: categoryId 
            });
            navigate("/Pendaftaran");
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
            console.error("Error fetching lomba:", error);
        }
    };

    const getCategoryByLomba = async (lombaId) => {
        try {
            const response = await axios.get(`http://194.59.165.159:5000/category/lomba/${lombaId}`);
            setCategory(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleLombaChange = (e) => {
        const selectedLombaId = e.target.value;
        setLombaId(selectedLombaId);
        getCategoryByLomba(selectedLombaId);
    };

    const handleCategoryChange = (e) => {
        setCategoryId(parseInt(e.target.value));
    };

    return (
        <div>
            <h1 style={{marginLeft: '1%',color: hslValue}} className='title'>Pendaftaran</h1>
            <h2 style={{marginLeft: '1%',color: hslValue}} className='subtitle'>Tambah Pendaftaran Baru</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={savePendaftaran}>
                            {msg && <p className="has-text-centered" style={{ color: 'red' }}>{msg}</p>}
                            <div className="field">
                                <label style={{color: hslValue}} className="label">Nama Pemain</label>
                                <div className="control">
                                    <textarea
                                        type="text"
                                        className="textarea"
                                        value={name}
                                        onChange={(e) => setNamePemain(e.target.value)}
                                        placeholder='Nama'
                                    />
                                </div>
                            </div>

                            <div className="field">
                            <label style={{ color: hslValue}} className="label">Rw</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select
                                        value={rw}
                                        onChange={(e) => setRw(e.target.value)}
                                    >
                                        <option value="" disabled>Pilih Rw</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                            <div className="field">
                                <label style={{color: hslValue}} className="label">Lomba</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={lombaId}
                                            placeholder="Pilih Lomba"
                                            onChange={handleLombaChange}
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
                                    <label style={{ color: hslValue }} className="label">Category</label>
                                    <div className="radio-group">
                                        {category.map((cat) => (
                                            <label key={cat.id} className="radio-item" style={{ marginRight: '10px', display: 'inline-block' }}>
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={cat.id}
                                                    style={{margin: '10px'}}
                                                    checked={categoryId === cat.id}
                                                    onChange={handleCategoryChange}
                                                />
                                                {cat.categoryName}
                                            </label>
                                        ))}
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

export default FormAddPendaftaran;
