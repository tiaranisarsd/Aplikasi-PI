import React, {useEffect} from 'react'
import Layout from './Layout'
import FormEditPendaftaran from '../components/FormEditPendaftaran'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditPendaftaran = () => {
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
            <FormEditPendaftaran />
        </Layout>
    </div>
  )
}

export default EditPendaftaran