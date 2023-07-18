import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';

import { matches, inProgressTrue } from './mocks/matches.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches testes', () => {
  it('deve retornar todos os matches na rota get /matches', async function() {
    sinon.stub(Match, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('deve retornar matches com inProgress = false quando usar uma query', async function() {
    sinon.stub(Match, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('deve retornar matches com inProgress = true quando usar uma query', async function() {
    sinon.stub(Match, 'findAll').resolves(inProgressTrue as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(inProgressTrue);
  });


  afterEach(sinon.restore);
});