import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import sequelize from '../utils/sequilize';

const detector = sequelize.define("Detector", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    model_detector: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    name_detector: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    producing_country: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export detector extends Model<detector> {}