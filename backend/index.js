import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import PendaftaranRoute from "./routes/PendaftaranRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import LombaRoute from "./routes/LombaRoute.js";
import DashboardRoute from "./routes/DashboardRoute.js";
import BannerRoute from "./routes/BannerRoute.js";
import DokumentasiRoute from "./routes/DokumentasiRoute.js";
import TentangKegiatanRoute from "./routes/TentangKegiatanRoute.js";
import Dashboard from "./models/DashboardModel.js";
import multer from "multer";
import path from "path";
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/banner', express.static(path.join(__dirname, 'banner')));
app.use('/uploads/dokumentasi', express.static(path.join(__dirname, 'dokumentasi')));
app.use('/uploads/tentangKegiatan', express.static(path.join(__dirname, 'tentangKegiatan')));



// (async()=> {
//     await db.sync();
// }) ();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});



app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 3000
}));


app.use(express.json());
app.use(bodyParser.json());
app.use(UserRoute);
app.use(PendaftaranRoute);
app.use(AuthRoute);
app.use(CategoryRoute);
app.use(LombaRoute);
app.use(DashboardRoute);
app.use(BannerRoute);
app.use(DokumentasiRoute);
app.use(TentangKegiatanRoute);
// store.sync();

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(5000, ()=> {
    console.log('Server up and running...');
});
