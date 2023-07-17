import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../../src/database/models/UserModel';
import { user, validLogin, invalidEmail, invalidPassword, notFoundEmail, notPassword, notKeyEmail } from './mocks/user.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login testes', () => {
  describe('Login de sucesso', function () {
    it('Deve fazer o login com credenciais validas', async function () {
      sinon.stub(bcrypt, 'compareSync').returns(true);
      
      
      sinon.stub(User, 'findOne').resolves(user as User);
      
      const response = await chai.request(app)
        .post('/login').send(validLogin)

      expect(response).to.have.status(200);
      expect(response.body).to.haveOwnProperty('token');
    })
  })

  describe('Login sem sucesso', function () {
    it('não pode fazer login se o email não tiver formado válido', async function () {
      
      const response = await chai.request(app)
        .post('/login').send(invalidEmail)

      expect(response).to.have.status(401);
      expect(response.body).to.deep.equal({
        message: 'Invalid email or password'
      })
    })

    it('não pode fazer login se o password não for válido (possuir menos de 6 caracteres)', async function () {
    
      const response = await chai.request(app)
        .post('/login')
        .send(invalidPassword)
      expect(response).to.have.status(401);
      expect(response.body).to.deep.equal({
        message: 'Invalid email or password'
      })
    })

    it('não pode fazer login se o email não for encontrado', async function () {
      sinon.stub(User, 'findOne').resolves(null);
      const response = await chai.request(app)
        .post('/login')
        .send(notFoundEmail)
      expect(response).to.have.status(401);
      expect(response.body).to.deep.equal({
        message: 'Invalid email or password'
      })
    })
  })

  it('não pode fazer login se a senha for invalida', async function () {
    sinon.stub(bcrypt, 'compareSync').returns(false);
      
      
    sinon.stub(User, 'findOne').resolves(user as User);
    
    const response = await chai.request(app)
      .post('/login').send(notPassword)

    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({
      message: 'Invalid email or password'
    })
})

it('não pode fazer login se não possuir a chave email', async function () {
  const response = await chai.request(app)
      .post('/login')
      .send(notKeyEmail)
    expect(response).to.have.status(400);
    expect(response.body).to.deep.equal({
      message: 'All fields must be filled',
    })
})

  afterEach(sinon.restore);
});