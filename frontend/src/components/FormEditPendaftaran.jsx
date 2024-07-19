import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditPendaftaran = () => {
    const hslValue = 'hsl(200, 90%, 25%)';
    const [name, setName] = useState("");
    const [lomba, setLomba] = useState([]);
    const [lombaId, setLombaId] = useState("");
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      const getPendaftaranById = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/pendaftaran/${id}`
          );
          setName(response.data.name);
          setLombaId(response.data.lomba.id);
          setCategoryId(response.data.category.id ? parseInt(response.data.category.id) : null);
          
          if (response.data.lomba.id) {
            const categoryResponse = await axios.get(`http://localhost:5000/category/lomba/${response.data.lomba.id}`);
            setCategory(categoryResponse.data);
          }
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

      getPendaftaranById();
      getLomba();
    }, [id]);

    useEffect(() => {
      if (lombaId) {
        getCategoryByLomba(lombaId);
      }
    }, [lombaId]);

    const getCategoryByLomba = async (lombaId) => {
      try {
          const response = await axios.get(`http://localhost:5000/category/lomba/${lombaId}`);
          setCategory(response.data);
      } catch (error) {
          console.error("Error fetching categories:", error);
      }
    };
  
    const updatePendaftaran = async (e) => {
      e.preventDefault();
      if (!lombaId) {
        setMsg("Lomba belum dipilih.");
        return;
      }
      if (!categoryId) {
        setMsg("Category belum dipilih.");
        return;
      }
      try {
        await axios.patch(`http://localhost:5000/pendaftaran/${id}`, {
          name: name,
          lombaId: lombaId,
          categoryId: categoryId.toString() 
        });
        navigate("/pendaftaran");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    const handleLombaChange = (e) => {
      const selectedLombaId = e.target.value;
      setLombaId(selectedLombaId);
      setCategoryId(null); 
      getCategoryByLomba(selectedLombaId);
    };

    const handleCategoryChange = (e) => {
      setCategoryId(parseInt(e.target.value));
    };

    return (
      <div>
        <h1 style={{ marginLeft: '1%', color: hslValue }} className='title'>Pendaftaran</h1>
        <h2 style={{ marginLeft: '1%', color: hslValue }} className='subtitle'>Edit Pendaftaran</h2>
        <div className="card is-shadowless">
          <div className="card-content">
            <div className="content">
              <form onSubmit={updatePendaftaran}>
                {msg && <p className="has-text-centered" style={{ color: 'red' }}>{msg}</p>}
                <div className="field">
                  <label style={{ color: hslValue }} className="label">Nama Pemain</label>
                  <div className="control">
                    <textarea
                      type="text"
                      className="textarea"
                      value={name}
                      key={id}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Name'
                    />
                  </div>
                </div>

                <div className="field">
                  <label style={{ color: hslValue }} className="label">Lomba</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        value={lombaId}
                        key={lombaId}
                        placeholder="Pilih Lomba"
                        onChange={handleLombaChange}
                      >
                        <option value="" >Pilih Lomba</option>
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

export default FormEditPendaftaran;
