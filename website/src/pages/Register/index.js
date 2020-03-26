import React from 'react'
import { useFields } from '../../hooks/useFields'  
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft as ArrowLeftIcon } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

import logo from '../../assets/logo.svg'

export default function Register () {
  const [fields, setFields] = useFields({
    name: '',
    email: '',
    whatsapp: '',
    city: '',
    stateABB: ''
  })

  const history = useHistory()

  async function handleRegister (e) {
    e.preventDefault()
    
    try {
      const { data } = await api.post('/ngos', fields)

      alert(`Your access ID is ${data.id}`)
      
      history.push('/', { id: data.id })
      
    } catch (err) {
      alert('Error, please try again.')
    }
  }

  function updateFields ({ target }) {
    setFields(target)
  }

  return (
    <div className="register-container container">
      <div className="content neumorphism">
        <section>
          <img src={logo} alt="Be the Hero logo" />
          
          <h1>Join!</h1>
          <p>Enjoy in it and help people to find your NGOs incidents.</p>

          <Link className="link" to="/">
            <ArrowLeftIcon size={16} color="#E02041" />
            Back to Log in
          </Link>
        </section>
        
        <form onSubmit={handleRegister}>
          <input 
            name="name"
            type="text"
            placeholder="NGO name"
            value={fields.name}
            onChange={updateFields}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="E-mail"
            value={fields.email}
            onChange={updateFields}
            required
          />
          
          <input
            name="whatsapp"
            type="tel"
            placeholder="Whatsapp"
            value={fields.whatsapp}
            onChange={updateFields}
            required
          />

          <div className="input-group">
            <input
              name="city"
              type="text"
              placeholder="City"
              value={fields.city}
              onChange={updateFields}
              required
            />
            
            <input
              name="stateABB"
              type="text"
              placeholder="State ABB"
              value={fields.stateABB}
              onChange={updateFields}
              style={{ width: 115 }}
              required
            />
          </div>

          <button className="button">Join</button>
        </form>
      </div>
    </div>
  )
}