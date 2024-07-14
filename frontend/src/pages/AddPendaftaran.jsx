import React, { useEffect }from 'react'
import Layout from './Layout'
import FormAddPendaftaran from '../components/FormAddPendaftaran'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddPendaftaran = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if(isError){
      navigate("/")
    }
  }, [isError, navigate]);

  return (
    <div>
        <Layout>
            <FormAddPendaftaran />
        </Layout>
    </div>
  )
}

export default AddPendaftaran