import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Lomba from "./LombaModel.js";

const { DataTypes } = Sequelize;

const Category = db.define('category', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    lombaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Lomba,
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

Lomba.hasMany(Category, { foreignKey: 'lombaId' });
Category.belongsTo(Lomba, { foreignKey: 'lombaId' });


export default Category;
