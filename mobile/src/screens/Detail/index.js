import React from 'react'

import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native'

import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import formatAmount from '../../utils/formatAmount'
import * as MailComposer from 'expo-mail-composer'

import styles from './styles'

import logo from '../../assets/logo.png'

export default function Detail () {
  const navigation = useNavigation()
  const route = useRoute()

  const { incident } = route.params
  const formatedAmount = formatAmount(incident.amount)
  const message = `Hello ${incident.name}, I'm here to help you with the ${incident.title} incident with ${formatedAmount}.`
  
  function navigateBack () {
    navigation.goBack()
  }

  function sendMail () {
    MailComposer.composeAsync({
      subject: `Hero of the incident: ${incident.title}`,
      recipients: [incident.email],
      body: message
    })
  }

  function sendWhatsApp () {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        
        <TouchableOpacity  onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>NGO:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} from {incident.city}, {incident.stateABB}
        </Text>
        
        <Text style={styles.incidentProperty}>Incident:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>
        
        <Text style={styles.incidentProperty}>Amount:</Text>
        <Text style={styles.incidentValue}>{formatedAmount}</Text>            
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Become the hero of this incident.</Text>
        
        
        <Text style={styles.heroDescription}>Get it touch:</Text>
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}