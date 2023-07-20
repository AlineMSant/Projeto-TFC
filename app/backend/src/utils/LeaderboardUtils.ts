import { IMatch } from '../Interfaces/matches/IMatch';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ILeaderboard } from '../Interfaces/learderboard/ILeaderboard';

function totalGames(match: IMatch[]): number {
  return match.length;
}

function goalsHome(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    sum += match[i].homeTeamGoals;
  }
  return sum;
}

function nameHome(match: IMatch[], allTeams: ITeam[]): string {
  const homeTeam = match[0];
  const team = allTeams.filter((teamObj) => teamObj.id === homeTeam.homeTeamId);
  return team[0].teamName;
}

function totalPointsHome(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    if (Number(match[i].homeTeamGoals) > Number(match[i].awayTeamGoals)) sum += 3;
    if (Number(match[i].homeTeamGoals) === Number(match[i].awayTeamGoals)) sum += 1;
  }
  return sum;
}

function totalVictoriesHome(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    if (Number(match[i].homeTeamGoals) > Number(match[i].awayTeamGoals)) sum += 1;
  }
  return sum;
}

function totalDrawsHome(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    if (Number(match[i].homeTeamGoals) === Number(match[i].awayTeamGoals)) sum += 1;
  }
  return sum;
}

function totalLossesHome(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    if (Number(match[i].homeTeamGoals) < Number(match[i].awayTeamGoals)) sum += 1;
  }
  return sum;
}

function goalsAway(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    sum += match[i].awayTeamGoals;
  }
  return sum;
}

function nameAway(match: IMatch[], allTeams: ITeam[]): string {
  const awayTeam = match[0];
  const team = allTeams.filter((teamObj) => teamObj.id === awayTeam.awayTeamId);
  return team[0].teamName;
}

function totalPointsAway(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    if (Number(match[i].awayTeamGoals) > Number(match[i].homeTeamGoals)) sum += 3;
    if (Number(match[i].awayTeamGoals) === Number(match[i].homeTeamGoals)) sum += 1;
  }
  return sum;
}

function totalVictoriesAway(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    if (Number(match[i].awayTeamGoals) > Number(match[i].homeTeamGoals)) sum += 1;
  }
  return sum;
}

function totalDrawsAway(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    if (Number(match[i].awayTeamGoals) === Number(match[i].homeTeamGoals)) sum += 1;
  }
  return sum;
}

function totalLossesAway(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    if (Number(match[i].awayTeamGoals) < Number(match[i].homeTeamGoals)) sum += 1;
  }
  return sum;
}

export function sumTotalsHome(matches: IMatch[][], allTeams: ITeam[]): ILeaderboard[] {
  const retorno = matches.map((array) => ({
    name: nameHome(array, allTeams),
    totalPoints: totalPointsHome(array),
    totalGames: totalGames(array),
    totalVictories: totalVictoriesHome(array),
    totalDraws: totalDrawsHome(array),
    totalLosses: totalLossesHome(array),
    goalsFavor: goalsHome(array),
    goalsOwn: goalsAway(array),
    goalsBalance: goalsHome(array) - goalsAway(array),
    efficiency: (totalPointsHome(array) / (totalGames(array) * 3)) * 100,
  }));

  return retorno;
}

export function sumTotalsAway(matches: IMatch[][], allTeams: ITeam[]): ILeaderboard[] {
  const retorno = matches.map((array) => ({
    name: nameAway(array, allTeams),
    totalPoints: totalPointsAway(array),
    totalGames: totalGames(array),
    totalVictories: totalVictoriesAway(array),
    totalDraws: totalDrawsAway(array),
    totalLosses: totalLossesAway(array),
    goalsFavor: goalsAway(array),
    goalsOwn: goalsHome(array),
    goalsBalance: goalsAway(array) - goalsHome(array),
    efficiency: (totalPointsAway(array) / (totalGames(array) * 3)) * 100,
  }));

  return retorno;
}
