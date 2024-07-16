import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const hslValue = 'hsl(200, 90%, 25%)';
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
        <h1 style={{marginLeft: '1%',color: hslValue}} className='title'>Users</h1>
        <h2 style={{ marginLeft: '1%',color: hslValue}} className='subtitle'>Tambah User Baru</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveUser}>
                <p className="has-text-centered">{msg}</p>
                <div className="field">
                    <label style={{ color: hslValue}} className="label">Nama</label>
                    <div className="control">
                        <input 
                        type="text" 
                        className="input" 
                        value={name} 
                        onChange={(e)=> setName(e.target.value)} 
                        placeholder='Nama' 
                        />
                    </div>
                </div>
                <div className="field">
                    <label style={{ color: hslValue}} className="label">Email</label>
                    <div className="control">
                        <input 
                        type="text" 
                        className="input" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email' 
                        />
                    </div>
                </div>
                <div className="field">
                    <label style={{ color: hslValue}} className="label">Password</label>
                    <div className="control">
                        <input 
                        type="password" 
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='******' 
                        />
                    </div>
                </div>
                <div className="field">
                    <label style={{ color: hslValue}} className="label">Confirm Password</label>
                    <div className="control">
                        <input 
                        type="password" 
                        className="input"
                        value={confPassword} 
                        onChange={(e) => setConfPassword(e.target.value)}
                        placeholder='******' 
                        />
                    </div>
                </div>
                <div className="field">
                    <label style={{ color: hslValue}} className="label">Role</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="" disabled>Pilih Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
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

export default FormAddUser;