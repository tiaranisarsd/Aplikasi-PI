import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditCategory = () => {
  const [category, setCategory] = useState([]);
  const [categoryName, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const hslValue = 'hsl(200, 90%, 25%)';
  const { id } = useParams();

  useEffect(() => {
    const getCategoryById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Category/${id}`
        );
        setName(response.data.categoryName);
        setCategoryId(response.data.categoryId);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getCategory();
    getCategoryById();
  }, [id]);
  
    const updateCategory = async (e) => {
      e.preventDefault();
      try {
        await axios.patch(`http://localhost:5000/Category/${id}`, {
          categoryName: categoryName,
          categoryId: category.id,
        });
        navigate("/Category");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    const getCategory = async () => {
      try {
          const response = await axios.get("http://localhost:5000/Category");
          setCategory(response.data);
      } catch (error) {
          console.error("Error fetching Category:", error);
      }
  };

  return (
    <div>
        <h1 style={{ marginLeft: '1%', color: hslValue }} className='title'>Category</h1>
        <h2 style={{ marginLeft: '1%', color: hslValue }} className='subtitle'>Edit Category</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                <form onSubmit={updateCategory}>
                    <p className="has-text-centered"> {msg} </p>
                <div className="field">
                    <label style={{color: hslValue}} className="label">Nama Kategori</label>
                    <div className="control">
                        <textarea 
                        type="text" 
                        className="textarea"
                        value={categoryName}
                        key={categoryId}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name' 
                        />
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

export default FormEditCategory;