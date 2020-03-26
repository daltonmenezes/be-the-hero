import { useState } from 'react'

export const useFields = (initalState = {}) => {
  const [fields, setFields] = useState(initalState)

  return [
    fields,
    ({ name, value }) =>
      setFields({ ...fields, [name]: value })
  ]
}