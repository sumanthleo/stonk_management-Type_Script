import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';
import { logger } from '../utils/logger';
import { UserRolesAttributes } from './user_roles';

export interface UserAttributes {
    id: string; // id is an auto-generated UUID
    user_name: string;
    // last_name: string;
    email: string;
    password: string;
    phone: string;
    age: number;
    profile_image: string;
    profile_image_url: string;
    country: string;
    user_wallet_balance: string;
    is_active: boolean;
    _deleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    // Association Fields
    userRole?: UserRolesAttributes[];
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}


//doubt
type UserStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => UserInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const Users = sequelize.define<UserInstance>(
        'users',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: UUIDV4,
            },
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            profile_image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            profile_image_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            user_wallet_balance: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            _deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            }
        },
        {
            freezeTableName: true
        }
    ) as UserStatic;

    Users.associate = (models) => {
        Users.hasMany(models.user_roles, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            as: 'userRole'
        });
    };

    // TODO: make common function to sync
    // Users.sync({ alter: true }).then(() => {
    //     logger.info('Users sync Done!');
    //     });

    return Users;
};
