import React, {useEffect} from 'react'
import Layout from './Layout'
import FormEditDashboard from '../components/FormEditDashboard'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const EditDashboard = () => {
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
            <FormEditDashboard />
        </Layout>
    </div>
  )
}

export default EditDashboard