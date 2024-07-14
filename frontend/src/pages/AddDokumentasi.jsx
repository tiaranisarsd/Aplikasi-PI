import React, { useEffect }from 'react'
import Layout from './Layout'
import FormAddDokumentasi from '../components/FormAddDokumentasi'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddDokumentasi= () => {
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
            <FormAddDokumentasi/>
        </Layout>
    </div>
  )
}

export default AddDokumentasi