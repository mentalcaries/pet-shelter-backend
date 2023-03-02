import { literal, DataTypes, Model, BuildOptions, Optional, Sequelize } from 'sequelize';
import { sequelize } from '.';

interface PetAttributes {
  id: string;
  name: string;
  birthDate: string;
  type: string;
  city: string;
  country: string;
  shelterId: string;
  breed: string;
  photo: string;
  vaccinated: boolean;
  neutered: boolean;
  adopted: boolean;
};


interface PetCreationAttributes
  extends Optional<PetAttributes, 'id'> {}

interface PetInstance
  extends Model<PetAttributes, PetCreationAttributes>,
    PetAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

module.exports = (sequelize: Sequelize, Datatypes: any) =>{
  const Pet = sequelize.define<PetInstance>(
    'Pet',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      birthDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isDate: true },
      },
      type: {
        type: DataTypes.STRING,
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
      shelterId: {
        type: DataTypes.UUID,
        // set association
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING,
        validate: { isUrl: true },
        allowNull: false,
      },
      vaccinated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      neutered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      adopted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: true }
  );

    return Pet
  }

