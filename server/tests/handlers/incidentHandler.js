const request = require('supertest')
const db = require('../../src/database/connection')
const server = require('../../src/app')

const incident_mock = {
  title: 'Helping cats',
  description: 'Help us to rescue and care for our pets.',
  amount: 100
}

const incident_update_mock = {
  ...incident_mock,
  title: 'Helping dogs',
}

exports.incident_mock = incident_mock

exports.createIncident = async function (id) {
  return await request(server)
    .post('/incidents')
    .set('Authorization', id)
    .send(incident_mock)
}

exports.updateIncident = async function (id) {
  return await request(server)
    .put('/incidents/1')
    .set('Authorization', id)
    .send(incident_update_mock)
}

exports.deleteIncident = async function (id) {
  return await request(server)
    .delete('/incidents/1')
    .set('Authorization', id)
}

exports.getIncidents = async function () {
  return await request(server)
    .get('/incidents')
    .query('page=1')
}