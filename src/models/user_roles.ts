import { Sequelize, UUIDV4, Model, Optional, BuildOptions } from 'sequelize';
import { UserAttributes } from './users';

export interface UserRolesAttributes {
    id: string; // id is an auto-generated UUID
    user_id: string;
    role: string;
    _deleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    // Association Fields
    user?: UserAttributes;
}

interface UserRolesCreationAttributes extends Optional<UserRolesAttributes, 'id'> {}

interface UserRolesInstance extends Model<UserRolesAttributes, UserRolesCreationAttributes>, UserRolesAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

type UserRolesStatic = typeof Model & { associate: (models: any) => void } & (new (
        values?: Record<string, unknown>,
        options?: BuildOptions
    ) => UserRolesInstance);

export default (sequelize: Sequelize, DataTypes: any) => {
    const UserRoles = sequelize.define<UserRolesInstance>(
        'user_roles',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: UUIDV4
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
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
    ) as UserRolesStatic;

    UserRoles.associate = (models) => {
        UserRoles.belongsTo(models.users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            as: 'user'
        });
    };

    // TODO: make common function to sync
    // await UserRoles.sync({ alter: true });

    return UserRoles;
};
