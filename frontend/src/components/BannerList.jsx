import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const BannerList = () => {
    const [Banner, setBanner] = useState([]);
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        getBanner();
    }, []);

    const getBanner = async () => {
        try {
            const response = await axios.get("http://localhost:5000/Banner");
            setBanner(response.data);
        } catch (error) {
            console.error("Error fetching Banner:", error);
        }
    };

    const deleteBanner = async (BannerId) => {
        try {
            await axios.delete(`http://localhost:5000/Banner/${BannerId}`);
            getBanner();
        } catch (error) {
            console.error("Error deleting Banner:",error.response ? error.response.data.msg : error.message);
        }
    };

    return (
        <div>
            <h1 style={{ marginTop: '10%', marginLeft: '1%', color: hslValue }} className='title'>Banner</h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className='subtitle'>Daftar Banner</h2>
            <Link style={{ color: "white" }} to="/Banner/add" className="button is-primary mb-2">
                Tambah Banner
            </Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th> No</th>
                        <th> Nama Banner</th>
                        <th> Gambar Banner</th>
                        <th> Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Banner.map((banner, index) => (
                        <tr key={banner.uuid}>
                            <td>{index + 1}</td>
                            <td>{banner.bannerName}</td>
                            <td>
                            <a href={`http://localhost:5000/uploads/banner/${banner.imageBanner}`} target="_blank" rel="noopener noreferrer">
                                {banner.imageBanner}
                                </a>
                            </td>
                            <td>
                                <Link
                                    style={{ color: "white", marginRight: "3%" }}
                                    to={`/Banner/edit/${banner.uuid}`}
                                    className="button is-small is-info"
                                >
                                    Edit
                                </Link>
                                <button
                                    style={{ color: "white" }}
                                    onClick={() => deleteBanner(banner.uuid)}
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

export default BannerList;
