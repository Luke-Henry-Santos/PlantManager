import React from 'react'
import {
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  View
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'

import wateringImg from '../assets/watering.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Welcome() {
  const navigation = useNavigation()

  const handleStart = () => navigation.navigate('UserIdentification')

  return (
    <SafeAreaView style={{ flex: 1, }}>

      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
      }}>
        <Text
          style={{
            fontFamily: fonts.heading,
            lineHeight: 34,
            fontSize: 28,
            fontWeight: 'bold',
            textAlign: 'center',
            color: colors.heading,
            marginTop: 30
          }}>
          Gerencie {'\n'} suas plantas de {'\n'} forma fácil
      </Text>

        <Image source={wateringImg} style={{ height: Dimensions.get('window').width * 0.7 }} />

        <Text style={{
          textAlign: 'center',
          fontSize: 18,
          paddingHorizontal: 20,
          color: colors.heading,
          fontFamily: fonts.text,
        }}>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleStart}
          style={{
            backgroundColor: colors.green,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16,
            marginBottom: 30,
            height: 56,
            width: 56,
          }}>

          <Feather name="chevron-right"
            style={{ fontSize: 28, color: colors.white }}
          />

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}