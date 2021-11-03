import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';
import { UserRolesAttributes } from './user_roles';

export interface UserAttributes {
    id: string; // id is an auto-generated UUID
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
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
                defaultValue: UUIDV4
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            _deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
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
    // await users.sync({ alter: true });

    return Users;
};
