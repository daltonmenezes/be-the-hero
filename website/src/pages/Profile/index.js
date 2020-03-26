import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import { 
  FiPower as LogoutIcon,
  FiTrash2 as TrashIcon,
  FiEdit as EditIcon
} from 'react-icons/fi'

import './styles.css'

import logo from '../../assets/logo.svg'

export default function Profile () {
  const [incidents, setIncidents] = useState([])

  const ngoId = localStorage.getItem('ngoId')
  const ngoName = localStorage.getItem('ngoName')

  const history = useHistory()

  useEffect(() => {
    (async () => {
      const { data } =
        await api.get('/profile', {
          headers: {
            Authorization: ngoId
          }
        })
      
      setIncidents(data)
    })()
  }, [ngoId])

  function handleIncidentUpdate (id) {
    const incident =
      incidents.find(incident =>
        incident.id === id
      )
    
    history.push('/incidents/edit', { incident })
  }

  async function handleIncidentDeletion (id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ngoId
        }
      })

      setIncidents(
        incidents.filter(incident =>
          incident.id !== id
        )
      )

    } catch (err) {
      alert('Deletion error, please try again.')
    }
  }

  function handleLogout () {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container container">
      <header>
        <img src={logo} alt="Be the Hero logo" />
        <span>Welcome, {ngoName}</span>

        <Link className="button" to="/incidents/new">
          Add new incident
        </Link>

        <button onClick={handleLogout}>
          <LogoutIcon size={18} color="#E02041" />
        </button>
      </header>

      <h1>Registered Incidents</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id} className="neumorphism">
            <strong>Incident</strong>
            <p>{incident.title}</p>

            <strong>Description:</strong>
            <p>{incident.description}</p>
            
            <strong>Amount:</strong>
            <p>
            {
              Intl.NumberFormat(navigator.language, {
                style: 'currency',
                currency: 'USD'
              }).format(incident.amount)
            }
            </p>

            <section className="actions">  
              <button onClick={() => handleIncidentUpdate(incident.id)}>
                <EditIcon size={20} color="#a8a8b3"/>
              </button>

              <button onClick={() => handleIncidentDeletion(incident.id)}>
                <TrashIcon size={20} color="#a8a8b3"/>
              </button>
            </section>
          </li>
        ))}
      </ul>
    </div>
  )
}