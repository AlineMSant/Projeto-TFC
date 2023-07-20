import { IMatch } from '../Interfaces/matches/IMatch';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ILeaderboard } from '../Interfaces/learderboard/ILeaderboard';

function name(match: IMatch[], allTeams: ITeam[]): string {
  const homeTeam = match[0];
  const team = allTeams.filter((teamObj) => teamObj.id === homeTeam.homeTeamId);
  return team[0].teamName;
}

function totalPoints(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    if (Number(match[i].homeTeamGoals) > Number(match[i].awayTeamGoals)) sum += 3;
    if (Number(match[i].homeTeamGoals) === Number(match[i].awayTeamGoals)) sum += 1;
  }
  return sum;
}

function totalGames(match: IMatch[]): number {
  return match.length;
}

function totalVictories(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    if (Number(match[i].homeTeamGoals) > Number(match[i].awayTeamGoals)) sum += 1;
  }
  return sum;
}

function totalDraws(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    if (Number(match[i].homeTeamGoals) === Number(match[i].awayTeamGoals)) sum += 1;
  }
  return sum;
}

function totalLosses(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    if (Number(match[i].homeTeamGoals) < Number(match[i].awayTeamGoals)) sum += 1;
  }
  return sum;
}

function goalsFavor(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    sum += match[i].homeTeamGoals;
  }
  return sum;
}

function goalsOwn(match: IMatch[]): number {
  let sum = 0;

  for (let i = 0; i < match.length; i += 1) {
    sum += match[i].awayTeamGoals;
  }
  return sum;
}

export default function sumTotals(matches: IMatch[][], allTeams: ITeam[]): ILeaderboard[] {
  const retorno = matches.map((array) => ({
    name: name(array, allTeams),
    totalPoints: totalPoints(array),
    totalGames: totalGames(array),
    totalVictories: totalVictories(array),
    totalDraws: totalDraws(array),
    totalLosses: totalLosses(array),
    goalsFavor: goalsFavor(array),
    goalsOwn: goalsOwn(array),
  }));

  return retorno;
}
