import Dashboard from "../models/DashboardModel.js";
import Lomba from "../models/LombaModel.js";
import Category from "../models/CategoryModel.js";
import { upload } from "../multerConfig.js"; // Sesuaikan dengan lokasi file multerConfig.js
import fs from 'fs';
import path from 'path';

export const getDashboard = async (req, res) => {
    try {
        let response = await Dashboard.findAll({
            attributes: ['id', 'uuid', 'imageUrl', 'aturanLomba', 'categoryId'],
            include: [{
                model: Lomba,
                attributes: ['id', 'lombaName']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        console.error("Error in getDashboard:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const getDashboardById = async (req, res) => {
    try {
        const dashboard = await Dashboard.findOne({
            attributes: ['id', 'uuid', 'imageUrl', 'aturanLomba', 'categoryId'],
            where: {
                uuid: req.params.id,
            },
            include: [{
                model: Lomba,
                attributes: ['id', 'lombaName']
            }],
        });
        if (!dashboard) return res.status(404).json({ msg: "Data tidak ditemukan" });

        res.status(200).json(dashboard);
    } catch (error) {
        console.error("Error in getDashboardById:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const createDashboard = async (req, res) => {
    try {
        const { lombaId, categoryId, aturanLomba } = req.body;
        let parsedCategoryId;
        
        if (Array.isArray(categoryId)) {
            parsedCategoryId = categoryId;
        } else {
            try {
                parsedCategoryId = JSON.parse(categoryId);
            } catch (error) {
                console.error("Error parsing categoryId in createDashboard:", error);
                return res.status(400).json({ msg: "Invalid categoryId format" });
            }
        }
        
        const imageUrl = req.file ? req.file.filename : '';
        
        await Dashboard.create({
            lombaId: parseInt(lombaId),
            imageUrl: imageUrl,
            categoryId: parsedCategoryId,
            aturanLomba: aturanLomba
        });

        res.status(201).json({ msg: "Dashboard Created Successfully" });
    } catch (error) {
        console.error("Error in createDashboard:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const updateDashboard = async (req, res) => {
    try {
        const dashboard = await Dashboard.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!dashboard) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        const { lombaId, aturanLomba } = req.body;
        let { categoryId } = req.body;

        // Handle multiple categoryIds
        if (!Array.isArray(categoryId)) {
            try {
                categoryId = JSON.parse(categoryId);
            } catch (error) {
                console.error("Error parsing categoryId:", error);
                return res.status(400).json({ msg: "Invalid categoryId format" });
            }
        }

        // Handle image update
        if (req.file) {
            const imagePath = path.join(process.cwd(), 'uploads', dashboard.imageUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Hapus gambar lama
            }
            dashboard.imageUrl = req.file.filename; // Simpan nama file baru
        }

        // Update data dashboard
        dashboard.lombaId = parseInt(lombaId);
        dashboard.categoryId = categoryId;
        dashboard.aturanLomba = aturanLomba;

        await dashboard.save(); // Simpan perubahan ke database

        res.status(200).json({ msg: "Data Dashboard berhasil diperbarui" });
    } catch (error) {
        console.error("Error in updateDashboard:", error);
        res.status(500).json({ msg: error.message });
    }
};

export const deleteDashboard = async (req, res) => {
    try {
        const dashboard = await Dashboard.findOne({
            where: {
                uuid: req.params.id
            }
        });

        if (!dashboard) {
            console.error("Data not found");
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        const imagePath = path.join(process.cwd(), 'uploads', dashboard.imageUrl);
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Error deleting image ${dashboard.imageUrl}: ${err}`);
                } else {
                    console.log(`Deleted image ${dashboard.imageUrl}`);
                }
            });
        }

        await Dashboard.destroy({
            where: {
                uuid: req.params.id,
            }
        });

        res.status(200).json({ msg: "Dashboard deleted successfully" });
    } catch (error) {
        console.error("Error in deleteDashboard:", error);
        res.status(500).json({ msg: error.message });
    }
};
