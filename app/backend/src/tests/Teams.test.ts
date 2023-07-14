import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';

import { teams, team } from './mocks/team.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', () => {
  it('deve retornar todos os temes, na rota GET/teams', async function() {
    sinon.stub(Team, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('deve retornar um time por id na rota GET/teams/1', async function() {
    sinon.stub(Team, 'findByPk').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('não deve retornar um time quando não encontrar', async function() {
    sinon.stub(Team, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Team not found');
  });


  afterEach(sinon.restore);
});