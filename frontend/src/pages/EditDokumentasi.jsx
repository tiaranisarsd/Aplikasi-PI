import React, {useEffect} from 'react'
import Layout from './Layout'
import FormEditDokumentasi from '../components/FormEditDokumentasi'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditDokumentasi = () => {
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
            <FormEditDokumentasi />
        </Layout>
    </div>
  )
}

export default EditDokumentasi;