import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

import logo from '../../assets/logo.svg'
import heroesImage from '../../assets/heroes.png'

export default function Login ({ location }) {
  const [id, setId] = useState(location?.state?.id || '')

  const history = useHistory()

  async function handleLogin (e) {
    e.preventDefault()

    try {
      const { data } = await api.post('/sessions', { id })

      localStorage.setItem('ngoId', id)
      localStorage.setItem('ngoName', data.name)

      history.push('/profile')

    } catch (err) {
      alert('Failed to log in, please try again.')
    }
  }

  function updateId ({ target }) {
    setId(target.value)
  }

  return (
    <div className="login-container container">
      <section className="form">
        <img src={logo} alt="Be the Hero logo" />

        <form onSubmit={handleLogin}>
          <h1>Sign in to your account</h1>
          
          <input
            name="login"
            type="text"
            placeholder="Your ID"
            value={id}
            onChange={updateId}
          />

          <button className="button">Sign in</button>

          <Link className="link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            I do not have an account
          </Link>
        </form>
      </section>

      <img src={heroesImage} alt="heroes" />
    </div>
  )
}