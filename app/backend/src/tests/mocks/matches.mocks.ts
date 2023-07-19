const matches = [{
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: "Grêmio"
    }
}];

const inProgressTrue = [{
  id: 41,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 9,
  awayTeamGoals: 0,
  inProgress: true,
  homeTeam: {
    teamName: 'São Paulo'
  },
  awayTeam: {
    teamName: 'Internacional'
  }
}];

const match = {
  id: 41,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 9,
  awayTeamGoals: 0,
  inProgress: true,
  homeTeam: {
    teamName: 'São Paulo'
  },
  awayTeam: {
    teamName: 'Internacional'
  }
}

const sendData = {
  homeTeamGoals: 3,
  awayTeamGoals: 1
}

const sendDataCreate = {
  homeTeamId: 16,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const matchCreated = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true,
}

const sendEqualTeams = {
  homeTeamId: 16,
  awayTeamId: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const sendInvalidId = {
  homeTeamId: 99999,
  awayTeamId: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

export {
  matches,
  inProgressTrue,
  match,
  sendData,
  sendDataCreate,
  matchCreated,
  sendEqualTeams,
  sendInvalidId,
};