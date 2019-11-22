import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import sequelize from '../utils/sequilize';


interface MyModel extends Model {
    readonly id: number,
    readonly name_detector: string;
};

  type MyModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): MyModel;
};

const detector = <MyModelStatic>sequelize.define("detector", {
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

export default detector;
