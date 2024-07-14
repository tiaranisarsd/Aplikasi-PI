import Category from "../models/CategoryModel.js";
import Lomba from "../models/LombaModel.js";
import { Op } from "sequelize";

export const getCategory = async (req, res) => {
    try {
        const categories = await Category.findAll({
            attributes: ['id', 'uuid', 'categoryName', 'lombaId']
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!category) return res.status(404).json({ msg: "Data tidak ditemukan" });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const createCategory = async (req, res) => {
    const { categoryName, lombaId } = req.body;
    try {
        const newCategory = await Category.create({
            categoryName,
            lombaId
        });
        res.status(201).json({ msg: "Category Created Successfully", category: newCategory });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!category) return res.status(404).json({ msg: "Data tidak ditemukan" });
        
        const { categoryName } = req.body;
        await Category.update({ categoryName }, {
            where: {
                uuid: req.params.id,
            }
        });
        res.status(200).json({ msg: "Category updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!category) return res.status(404).json({ msg: "Data tidak ditemukan" });
        await Category.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const getCategoryByLomba = async (req, res) => {
    try {
        const categories = await Category.findAll({
            where: {
                lombaId: req.params.lombaId
            }
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


