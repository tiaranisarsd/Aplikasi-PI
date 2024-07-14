import React, {useEffect} from 'react';
import Layout from './Layout';
import DashboardAdmin from "../components/DashboardAdmin"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AdminDashboard = () => {
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
    <Layout>
        <DashboardAdmin />
    </Layout>
  );
};

export default AdminDashboard;