import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import api from '../services/api'

import { EnviromentButton } from '../components/EnviromentButton'
import { Header } from '../components/Header'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { Load } from '../components/Load'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnviromentProps {
  key: string
  title: string
}

interface PlantProps {
  id: string
  name: string
  about: string
  water_tips: string
  photo: string
  environments: [string]
  frequency: {
    times: number
    repeat_every: string
  }
}

export function PlantSelect() {
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentsSelected, setEnviromentsSelected] = useState("all")
  const [loading, setLoading] = useState(true)

  const [page, setPgae] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loadedAll, setLoadedAll] = useState(false)

  useEffect(() => {
    async function fetchEnviroments() {
      const { data } = await api.get('/plants_environments', {
        params: {
          _sort: 'title',
          _order: 'asc'
        }

      })
      setEnviroments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ])
    }

    fetchEnviroments()
  }, [])

  useEffect(() => {
    fetchPlants()
  }, [])

  async function fetchPlants() {
    const { data } = await api.get('/plants', {
      params: {
        _sort: 'name',
        _order: 'asc',
        _page: page,
        _limit: 8
      }
    })

    if (!data)
      return setLoading(true)

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    } else {
      setPlants(data)
      setFilteredPlants(data)
    }

    setLoading(false)
    setLoadingMore(false)
  }

  const handleFetchMore = (distance: number) => {
    if (distance < 1)
      return

    setLoadingMore(true)
    setPgae(oldValue => oldValue + 1)
    fetchPlants()
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

  if (loading)
    return <Load />

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.background
    }}>
      <View style={{
        paddingHorizontal: 30,
        marginTop: 20
      }}>
        <Header />

        <Text style={{
          fontSize: 17,
          color: colors.heading,
          fontFamily: fonts.heading,
          lineHeight: 20,
          marginTop: 15
        }}>
          Em qual ambiente
        </Text>
        <Text style={{
          fontFamily: fonts.text,
          fontSize: 17,
          lineHeight: 20,
          color: colors.heading
        }}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList
          data={enviroments}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === enviromentsSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            height: 40,
            justifyContent: 'center',
            paddingBottom: 5,
            marginLeft: 32,
            marginVertical: 32
          }}
        />
      </View>

      <View style={{
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
      }}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => (
            <PlantCardPrimary data={item} />
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