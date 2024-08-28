import Lomba from "../models/LombaModel.js";
import User from "../models/UserModel.js";
// Mendapatkan semua Lomba
export const getAllLomba = async (req, res) => {
    try {
        let response;
            response = await Lomba.findAll({
                attributes: ['id','uuid', 'lombaName'],
            });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Mendapatkan Lomba berdasarkan ID
export const getLombaById = async (req, res) => {
    try {
        const lomba = await Lomba.findOne({
            where: {
                uuid: req.params.id
            },
        });
        if (!lomba) return res.status(404).json({ msg: "Data tidak ditemukan" });
        
        res.status(200).json(lomba);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Menambahkan Lomba baru
export const createLomba = async (req, res) => {
    const { lombaName } = req.body;
    try {
        await Lomba.create({
            lombaName: lombaName,
        });
        res.status(201).json({ msg: "Lomba Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Memperbarui Lomba berdasarkan ID
export const updateLomba = async (req, res) => {
    try {
        const lomba = await Lomba.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!lomba) return res.status(404).json({ msg: "Data tidak ditemukan" });
        
        const { lombaName } = req.body;
        await Lomba.update({ lombaName }, {
            where: {
                uuid: req.params.id,
            }
        });
        res.status(200).json({ msg: "Lomba updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Menghapus Lomba berdasarkan ID
export const deleteLomba = async (req, res) => {
    try {
        const lomba = await Lomba.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!lomba) return res.status(404).json({ msg: "Data tidak ditemukan" });

        await Lomba.destroy({
            where: {
                uuid: req.params.id,
            }
        });
        res.status(200).json({ msg: "Lomba deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export default {
    getAllLomba,
    getLombaById,
    createLomba,
    updateLomba,
    deleteLomba,
};
