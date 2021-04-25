import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core'
import { PlantProps } from '../../libs/storage'

import api from '../../services/api'

import { Header } from '../../components/Header'
import { PlantCardPrimary } from '../../components/PlantCardPrimary'
import { EnviromentButton } from '../../components/EnviromentButton'

import colors from '../../styles/colors'
import styles from './styles'
import { usePlant } from '../../context/PlantContext'

export default () => {
  const navigation = useNavigation()

  const { 
    plants,
    enviroments,
    filteredPlants,
    loadingMore,
    setLoadingMore,
    setPage,
    setFilteredPlants,
    fetchPlants
   } = usePlant()
 
  const [enviromentsSelected, setEnviromentsSelected] = useState("all")  

  const handleFetchMore = (distance: number) => {
    if (distance < 1)
      return

    setLoadingMore(true)
    setPage(oldValue => oldValue + 1)
    fetchPlants(api)
  }

  const handleEnviromentSelected = (enviroment: string) => {
    setEnviromentsSelected(enviroment)

    if (enviroment === "all")
      return setFilteredPlants(plants)

    const filtered = plants.filter(plant =>
      plant.environments.includes(enviroment)
    )

    setFilteredPlants(filtered)
  }

  const handlePlantSelect = (plant: PlantProps) => {
    navigation.navigate('PlantSave', { plant })
  }

  useEffect(() => {
    
  })

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === enviromentsSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
        />
      </View>

      <View style={styles.flatListView}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>

    </SafeAreaView>
  )
}