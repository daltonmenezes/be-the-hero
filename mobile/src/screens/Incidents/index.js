import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import formatAmount from '../../utils/formatAmount'
import api from '../../services/api'

import { 
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'

import logo from '../../assets/logo.png'

import styles from './styles'

export default function Incidents () {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  async function loadIncidents () {
    const isLastPage = total > 0 && incidents.length === total

    if (loading)
        return
    
    if (isLastPage)
        return
    
    setLoading(true)

    const { data, headers } =
      await api.get('/incidents', {
        params: { page }
      })
    
    setIncidents([...incidents, ...data])
    setTotal(headers['x-total-count'])
    setPage(page + 1)
    setLoading(false)
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  function navigateToDetail (incident) {
    navigation.navigate('Detail', { incident })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.headerText}>
          Total of <Text style={styles.headerTextBold}>{total} incidents</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.description}>Choose an incident to fund and become a hero!</Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.3}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>NGO:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
            
            <Text style={styles.incidentProperty}>Incident:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            
            <Text style={styles.incidentProperty}>Amount:</Text>
            <Text style={styles.incidentValue}>
              {formatAmount(incident.amount)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>See more details</Text>

              <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}