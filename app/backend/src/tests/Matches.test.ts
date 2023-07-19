import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';

import { matches, inProgressTrue, match, sendData, sendDataCreate, matchCreated, sendEqualTeams, sendInvalidId } from './mocks/matches.mocks';
import { user } from './mocks/user.mocks'
import JwtUtils from '../utils/JwtUtils';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches testes', () => {
  it('deve retornar todos os matches na rota get /matches', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('deve retornar matches com inProgress = false quando usar uma query', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('deve retornar matches com inProgress = true quando usar uma query', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(inProgressTrue as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(inProgressTrue);
  });

  it('deve retornar finalizar uma partida pelo id', async function() {
    sinon.stub(SequelizeMatch, 'update').resolves([1] as any);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(match as any);
    sinon.stub(JwtUtils.prototype, 'verify').returns(user);


    const { status, body } = await chai.request(app)
    .patch('/matches/48/finish')
    .set('Authorization', 'token');

    expect(status).to.equal(200);
    expect(body.message).to.deep.equal('Finished');
  });

  it('não deve encontrar um id valido para atualizar', async function() {
    sinon.stub(SequelizeMatch, 'findByPk').resolves(null);
    sinon.stub(JwtUtils.prototype, 'verify').returns(user);


    const { status, body } = await chai.request(app)
    .patch('/matches/0/finish')
    .set('Authorization', 'token');

    expect(status).to.equal(404);
    expect(body.message).to.deep.equal('Match 0 not found');
  });

  it('deve dar conflito de update para finalizar uma partida', async function() {
    sinon.stub(SequelizeMatch, 'update').resolves([0] as any);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(match as any);
    sinon.stub(JwtUtils.prototype, 'verify').returns(user);


    const { status, body } = await chai.request(app)
    .patch('/matches/3/finish')
    .set('Authorization', 'token');

    expect(status).to.equal(409);
    expect(body.message).to.deep.equal('There are no updates to perform in Match 3');
  });


  it('deve dar update com sucesso de uma partida por id', async function() {
    sinon.stub(SequelizeMatch, 'update').resolves([1] as any);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(match as any);
    sinon.stub(JwtUtils.prototype, 'verify').returns(user);

    const { status, body } = await chai.request(app)
    .patch('/matches/48')
    .set('Authorization', 'token')
    .send(sendData);

    expect(status).to.equal(200);
    expect(body.message).to.deep.equal('Updated');
  });

  it('não deve encontrar um id valido para atualizar Goals de uma partida', async function() {
    sinon.stub(SequelizeMatch, 'findByPk').resolves(null);
    sinon.stub(JwtUtils.prototype, 'verify').returns(user);


    const { status, body } = await chai.request(app)
    .patch('/matches/0')
    .set('Authorization', 'token')
    .send(sendData);

    expect(status).to.equal(404);
    expect(body.message).to.deep.equal('Match 0 not found');
  });

  it('deve dar conflito de update para atualizar uma partida', async function() {
    sinon.stub(SequelizeMatch, 'update').resolves([0] as any);
    sinon.stub(SequelizeMatch, 'findByPk').resolves(match as any);
    sinon.stub(JwtUtils.prototype, 'verify').returns(user);


    const { status, body } = await chai.request(app)
    .patch('/matches/3')
    .set('Authorization', 'token')
    .send(sendData);;

    expect(status).to.equal(409);
    expect(body.message).to.deep.equal('There are no updates to perform in Match 3');
  });

  it('deve criar uma nova partida com sucesso', async function() {
    sinon.stub(SequelizeMatch, 'create').resolves(matchCreated as any);
    sinon.stub(JwtUtils.prototype, 'verify').returns(user);


    const { status, body } = await chai.request(app)
    .post('/matches')
    .set('Authorization', 'token')
    .send(sendDataCreate);;

    expect(status).to.equal(201);
    expect(body).to.deep.equal(matchCreated);
  });

  it('não deve criar nova partida com homeTeam e awayTeam iguais', async function() {
    sinon.stub(JwtUtils.prototype, 'verify').returns(user);

    const { status, body } = await chai.request(app)
    .post('/matches')
    .set('Authorization', 'token')
    .send(sendEqualTeams);;

    expect(status).to.equal(422);
    expect(body.message).to.deep.equal('It is not possible to create a match with two equal teams');
  });

  it('deve retornar erro quando não encontrar um time', async function() {
    sinon.stub(SequelizeMatch, 'findByPk').resolves(null);
    sinon.stub(JwtUtils.prototype, 'verify').returns(user);

    const { status, body } = await chai.request(app)
    .post('/matches')
    .set('Authorization', 'token')
    .send(sendInvalidId);;

    expect(status).to.equal(404);
    expect(body.message).to.deep.equal('There is no team with such id!');
  });

  afterEach(sinon.restore);
});