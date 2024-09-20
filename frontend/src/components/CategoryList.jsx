import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const hslValue = 'hsl(200, 90%, 25%)';
    const [lomba, setLomba] = useState([]);
    const [lombaId, setLombaId] = useState("");

    useEffect(() => {
        getLomba();
    }, []);

    useEffect(() => {
        if (lombaId) {
            getCategoriesByLomba(lombaId);
        } else {
            getCategory();
        }
    }, [lombaId]);

    const getLomba = async () => {
        try {
            const response = await axios.get("http://194.59.165.159:5000/Lomba");
            setLomba(response.data);
        } catch (error) {
            console.error("Error fetching lomba:", error);
        }
    };

    const getCategory = async () => {
        try {
            const response = await axios.get("http://194.59.165.159:5000/Category");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching Category:", error);
        }
    };

    const getCategoriesByLomba = async (lombaId) => {
        try {
            const response = await axios.get(`http://194.59.165.159:5000/category/lomba/${lombaId}`);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories by lomba:", error);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            await axios.delete(`http://194.59.165.159:5000/Category/${categoryId}`);
            getCategoriesByLomba(lombaId);
        } catch (error) {
            console.error("Error deleting Category:", error.response ? error.response.data.msg : error.message);
        }
    };

    return (
        <div>
            <h1 style={{ marginLeft: '1%', color: hslValue }} className='title'>Kategori</h1>
            <h2 style={{marginLeft: '1%', color: hslValue }} className='subtitle'>Daftar Kategori</h2>
            <Link style={{ color: "white" }} to="/Category/add" className="button is-primary mb-2">
                Tambah Kategori
            </Link>

            <div className="field">
                <label style={{ color: hslValue }} className="label">Lomba</label>
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
            
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category.id}>
                            <td>{index + 1}</td>
                            <td>{category.categoryName}</td>
                            <td>
                                <Link
                                    style={{ color: "white", marginRight: "3%" }}
                                    to={`/Category/edit/${category.uuid}`}
                                    className="button is-small is-info"
                                >
                                    Edit
                                </Link>
                                <button
                                    style={{ color: "white" }}
                                    onClick={() => deleteCategory(category.uuid)}
                                    className="button is-small is-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
