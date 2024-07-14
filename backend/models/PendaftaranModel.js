import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Lomba from "./LombaModel.js";
import Category from "./CategoryModel.js";

const { DataTypes } = Sequelize;

const Pendaftaran = db.define('Pendaftaran', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    lombaId: {
        type: DataTypes.INTEGER,  // Pastikan tipe data sesuai
        allowNull: true,
        references: {
            model: Lomba,  // Menggunakan model Lomba sebagai referensi
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    
    categoryId: {
        type: DataTypes.INTEGER,  
        allowNull: true,
        references: {
            model: Category,
            key: 'id'
        },
        validate: {
            notEmpty: true
        },
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
}, {
    freezeTableName: true
});

Users.hasMany(Pendaftaran);
Pendaftaran.belongsTo(Users, { foreignKey: 'userId' });
Lomba.hasMany(Pendaftaran, { foreignKey: 'lombaId' });
Pendaftaran.belongsTo(Lomba, { foreignKey: 'lombaId' });
Category.hasMany(Pendaftaran, { foreignKey: 'categoryId' });
Pendaftaran.belongsTo(Category, { foreignKey: 'categoryId' });

export default Pendaftaran;
