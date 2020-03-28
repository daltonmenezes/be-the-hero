const db = require('../../src/database/connection')

beforeEach(async function () {
  await db.migrate.down()
  await db.migrate.latest()
})
  
afterAll(async function () {
  await db.migrate.down()
  await db.destroy()
})