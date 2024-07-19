import {Sequelize} from "sequelize";

const db = new Sequelize('freedb_kmic_db', 'freedb_kmic-user', '5MNsMBj!#EK8tQW', {
    host: "sql.freedb.tech",
    dialect: "mysql"
});

export default db;