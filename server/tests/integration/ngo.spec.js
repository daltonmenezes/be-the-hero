const { 
  createNGO,
  getNGOs,
  signInNGO,
  getNGOProfile,
  ngo_mock
} = require('../handlers/ngoHandler')

describe('NGO', () => {
  it('should be able to create a new NGO', async () => {
    const createdNGO = await createNGO()
      
    expect(createdNGO.body).toHaveProperty('id')
    expect(createdNGO.body.id).toHaveLength(8)
  })

  it('should be able to get NGO list', async () => {
    const createdNGO = await createNGO()
    const ngos = await getNGOs()

    expect(ngos.body.length).toBeGreaterThanOrEqual(1)
  })

  it('should be able to create and log in an NGO', async () => {
    const createdNGO = await createNGO()
    const login = await signInNGO(createdNGO.body.id)

    expect(login.body).toHaveProperty('name')
    expect(login.body.name).toBe(ngo_mock.name)
  })  

  it('should be able to get NGO profile data', async () => {
    const createdNGO = await createNGO()
    const profile = await getNGOProfile(createdNGO.body.id)

    expect(profile.body.length).toBeGreaterThanOrEqual(1)
  })  
})