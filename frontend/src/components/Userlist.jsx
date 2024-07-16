import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Userlist = () => {
    const [users, setUsers] = useState([]);
    const hslValue = 'hsl(200, 90%, 25%)';

    useEffect(() => {
      getUsers();
    }, []);
  
    const getUsers = async () => {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    };
  
    const deleteUser = async (userId) => {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      getUsers();
    };

  return (
    <div>
        <h1 style={{ marginLeft: '1%', color: hslValue }} className='title'>Users</h1>
        <h2 style={{ marginLeft: '1%', color: hslValue }} className='subtitle'>Daftar Users</h2>
        <Link style={{ color: 'white' }} to="/users/add" className="button is-primary mb-2">
            Tambah Users
        </Link>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link
                style={{ color: 'white', marginRight:"3%"}}
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                style={{ color: 'white'}}
                  onClick={() => deleteUser(user.uuid)}
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

export default Userlist;