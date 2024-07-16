import Dokumentasi from "../models/DokumentasiModel.js";
import { upload } from "../multerConfig.js"; // Sesuaikan dengan lokasi file multerConfig.js
import fs from 'fs';
import path from 'path';

export const getDokumentasi = async (req, res) => {
    try {
        let response = await Dokumentasi.findAll({
            attributes: ['id', 'uuid', 'kegiatanName', 'imageKegiatan'],
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getDokumentasiById = async (req, res) => {
    try {
        const dokumentasi = await Dokumentasi.findOne({
            attributes: ['id', 'uuid', 'kegiatanName', 'imageKegiatan'],
            where: {
                uuid: req.params.id,
            },
        });
        if (!dokumentasi) return res.status(404).json({ msg: "Data tidak ditemukan" });

        res.status(200).json(dokumentasi);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createDokumentasi = async (req, res) => {
    try {
        const { kegiatanName} = req.body;
        const imageKegiatan = req.file ? req.file.filename : '';
        // Pastikan data JSON yang diterima valid sebelum digunakan
        await Dokumentasi.create({
            kegiatanName: kegiatanName,
            imageKegiatan: imageKegiatan
        });

        res.status(201).json({ msg: "Dokumentasi Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const updateDokumentasi = async (req, res) => {
    try {
        const dokumentasi = await Dokumentasi.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!dokumentasi) return res.status(404).json({ msg: "Data tidak ditemukan" });

        const { kegiatanName } = req.body;

        // Handle image update
        if (req.file) {
            const oldImagePath = path.join(process.cwd(), 'uploads', 'dokumentasi', dokumentasi.imageKegiatan);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); // Hapus gambar lama
            }
            dokumentasi.imageKegiatan = req.file.filename; // Simpan nama file baru
        }

        // Update data dokumentasi
        dokumentasi.kegiatanName = kegiatanName;

        await dokumentasi.save(); // Simpan perubahan ke database

        res.status(200).json({ msg: "Data Dokumentasi berhasil diperbarui" });
    } catch (error) {
        console.error("Error in updateDokumentasi:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const deleteDokumentasi = async (req, res) => {
    try {
        const dokumentasi = await Dokumentasi.findOne({
            where: {
                uuid: req.params.id
            }
        });

        if (!dokumentasi) {
            console.error("Data not found");
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        // Hapus file gambar dari folder uploads
        const imagePath = path.join(process.cwd(), 'dokumentasi', dokumentasi.imageKegiatan);
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Error deleting image ${dokumentasi.imageKegiatan}: ${err}`);
                } else {
                    console.log(`Deleted image ${dokumentasi.imageKegiatan}`);
                }
            });
        }

        await Dokumentasi.destroy({
            where: {
                uuid: req.params.id,
            }
        });

        res.status(200).json({ msg: "Dokumentasi deleted successfully" });
    } catch (error) {
        console.error("Error in delete Dokumentasi:", error);
        res.status(500).json({ msg: error.message });
    }
};

