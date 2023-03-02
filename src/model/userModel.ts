import { literal, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { sequelize } from '.';


interface UserAttributes {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  type: string;
  city: string;
  country: string
};

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }


module.exports = (sequelize: Sequelize, Datatypes: any) =>{
  const User = sequelize.define<UserInstance>(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true },
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM({
          values: ['INDIVIDUAL', 'SHELTER'],
        }),
        defaultValue: 'INDIVIDUAL',
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
  
  return User;
  }
