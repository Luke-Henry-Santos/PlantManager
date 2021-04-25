import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Load } from '../components/Load'
import { usePlant } from '../context/PlantContext'

import api from '../services/api'

export function Preload() {
  const navigation = useNavigation()
  const { fetchEnviroments, fetchPlants } = usePlant()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEnviroments(api)
    fetchPlants(api).then(() => setLoading(false))
  }, [])

  if (loading == false)
    navigation.navigate('AuthRoutes')

  return <Load />
}