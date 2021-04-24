import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  Alert,
} from 'react-native'
import { Header } from '../components/Header'
import { loadPlant, PlantProps, removePlant } from '../libs/storage'
import { format, formatDistance } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Load } from '../components/Load'

import waterdrop from '../assets/waterdrop.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlantTime, setSelectedPlantTime] = useState(0)
  const [now, setNow] = useState(new Date())

  const [nextWatered, setNextWatered] = useState<string>()

  useEffect(() => {
    async function loadStoragedData() {
      const plantsStoraged = await loadPlant()

      if (plantsStoraged.length == 0) {
        setNextWatered(
          `Não há nenhuma planta para ser regada`
        )
      } else {
        setMyPlants(plantsStoraged)
        checkDistance(plantsStoraged)
      }
      setLoading(false)
    }

    setInterval(() => {
      setNow(new Date())
      if (myPlants.length > 0)
        checkDistance(myPlants)
    }, 60000)

    loadStoragedData()
  }, [])

  function checkDistance(plantsStoraged: PlantProps[]) {
    let nextTime, index = 0
    for (let i = 0; i < plantsStoraged.length; i++) {
      const plantDate = new Date(plantsStoraged[i].dateTimeNotification)
      if (now.getTime() > plantDate.getTime()) {
        plantDate.setDate(plantDate.getDate() + 1)
        nextTime = formatDistance(
          plantDate.getTime(),
          now.getTime(),
          { locale: ptBr }
        )
        index = plantsStoraged.indexOf(plantsStoraged[i])
        break;
      }

      if (i == plantsStoraged.length) {
        const plantDefault = new Date(plantsStoraged[0].dateTimeNotification)
        nextTime = formatDistance(
          plantDefault.getTime(),
          now.getTime(),
          { locale: ptBr }
        )
      }
    }

    setNextWatered(
      `Não esqueça de regar a ${plantsStoraged[index].name} daqui ${nextTime}`
    )
  }

  const handleRemove = (plant: PlantProps) => {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await removePlant(plant.id)

            setMyPlants((oldData) =>
              oldData?.filter((item) => item.id !== plant.id)
            )

            checkDistance(myPlants)

          } catch (err) {
            Alert.alert('Não foi possível remover!')
          }
        }
      }
    ])
  }

  if (loading)
    return <Load />

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
            <PlantCardSecondary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </View>
  )
}