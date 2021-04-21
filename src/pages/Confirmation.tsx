import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Confirmation() {
  return (
    <SafeAreaView style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around'
    }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30 
      }}
      >
        <Text style={{ fontSize: 72 }}>
          😁
        </Text>

        <Text style={{
          fontSize: 22,
          fontFamily: fonts.heading,
          textAlign: 'center',
          color: colors.heading,
          lineHeight: 38,
          marginTop: 15
        }}> Prontinho</Text>

        <Text style={{
          fontFamily: fonts.text,
          textAlign: 'center',
          fontSize: 17,
          paddingVertical: 10,
          color: colors.heading,
        }}> Agora vamos começar a cuidar das suas plantinhas com muito cuidado.</Text>

        <View style={{
          width: '100%',
          paddingHorizontal: 50,
          marginTop: 20
        }}>
          <Button 
            title="Começar"
          />
        </View>

      </View>

    </SafeAreaView>
  )
}