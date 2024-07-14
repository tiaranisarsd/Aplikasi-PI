import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginKMIC from "./components/LoginKMIC";
import Users from "./pages/Users";
import Pendaftaran from "./pages/Pendaftaran";
import Lomba from "./pages/Lomba";
import Category from "./pages/Category";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddPendaftaran from "./pages/AddPendaftaran";
import EditPendaftaran from "./pages/EditPendaftaran";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import AddLomba from "./pages/AddLomba";
import EditLomba from "./pages/EditLomba";
import AdminDashboard from "./pages/DashboardAdmin";
import AddDashboard from "./pages/AddDashboard";
import EditDashboard from "./pages/EditDashboard";
import Banner from "./pages/Banner";
import AddBanner from "./pages/AddBanner";
import EditBanner from "./pages/EditBanner";
import TentangKagiatan from "./pages/TentangKegiatan";
import Dokumentasi from "./pages/Dokumentasi";
import AdminDokumentasi from "./pages/DokumentasiAdmin";
import AdminTentangKegiatan from "./pages/TentangKegiatanAdmin";
import AddDokumentasi from "./pages/AddDokumentasi";
import EditDokumentasi from "./pages/EditDokumentasi";
import AddTentangKegiatan from "./pages/AddTentangKegiatan";
import EditTentangKegiatan from "./pages/EditTentangKegiatan";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginKMIC />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/users" element={<Users />}/>
        <Route path="/users/add" element={<AddUser />}/>
        <Route path="/users/edit/:id" element={<EditUser />}/>
        <Route path="/pendaftaran" element={<Pendaftaran />}/>
        <Route path="/pendaftaran/add" element={<AddPendaftaran />}/>
        <Route path="/pendaftaran/edit/:id" element={<EditPendaftaran />}/>
        <Route path="/lomba" element={<Lomba />}/>
        <Route path="/lomba/add" element={<AddLomba />}/>
        <Route path="/lomba/edit/:id" element={<EditLomba />}/>
        <Route path="/category" element={<Category />}/>
        <Route path="/category/add" element={<AddCategory />}/>
        <Route path="/category/edit/:id" element={<EditCategory />}/>
        <Route path="/dashboardAdmin" element={<AdminDashboard />}/>
        <Route path="/dashboard/add" element={<AddDashboard />}/>
        <Route path="/dashboard/edit/:id" element={<EditDashboard />}/>
        <Route path="/banner" element={<Banner />}/>
        <Route path="/banner/add" element={<AddBanner />}/>
        <Route path="/banner/edit/:id" element={<EditBanner />}/>
        <Route path="/tentangKegiatan" element={<TentangKagiatan />}/>
        <Route path="/tentangKegiatanAdmin" element={<AdminTentangKegiatan />}/>
        <Route path="/tentangKegiatan/add" element={<AddTentangKegiatan />}/>
        <Route path="/tentangKegiatan/edit/:id" element={<EditTentangKegiatan />}/>
        <Route path="/dokumentasi" element={<Dokumentasi />}/>
        <Route path="/dokumentasiAdmin" element={<AdminDokumentasi />}/>
        <Route path="/dokumentasi/add" element={<AddDokumentasi />}/>
        <Route path="/dokumentasi/edit/:id" element={<EditDokumentasi/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
