const generateId = require('../../src/utils/generateId')

describe('Generate id', () => {
  it('should generate an id', () => {
    const id = generateId(4)
    
    expect(id).toHaveLength(8)
  })
})