const { Sequelize, DataTypes } = require('sequelize');
const user = require('./userModel')
const pet = require('./petModel')

interface Database {
  Sequelize? : any,
  sequelize?: any,
  users?: any,
  pets?: any
}

const {PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST, 
  dialect: 'postgres'
})

sequelize.authenticate().then(()=>{
  console.log(`Database connected 🤝`)
}).catch((err: Error) => console.log(err))

// const db: Database = {}
// db.Sequelize = Sequelize
// db.sequelize = sequelize
// db.users =  user(sequelize, DataTypes)
// db.pets =  pet(sequelize, DataTypes)


export { sequelize, Sequelize }