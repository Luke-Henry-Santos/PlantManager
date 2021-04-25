import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, Alert, } from 'react-native'
import { formatDistance } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { useMyPlant } from '../../context/MyPlantsContext'
import { PlantProps } from '../../libs/storage'

import { Header } from '../../components/Header'
import { PlantCardSecondary } from '../../components/PlantCardSecondary'

import waterdrop from '../../assets/waterdrop.png'

import styles from './styles'

export default () => {
  const { myPlants, setMyPlants, plantRemove, loadStoragedData } = useMyPlant()

  const [now, setNow] = useState(new Date())
  const [nextWatered, setNextWatered] = useState<string>()

  useEffect(() => {
    loadStoragedData().then(() => checkDistance(myPlants))
  })

  useEffect(() => {
    setInterval(() => {
      setNow(new Date()); if (myPlants.length > 0) checkDistance(myPlants)
    }, 60000)
  }, [])

  function checkDistance(plantsStoraged: PlantProps[]) {
    let nextTime, index = 0
    if (plantsStoraged.length > 0) {
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
    } else {
      setNextWatered(
        'Não há nenhuma planta para ser regada'
      )
    }
  }

  const handleRemove = (plant: PlantProps) => {
    checkDistance(myPlants)

    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      { text: 'Não', },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await plantRemove(plant.id)

            setMyPlants((oldData) =>
              oldData?.filter((item) => item.id !== plant.id))

          } catch (err) {
            Alert.alert('Não foi possível remover!')
          }
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Image source={waterdrop} style={{ width: 60, height: 60 }} />

        <Text style={styles.warning}>
          {nextWatered}
        </Text>
      </View>

      <View style={{ flex: 1, width: '100%' }}>
        <Text style={styles.title}>Próximas regadas</Text>

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