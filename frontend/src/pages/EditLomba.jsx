import React, {useEffect} from 'react'
import Layout from './Layout'
import FormEditLomba from '../components/FormEditLomba'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditLomba = () => {
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
            <FormEditLomba />
        </Layout>
    </div>
  )
}

export default EditLomba;