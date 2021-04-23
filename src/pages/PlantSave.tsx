import React, { useState } from 'react'
import {
  Alert,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity
} from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import { useNavigation, useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns'
import { loadPlant, PlantProps, savePlant } from '../libs/storage'

import waterdrop from '../assets/waterdrop.png'
import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Param {
  plant: PlantProps
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')

  const route = useRoute()
  const { plant } = route.params as Param

  const navigation = useNavigation()

  const handleChangeTime = (event: Event, dateTime: Date | undefined) => {
    if (Platform.OS === 'android')
      setShowDatePicker(oldState => !oldState)

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date())
      return Alert.alert("Escolha uma hora no futuro! 🕒")
    }

    if (dateTime)
      setSelectedDateTime(dateTime)
  }

  const handleOpenDateTimeAndroid = () => {
    setShowDatePicker(oldState => !oldState)
  }

  const handleSave = async () => {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      })

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
        buttonTitle: 'Muito Obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      })

    } catch {
      Alert.alert("Não foi possível salvar. 🌱")
    }
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: colors.shape
    }}>
      <View style={{
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
      }}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />
        <Text style={{
          fontFamily: fonts.heading,
          fontSize: 24,
          color: colors.heading,
          marginTop: 15,
        }}>
          {plant.name}
        </Text>
        <Text style={{
          textAlign: 'center',
          fontFamily: fonts.text,
          color: colors.heading,
          fontSize: 17,
          marginTop: 10
        }}>
          {plant.about}
        </Text>
      </View>

      <View style={{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 50,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.blue_light,
          padding: 20,
          borderRadius: 20,
          position: 'relative',
          bottom: '20%'
        }}>
          <Image
            source={waterdrop}
            style={{
              width: 56,
              height: 56
            }}
          />
          <Text style={{
            flex: 1,
            marginLeft: 20,
            fontFamily: fonts.text,
            color: colors.blue,
            fontSize: 17,
            textAlign: 'justify'
          }}>
            {plant.water_tips}
          </Text>
        </View>

        <Text style={{
          textAlign: 'center',
          fontFamily: fonts.complement,
          color: colors.heading,
          fontSize: 12,
          marginBottom: 5
        }}>
          Escolha o melhor horário para ser lembrado:
          </Text>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}

        {
          Platform.OS === 'android' && (
            <TouchableOpacity
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: 40,
              }}
              onPress={handleOpenDateTimeAndroid}
            >
              <Text style={{
                color: colors.heading,
                fontSize: 24,
                fontFamily: fonts.text
              }}>
                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>
          )
        }


        <Button title="Cadastrar planta"
          onPress={handleSave}
        />
      </View>
    </View>
  )
}