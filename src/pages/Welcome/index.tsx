import React from 'react'
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'

import wateringImg from '../../assets/watering.png'

import colors from '../../styles/colors'
import styles from './styles'

export default () => {
  const navigation = useNavigation()

  const handleVerification = async () => {
    const user = await AsyncStorage.getItem('@plantmanager:user')
    if (!user)
      navigation.navigate('UserIdentification')

    navigation.navigate('Preload')
  }

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View style={styles.container}>

        <Text style={styles.title}>
          Gerencie {'\n'} suas plantas de {'\n'} forma fácil
        </Text>

        <Image
          source={wateringImg}
          style={{ height: Dimensions.get('window').width * 0.7 }}
        />

        <Text style={styles.description}>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleVerification}
          style={styles.button}>

          <Feather
            name="chevron-right"
            style={{ fontSize: 28, color: colors.white }}
          />

        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}