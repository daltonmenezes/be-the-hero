const request = require('supertest')
const db = require('../../src/database/connection')
const server = require('../../src/app')

const ngo_mock = {
  name: 'Pet lovers',
  email: 'contact@petlovers.com',
  whatsapp: '(+1) 202-555-0181',
  city: 'Austin',
  stateABB: 'TX'
}

exports.ngo_mock = ngo_mock

exports.createNGO = async function () {
  return await request(server)
    .post('/ngos')
    .send(ngo_mock)
}

exports.signInNGO = async function (id) {
  return await request(server)
    .post('/sessions')
    .send({ id })
}

exports.getNGOs = async function () {
  return await request(server).get('/ngos')
}

exports.getNGOProfile = async function (id) {
  return await request(server)
    .get('/ngos')
    .set('Authorization', id)
}