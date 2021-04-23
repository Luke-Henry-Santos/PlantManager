import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  FlatList
} from 'react-native'
import { Header } from '../components/Header'
import { loadPlant, PlantProps } from '../libs/storage'
import { formatDistance } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import waterdrop from '../assets/waterdrop.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { PlantCardSecondary } from '../components/PlantCardSecondary'

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>()
  const [loading, setLoading] = useState(true)

  const [nextWatered, setNextWatered] = useState<string>()

  useEffect(() => {
    async function loadStoragedData() {
      const plantsStoraged = await loadPlant()

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBr }
      )

      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}`
      )

      setMyPlants(plantsStoraged)
      setLoading(false)
    }

    loadStoragedData()
  }, [])

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 30,
      paddingTop: 50,
      backgroundColor: colors.background
    }}>
      <Header />

      <View style={{
        marginTop: 20,
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>

        <Image
          source={waterdrop}
          style={{
            width: 60,
            height: 60
          }}
        />

        <Text style={{
          flex: 1,
          color: colors.blue,
          paddingHorizontal: 20,
        }}>
          {nextWatered}
        </Text>
      </View>

      <View style={{
        flex: 1,
        width: '100%'
      }}>
        <Text style={{
          fontSize: 24,
          fontFamily: fonts.heading,
          color: colors.heading,
          marginVertical: 20
        }}>Próximas regadas</Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary data={item} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>

    </View>
  )
}