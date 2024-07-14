import React, { useEffect }from 'react'
import Layout from './Layout'
import FormAddTentangKegiatan from '../components/FormAddTentangKegiatan'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddTentangKegiatan = () => {
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
            <FormAddTentangKegiatan />
        </Layout>
    </div>
  )
}

export default AddTentangKegiatan