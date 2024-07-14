/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import { plusSlides } from '../index';
import '../style.css';

const DashboardList = () => {
    const { user } = useSelector((state) => state.auth);
    const [dashboard, setDashboard] = useState([]);
    const [categories, setCategories] = useState([]);
    const [banner, setBanners] = useState([]);
    const [lombaId, setLombaId] = useState("");
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        getDashboard();
        getBanner();
        getLomba();
        getCategory();
    }, []);

    // useEffect(() => {
        // if (lombaId) {
        //     getCategoriesByLomba(lombaId);
        // } else {
        //     getCategory();
        // }
    // }, [lombaId]);

    const getDashboard = async () => {
        try {
            const response = await axios.get("http://localhost:5000/dashboard");
            setDashboard(response.data);
        } catch (error) {
            console.error("Error fetching dashboard:", error);
        }
    };

    const getBanner = async () => {
        try {
            const response = await axios.get("http://localhost:5000/banner");
            setBanners(response.data);
        } catch (error) {
            console.error("Error fetching banners:", error);
        }
    };

    const getLomba = async () => {
        try {
            const response = await axios.get("http://localhost:5000/Lomba");
            setLombaId(response.data[0].id);
        } catch (error) {
            console.error("Error fetching lomba:", error);
        }
    };

    const getCategory = async () => {
        try {
            const response = await axios.get("http://localhost:5000/Category");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching Category:", error);
        }
    };

    const getCategoriesByLomba = async (lombaId) => {
        try {
            const response = await axios.get(`http://localhost:5000/category/lomba/${lombaId}`);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories by lomba:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            plusSlides(1);
        }, 3000);

        return () => clearInterval(interval); // Membersihkan interval saat komponen dilepas
    }, []);

    return (
        <div>
            <h1 style={{marginTop: '10%', marginLeft: '1%', color: hslValue }} className="title">Dashboard</h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className="subtitle">
            Selamat Datang kembali <strong style={{ color: hslValue }}>{user && user.name}</strong>
            </h2>

            <div id="content">
            <div className="slideshow-container">
                    {banner.map((banner, index) => (
                        <div key={index} className="mySlides fade">
                            <img src={`http://localhost:5000/uploads/banner/${banner.imageBanner}`} alt={banner.bannerName} />
                        </div>
                    ))}

                    <a className="prev" onClick={() => plusSlides(-1)}>❮</a>
                    <a className="next" onClick={() => plusSlides(1)}>❯</a>
                </div>

                {dashboard.map((item, index) => (
                    <article key={index} className="card">
                        <h1 style={{ color: hslValue }} className="title">{item.lomba ? item.lomba.lombaName : "Nama Lomba"}</h1>
                        <img src={`http://localhost:5000/uploads/${item.imageUrl}`} alt={item.lomba ? item.lomba.lombaName : "Image"} className="featured-image" />
                        <h2>Kategori :</h2>
                        <nav className="list-kategori">
                            <ul>
                                {categories
                                    .filter((category) => category.lombaId === item.lomba.id && item.categoryId.includes(category.id.toString()))
                                    .map((filteredCategory) => (
                                        <li key={filteredCategory.id}>
                                            {filteredCategory.categoryName}
                                        </li>
                                    ))}
                            </ul>
                        </nav>
                        <h2>Aturan :</h2>
                        <nav className="list-aturan">
                            <ol>
                                <li dangerouslySetInnerHTML={{ __html: item.aturanLomba }} />
                            </ol>
                        </nav>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default DashboardList;
