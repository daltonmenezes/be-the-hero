const {
  createIncident,
  updateIncident,
  deleteIncident,
  getIncidents,
  incident_mock
} = require('../handlers/incidentHandler')

const { createNGO } = require('../handlers/ngoHandler')

describe('Incidents', () => {
  it('should be able to create a new incident', async () => {
    const createdNGO = await createNGO()
    const createdIncident = await createIncident(createdNGO.body.id)

    expect(createdIncident.body).toHaveProperty('id')
  })

  it('should be able to update an incident', async () => {
    const createdNGO = await createNGO()
    const createdIncident = await createIncident(createdNGO.body.id)
    const updatedIncident = await updateIncident(createdNGO.body.id)
    
    expect(updatedIncident.status).toBe(204)
  })

  it('should be able to delete an incident', async () => {
    const createdNGO = await createNGO()
    const createdIncident = await createIncident(createdNGO.body.id)
    const deletedIncident = await deleteIncident(createdNGO.body.id)
    
    expect(deletedIncident.status).toBe(204)
  })

  it('should be able to get all incidents', async () => {
    const createdNGO = await createNGO()
    
    await createIncident(createdNGO.body.id)
    await createIncident(createdNGO.body.id)
    
    const incidents = await getIncidents()
    expect(incidents.body).toHaveLength(2)
  })
})