import React from 'react'
import { Text, Image, View } from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header() {
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
          Lucas
        </Text>
      </View>

      <Image
        source={{ uri: 'https://avatars.githubusercontent.com/u/40127977?v=4' }}
        style={{ width: 70, height: 70, borderRadius: 35, }} />

    </View>
  )
}