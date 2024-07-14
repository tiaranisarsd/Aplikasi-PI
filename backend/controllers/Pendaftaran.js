// controllers/pendaftaran.js

import Pendaftaran from "../models/PendaftaranModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
import Lomba from "../models/LombaModel.js";
import Category from "../models/CategoryModel.js";

export const getPendaftaran = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Pendaftaran.findAll({
                attributes: ['id', 'uuid', 'name'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }, {
                    model: Lomba,
                    attributes: ['id', 'lombaName']
                }, {
                    model: Category,
                    attributes: ['id', 'categoryName']
                }]
            });
        } else {
            response = await Pendaftaran.findAll({
                attributes: ['id','uuid', 'name'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }, {
                    model: Lomba,
                    attributes: ['id','lombaName']
                }, {
                    model: Category,
                    attributes: ['id','categoryName']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getPendaftaranById = async (req, res) => {
    try {
        const pendaftaran = await Pendaftaran.findOne({
            attributes: ['id','uuid', 'name'],
            where: {
                uuid: req.params.id,

            },
            include: [{
                model: User,
                attributes: ['name', 'email']
            }, {
                model: Lomba,
                attributes: ['id','lombaName']
            }, {
                model: Category,
                attributes: ['id','categoryName']
            }],
        });
        if (!pendaftaran) return res.status(404).json({ msg: "Data tidak ditemukan" });
        
        res.status(200).json(pendaftaran);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createPendaftaran = async (req, res) => {
    const { name, lombaId, categoryId } = req.body;
    try {
        await Pendaftaran.create({
            name: name,
            lombaId: lombaId,
            categoryId: categoryId,
            userId: req.userId
        });
        res.status(201).json({ msg: "Pendaftaran Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updatePendaftaran = async (req, res) => {
    try {
        const pendaftaran = await Pendaftaran.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!pendaftaran) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { name, lombaId, categoryId } = req.body;
        await Pendaftaran.update({ name, lombaId, categoryId }, {
            where: {
                uuid: req.params.id,
            }
        });
        res.status(200).json({ msg: "Pendaftaran updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deletePendaftaran = async (req, res) => {
    try {
        const pendaftaran = await Pendaftaran.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!pendaftaran) return res.status(404).json({ msg: "Data tidak ditemukan" });

        await Pendaftaran.destroy({
            where: {
                uuid: req.params.id,
            }
        });
        res.status(200).json({ msg: "Pendaftaran deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
