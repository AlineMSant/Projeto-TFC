import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeam from './SequelizeTeam';

class Match extends Model<InferAttributes<Match>,
InferCreationAttributes<Match>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

Match.belongsTo(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'awayTeam' });

SequelizeTeam.hasMany(Match, { foreignKey: 'homeTeamId', as: 'homeTeamsMatche' });
SequelizeTeam.hasMany(Match, { foreignKey: 'awayTeamId', as: 'awayTeamsMatche' });

export default Match;
