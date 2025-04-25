import dotenv from 'dotenv'
dotenv.config()

export default {
    dialect: "postgres",
    host: process.env.PGHOST,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD, 
    database: process.env.PGDATABASE,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
    dialectOptions: {
        ssl: {
            require: true, 
            rejectUnauthorized: false,
        },
    },

}