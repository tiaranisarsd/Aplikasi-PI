import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const LombaList = () => {
    const [Lomba, setLomba] = useState([]);
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        getLomba();
    }, []);

    const getLomba = async () => {
        try {
            const response = await axios.get("http://localhost:5000/Lomba");
            setLomba(response.data);
        } catch (error) {
            console.error("Error fetching Lomba:", error);
        }
    };

    const deleteLomba = async (LombaId) => {
        try {
            await axios.delete(`http://localhost:5000/Lomba/${LombaId}`);
            getLomba();
        } catch (error) {
            console.error("Error deleting Lomba:",error.response ? error.response.data.msg : error.message);
        }
    };

    return (
        <div>
            <h1 style={{ marginTop: '10%', marginLeft: '1%', color: hslValue }} className='title'>Lomba</h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className='subtitle'>Daftar Lomba</h2>
            <Link style={{ color: "white" }} to="/Lomba/add" className="button is-primary mb-2">
                Tambah Lomba
            </Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Lomba</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Lomba.map((lomba, index) => (
                        <tr key={lomba.uuid}>
                            <td>{index + 1}</td>
                            <td>{lomba.lombaName}</td>
                            <td>
                                <Link
                                    style={{ color: "white", marginRight: "3%" }}
                                    to={`/Lomba/edit/${lomba.uuid}`}
                                    className="button is-small is-info"
                                >
                                    Edit
                                </Link>
                                <button
                                    style={{ color: "white" }}
                                    onClick={() => deleteLomba(lomba.uuid)}
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

export default LombaList;
