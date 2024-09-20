import { Sequelize } from "sequelize";

const db = new Sequelize('kmic_db', 'root', 'Limadara150195,', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;
