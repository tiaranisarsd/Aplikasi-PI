import TentangKegiatan from '../models/TentangKegiatanModel.js';
import fs from 'fs';
import path from 'path';

export const getTentangKegiatan = async (req, res) => {
    try {
        let response = await TentangKegiatan.findAll({
            attributes: ['id', 'uuid', 'judulKegiatan', 'image', 'tanggal', 'keterangan'],
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getTentangKegiatanById = async (req, res) => {
    try {
        const tentangKagiatan = await TentangKegiatan.findOne({
            attributes: ['id', 'uuid', 'judulKegiatan', 'image', 'tanggal', 'keterangan'],
            where: {
                uuid: req.params.id,
            },
        });
        if (!tentangKagiatan) return res.status(404).json({ msg: "Data tidak ditemukan" });

        res.status(200).json(tentangKagiatan);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createTentangKegiatan = async (req, res) => {
    try {
        const { judulKegiatan, tanggal, keterangan } = req.body;
        const image = req.file ? req.file.filename : '';
        // Pastikan data JSON yang diterima valid sebelum digunakan
        await TentangKegiatan.create({
            judulKegiatan: judulKegiatan,
            image: image,
            tanggal: tanggal,
            keterangan: keterangan
        });

        res.status(201).json({ msg: "TentangKegiatan Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const updateTentangKegiatan = async (req, res) => {
    try {
        const tentangKegiatan = await TentangKegiatan.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!tentangKegiatan) return res.status(404).json({ msg: "Data tidak ditemukan" });

        const { judulKegiatan, tanggal, keterangan } = req.body;

        // Handle image update
        if (req.file) {
            const imagePath = path.join(process.cwd(), 'uploads/tentangKegiatan', tentangKegiatan.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
            tentangKegiatan.image = req.file.filename;
        }

        // Update data tentangKegiatan
        tentangKegiatan.judulKegiatan = judulKegiatan;
        tentangKegiatan.tanggal = tanggal;
        tentangKegiatan.keterangan = keterangan;

        await tentangKegiatan.save(); // Simpan perubahan ke database

        res.status(200).json({ msg: "Data Tentang Kegiatan berhasil diperbarui" });
    } catch (error) {
        console.error("Error in updateTentangKegiatan:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const deleteTentangKegiatan = async (req, res) => {
    try {
        const tentangKagiatan = await TentangKegiatan.findOne({
            where: {
                uuid: req.params.id
            }
        });

        if (!tentangKagiatan) {
            console.error("Data not found");
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        // Hapus file gambar dari folder tentang
        const imagePath = path.join(process.cwd(), 'tentangKegiatan', tentangKagiatan.image);
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Error deleting image ${tentangKagiatan.image}: ${err}`);
                } else {
                    console.log(`Deleted image ${tentangKagiatan.image}`);
                }
            });
        }

        await TentangKegiatan.destroy({
            where: {
                uuid: req.params.id,
            }
        });

        res.status(200).json({ msg: "TentangKegiatan deleted successfully" });
    } catch (error) {
        console.error("Error in deleteTentangKegiatan:", error);
        res.status(500).json({ msg: error.message });
    }
};

