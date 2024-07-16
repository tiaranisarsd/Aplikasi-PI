import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormEditDashboard = () => {
    const hslValue = 'hsl(200, 90%, 25%)';
    const [lomba, setLomba] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [lombaId, setLombaId] = useState("");
    const [imageUrl, setImageUrl] = useState(""); // Simpan imageUrl sebagai string
    const [aturanLomba, setAturanLomba] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getDashboardById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/dashboard/${id}`);
                console.log("Dashboard Response:", response.data);
                if (response.data) {
                    setLombaId(response.data.lomba.id);
                    setImageUrl(response.data.imageUrl || ""); // Set imageUrl dari response sebagai string
                    setAturanLomba(response.data.aturanLomba);
                    setSelectedCategories(response.data.categoryId || []);

                    if (response.data.lomba.id) {
                        const categoryResponse = await axios.get(`http://localhost:5000/category/lomba/${response.data.lomba.id}`);
                        console.log("Category Response:", categoryResponse.data);
                        setCategory(categoryResponse.data);
                    }
                } else {
                    setMsg("Data not found.");
                }
            } catch (error) {
                console.error("Error fetching dashboard:", error.response.data.msg);
                if (error.response) {
                    setMsg(error.response.data.msg);
                } else {
                    setMsg("An error occurred while fetching the dashboard data.");
                }
            }
        };

        const getLomba = async () => {
            try {
                const response = await axios.get("http://localhost:5000/lomba");
                console.log("Lomba Response:", response.data);
                setLomba(response.data);
            } catch (error) {
                console.error("Error fetching lomba:", error);
            }
        };

        getDashboardById();
        getLomba();
    }, [id]);

    useEffect(() => {
        if (lombaId) {
            getCategoryByLomba(lombaId);
        } else {
            getCategory();
        }
    }, [lombaId]);

    const getCategory = async () => {
        try {
            const response = await axios.get("http://localhost:5000/category");
            console.log("Category Response:", response.data);
            setCategory(response.data);
        } catch (error) {
            console.error("Error fetching Category:", error);
        }
    };

    const getCategoryByLomba = async (lombaId) => {
        try {
            const response = await axios.get(`http://localhost:5000/category/lomba/${lombaId}`);
            console.log("Category by Lomba Response:", response.data);
            setCategory(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const updateDashboard = async (e) => {
        e.preventDefault();
        if (!lombaId) {
            setMsg("Lomba belum dipilih.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("lombaId", lombaId);

            if (typeof imageUrl === 'object') { // Cek apakah imageUrl adalah object (baru)
                formData.append("imageUrl", imageUrl);
            }

            formData.append("categoryId", JSON.stringify(selectedCategories));
            formData.append("aturanLomba", aturanLomba);

            const response = await axios.patch(`http://localhost:5000/dashboard/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                navigate("/dashboardAdmin");
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error updating dashboard:", error);
            if (error.response) {
                setMsg(error.response.data.msg);
            } else {
                setMsg("An error occurred while updating the dashboard data.");
            }
        }
    };

    const handleLombaChange = (e) => {
        const selectedLombaId = e.target.value;
        setLombaId(selectedLombaId);
        getCategoryByLomba(selectedLombaId);
    };

    const handleCategoryChange = (e) => {
        const categoryId = parseInt(e.target.value);
        const isChecked = e.target.checked;

        setSelectedCategories(prevSelected => {
            const prevArray = Array.isArray(prevSelected) ? prevSelected : [];

            if (isChecked) {
                return [...prevArray, categoryId];
            } else {
                return prevArray.filter(id => id !== categoryId);
            }
        });
    };

    const handleAturanLombaChange = (value) => {
        setAturanLomba(value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageUrl(file); // Set image baru yang dipilih ke state imageUrl
    };

    return (
        <div>
            <h1 style={{ marginLeft: '1%', color: hslValue }} className='title'>Dashboard</h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className='subtitle'>Edit Dashboard</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateDashboard} encType="multipart/form-data">
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
                                <label style={{ color: hslValue }} className="label">Gambar</label>
                                <div className="control">
                                    <input
                                        type="file"
                                        className="input"
                                        onChange={handleImageChange}
                                    />
                                        {imageUrl && typeof imageUrl === 'object' && (
                                        <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                                            <img src={URL.createObjectURL(imageUrl)} alt="Selected" style={{ maxWidth: '200px' }} />
                                        </div>
                                    )}
                                    {imageUrl && typeof imageUrl === 'string' && (
                                        <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                                            <img src={`http://localhost:5000/uploads/${imageUrl}`} alt={imageUrl} style={{ maxWidth: '200px' }} />
                                            <p>{imageUrl}</p>
                                        </div>
                                    )}
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
                                                checked={selectedCategories.includes(cat.id)}
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

export default FormEditDashboard;
