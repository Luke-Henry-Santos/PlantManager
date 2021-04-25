import { AxiosInstance } from 'axios';
import React, { createContext, ReactNode, useContext, useState } from 'react'
import { PlantProps } from '../libs/storage'

interface EnviromentProps {
  key: string
  title: string
}

interface PlantContextProvider {
  children: ReactNode
}

interface PlantContextData {
  enviroments: EnviromentProps[]
  setEnviroments: React.Dispatch<React.SetStateAction<EnviromentProps[]>>
  plants: PlantProps[]
  setPlants: React.Dispatch<React.SetStateAction<PlantProps[]>>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  filteredPlants: PlantProps[]
  setFilteredPlants: React.Dispatch<React.SetStateAction<PlantProps[]>>
  loadingMore: boolean
  setLoadingMore: React.Dispatch<React.SetStateAction<boolean>>

  fetchEnviroments: (api: AxiosInstance) => Promise<void>
  fetchPlants: (api: AxiosInstance) => Promise<void>
}

export const PlantContext = createContext({} as PlantContextData)

export function PlantContextProvider({ children }: PlantContextProvider) {
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [plants, setPlants] = useState<PlantProps[]>([]);

  const fetchEnviroments = async (api: AxiosInstance) => {
    const { data } = await api.get('/plants_environments',
      { params: { _sort: 'title', _order: 'asc' } })

    setEnviroments([
      { key: 'all', title: 'Todos', },
      ...data
    ])
  }

  const fetchPlants = async (api: AxiosInstance) => {
    const { data } = await api.get('/plants', {
      params: { _sort: 'name', _order: 'asc', _page: page, _limit: 8 }
    })
  
    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    } else {
      setPlants(data)
      setFilteredPlants(data)
    }
  
    setLoadingMore(false)
  }
  
  return (
    <PlantContext.Provider
      value={{
        enviroments, setEnviroments,
        filteredPlants, setFilteredPlants,
        page, setPage,
        plants, setPlants,
        loadingMore, setLoadingMore,
        fetchEnviroments,
        fetchPlants
      }}>
      {children}
    </PlantContext.Provider>
  )
}

export const usePlant = () => {
  return useContext(PlantContext)
}