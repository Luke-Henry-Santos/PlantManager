import React, { useEffect, useState } from 'react'
import { Text, Image, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import profileIcon from '../assets/profile_icon.png'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header() {
  const [userName, setUserName] = useState<string>()
  const [avatar, setAvatar] = useState<string>()

  useEffect(() => {
    async function getInformations() {
      const user = await AsyncStorage.getItem('@plantmanager:user')
      const avatar = await AsyncStorage.getItem('@plantmanager:avatar')
      setUserName(user || '')
      setAvatar(avatar || '')
    }

    getInformations()
  }, [])

  return (
    <View style={{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <View>
        <Text
          style={{ fontSize: 32, color: colors.heading, fontFamily: fonts.text }}>
          Olá,
        </Text>
        <Text
          style={{ fontSize: 32, color: colors.heading, fontFamily: fonts.heading, lineHeight: 40 }}>
          {userName}
        </Text>
      </View>
      {!avatar ? (
        <Image
          source={profileIcon}
          style={{ width: 70, height: 70, borderRadius: 35, }} />
      ) : (
        <Image
          source={{ uri: avatar }}
          style={{ width: 70, height: 70, borderRadius: 35, }} />
      )}


    </View>
  )
}