import React, { createContext, ReactNode, useContext, useState } from 'react'
import { loadPlant, PlantProps, removePlant } from '../libs/storage'

interface MyPlantsContextProvider {
  children: ReactNode
}

interface MyPlantsContextData {
  myPlants: PlantProps[]
  setMyPlants: React.Dispatch<React.SetStateAction<PlantProps[]>>
  loadStoragedData: () => Promise<void>
  plantRemove: (id: string) => Promise<void>
}

export const MyPlantsContext = createContext({} as MyPlantsContextData)

export function MyPlantsContextProvider({ children }: MyPlantsContextProvider) {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([])

  async function loadStoragedData() {
    const plantsStoraged = await loadPlant()

    if (plantsStoraged.length > 0)
      return setMyPlants(plantsStoraged)
  }

  async function plantRemove(id: string) { return removePlant(id) }

  return (
    <MyPlantsContext.Provider
      value={{
        myPlants, setMyPlants,
        loadStoragedData,
        plantRemove
      }}>
      {children}
    </MyPlantsContext.Provider>
  )
}

export const useMyPlant = () => {
  return useContext(MyPlantsContext)
}