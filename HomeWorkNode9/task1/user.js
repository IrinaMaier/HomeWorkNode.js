import { DataTypes } from 'sequelize'
import { sequelize } from './db.js'

export const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  mustChangePassword: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  role: {
     type: DataTypes.ENUM('user', 'admin'),
    allowNull: false,
    defaultValue: 'user',
  },
})