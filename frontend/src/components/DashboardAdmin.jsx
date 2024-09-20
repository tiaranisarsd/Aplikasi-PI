import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DashboardList = () => {
    const [dashboard, setDashboard] = useState([]);
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
        getDashboard();
    }, []);

    const getDashboard = async () => {
        try {
            const response = await axios.get('http://194.59.165.159:5000/dashboard');
            setDashboard(response.data);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        }
    };

    const deleteDashboard = async (dashboardId) => {
        try {
            await axios.delete(`http://194.59.165.159:5000/dashboard/${dashboardId}`);
            getDashboard();
        } catch (error) {
            console.error('Error deleting dashboard:', error);
        }
    };

    return (
        <div>
            <h1 style={{marginLeft: '1%', color: hslValue }} className="title">
                Dashboard Admin
            </h1>
            <h2 style={{ marginLeft: '1%', color: hslValue }} className="subtitle">
                Daftar Dashboard
            </h2>
            <Link style={{ color: "white" }} to="/dashboard/add" className="button is-primary mb-2">
                Tambah Dashboard
            </Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Lomba</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dashboard.map((dashboard, index) => (
                        <tr key={dashboard.id}>
                            <td>{index + 1}</td>
                            <td>{dashboard.lomba.lombaName}</td>
                            <td>
                            <a href={`http://194.59.165.159:5000/uploads/${dashboard.imageUrl}`} target="_blank" rel="noopener noreferrer">
                                {dashboard.imageUrl}
                            </a>
                            </td>
                            <td>
                                <Link
                                    style={{ color: "white", marginRight: "3%" }}
                                    to={`/dashboard/edit/${dashboard.uuid}`}
                                    className="button is-small is-info mr-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    style={{ color: "white", marginRight: "3%" }}
                                    onClick={() => deleteDashboard(dashboard.uuid)}
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

export default DashboardList;
