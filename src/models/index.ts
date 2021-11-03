import path from 'path';
import { Sequelize, Op, DataTypes } from 'sequelize';
import fs from 'fs';
const basename = path.basename(__filename);
const db: any = {};
const { DATABASE_NAME, DATABASE_USER, DATABASE_PASS, DATABASE_HOST } = process.env;

// development
export const sequelize = new Sequelize(DATABASE_NAME!, DATABASE_USER!, DATABASE_PASS!, {
    host: DATABASE_HOST!,
    dialect: 'postgres'
});

const op = Op;
const operatorsAliases = {
    $in: op.in,
    $or: op.or
};

(async () => {
    const allModelFiles = fs.readdirSync(__dirname).filter((file) => {
        return file.indexOf('.') !== 0 && file !== basename && (file.slice(-3) === '.ts' || file.slice(-3) === '.js');
    });

    for (const file of allModelFiles) {
        // Using Es6 Concept
        const model = await import(path.join(__dirname, file));
        db[file.split('.')[0]] = model.default(sequelize, DataTypes);

        // Without using es6 concept so thats why we are writing ts-ignore for successFull build
        // @ts-ignore
        // const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        // db[model.name] = model.default;
    }

    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db['op'] = op;

export default db;
