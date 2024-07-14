import React, { useEffect }from 'react'
import Layout from './Layout'
import FormAddLomba from '../components/FormAddLomba'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddLomba = () => {
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
            <FormAddLomba />
        </Layout>
    </div>
  )
}

export default AddLomba