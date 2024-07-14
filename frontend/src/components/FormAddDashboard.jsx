import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormAddDashboard = () => {
    const hslValue = 'hsl(200, 90%, 25%)';
    const [lomba, setLomba] = useState([]);
    const [category, setCategory] = useState([]);
    const [lombaId, setLombaId] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [aturanLomba, setAturanLomba] = useState(""); // State untuk menyimpan isi dari ReactQuill
    const [categoryId, setCategoryId] = useState([]);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getLomba();
    }, []);

    useEffect(() => {
        getCategoriesByLomba(lombaId);
    }, [lombaId]);

    const saveDashboard = async (e) => {
        e.preventDefault();
        if (!lombaId || !imageUrl || !categoryId.length || !aturanLomba) {
            setMsg("Semua bidang harus diisi.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("lombaId", lombaId);
            formData.append("imageUrl", imageUrl);
            formData.append("categoryId", JSON.stringify(categoryId));
            formData.append("aturanLomba", aturanLomba);

            await axios.post("http://localhost:5000/dashboard", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/dashboard");
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

    const getCategoriesByLomba = async (lombaId) => {
        try {
            const url = lombaId ? `http://localhost:5000/category/lomba/${lombaId}` : "http://localhost:5000/Category";
            const response = await axios.get(url);
            setCategory(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleLombaChange = (e) => {
        setLombaId(e.target.value);
    };

    const handleCategoryChange = (e) => {
        const value = parseInt(e.target.value);
        setCategoryId((prev) => {
            if (prev.includes(value)) {
                return prev.filter((id) => id !== value);
            } else {
                return [...prev, value];
            }
        });
    };

    // Fungsi untuk mengatur perubahan pada ReactQuill
    const handleAturanLombaChange = (value) => {
        setAturanLomba(value);
    };

    // Fungsi untuk menghandle perubahan pada input file gambar
    const handleImageChange = (e) => {
        setImageUrl(e.target.files[0]);
    };

    return (
        <div>
            <h1 style={{ marginTop: '10%', marginLeft: '1%', color: hslValue }} className="title">Tambah Dashboard</h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className="subtitle">Add New Dashboard</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveDashboard} encType="multipart/form-data">
                            {msg && <p className="has-text-centered" style={{ color: 'red' }}>{msg}</p>}
                            <div className="field">
                                <label style={{ color: hslValue }} className="label">Lomba</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={lombaId}
                                            onChange={handleLombaChange}
                                            required
                                        >
                                            <option value="">Pilih Lomba</option>
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
                                <label style={{ color: hslValue }} className="label">Image</label>
                                <div className="control">
                                {imageUrl && typeof imageUrl === 'object' && (
                                        <img src={URL.createObjectURL(imageUrl)} alt="Selected" style={{ marginBottom: '10px', maxWidth: '200px' }} />
                                    )}
                                    <input
                                        type="file"
                                        className="input"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label style={{ color: hslValue }} className="label">Category</label>
                                <div className="checkbox-group">
                                    {category.map((cat) => (
                                        <label key={cat.id} className="checkbox-item" style={{ marginRight: '10px', display: 'inline-block' }}>
                                            <input
                                                type="checkbox"
                                                name="category"
                                                value={cat.id}
                                                style={{ margin: '10px' }}
                                                checked={categoryId.includes(cat.id)}
                                                onChange={handleCategoryChange}
                                            />
                                            {cat.categoryName}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="field">
                                <label style={{ color: hslValue }} className="label">Aturan Lomba</label>
                                <div className="control">
                                    <ReactQuill
                                        value={aturanLomba}
                                        onChange={handleAturanLombaChange}
                                        placeholder="Aturan Lomba"
                                        modules={{
                                            toolbar: [
                                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                                [{ size: [] }],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                                { 'indent': '-1' }, { 'indent': '+1' }],
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

export default FormAddDashboard;
