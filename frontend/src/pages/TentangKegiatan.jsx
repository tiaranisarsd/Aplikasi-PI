import React, { useEffect } from "react";
import Layout from "./Layout";
import TentangKegiatanList from "../components/TentangKegiatanList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const TentangKegiatan = () => {
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
    <TentangKegiatanList />
    </Layout>
  );
};

export default TentangKegiatan;