import React from 'react'
import { useFields } from '../../hooks/useFields'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft as ArrowLeftIcon } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'

import logo from '../../assets/logo.svg'

export default function NewIncident () {
  const [fields, setFields] = useFields({
    title: '',
    description: '',
    amount: ''
  })

  const ngoId = localStorage.getItem('ngoId')
  const history = useHistory()

  async function handleNewIncident (e) {
    e.preventDefault()

    try {
      await api.post('/incidents', fields, {
        headers: {
          Authorization: ngoId 
        }
      })

      history.push('/profile')

    } catch (err) {
      alert('Error, please try to add again.')
    }
  }

  function updateFields ({ target }) {
    setFields(target)
  }

  return (
    <div className="new-incident-container container">
      <div className="content neumorphism">
        <section>
          <img src={logo} alt="Be the Hero logo" />
          
          <h1>Add new incident</h1>

          <p>
            Describe the incident in as much detail as possible
            to find a hero to solve it.
          </p>

          <Link className="link" to="/profile">
            <ArrowLeftIcon size={16} color="#E02041" />
            Back to Profile
          </Link>
        </section>
        
        <form onSubmit={handleNewIncident}>
          <input
            name="title"
            type="text"
            placeholder="Incident title"
            value={fields.title}
            onChange={updateFields}
            required
          />
          
          <textarea
            name="description"
            placeholder="Description"
            value={fields.description}
            onChange={updateFields}
            required
          ></textarea>

          <input
            name="amount"
            type="text"
            placeholder="Amount"
            value={fields.amount}
            onChange={updateFields}
            required
          />

          <button className="button">Add</button>
        </form>
      </div>
    </div>
  )
}