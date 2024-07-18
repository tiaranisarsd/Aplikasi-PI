import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Lomba from "./LombaModel.js";

const { DataTypes } = Sequelize;

const Dashboard = db.define('Dashboard', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lombaId: {
        type: DataTypes.INTEGER,  
        allowNull: false,
        references: {
            model: Lomba,  
            key: 'id'
        },
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    categoryId: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
            notEmpty: true,
            isArray(value) {
                if (!Array.isArray(value)) {
                    throw new Error('CategoryId harus berupa array');
                }
            }
        }
    },
    aturanLomba: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

Lomba.hasMany(Dashboard, { foreignKey: 'lombaId' });
Dashboard.belongsTo(Lomba, { foreignKey: 'lombaId' });

export default Dashboard;
