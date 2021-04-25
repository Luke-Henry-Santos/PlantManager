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

import { PlantProps, savePlant } from '../../libs/storage'

import waterdrop from '../../assets/waterdrop.png'
import { Button } from '../../components/Button'

import styles from './styles'

interface Param { plant: PlantProps }

export default () => {
  const navigation = useNavigation()
  const route = useRoute()

  const { plant } = route.params as Param

  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')

  const handleChangeTime = (event: Event, dateTime: Date | undefined) => {
    if (Platform.OS === 'android') setShowDatePicker(oldState => !oldState)

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date())
      return Alert.alert("Escolha uma hora no futuro! 🕒")
    }

    if (dateTime) setSelectedDateTime(dateTime)
  }

  const handleOpenDateTimeAndroid = () => setShowDatePicker(oldState => !oldState)

  const handleSave = async () => {
    try {
      await savePlant({ ...plant, dateTimeNotification: selectedDateTime })

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
        buttonTitle: 'Muito Obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      })

    } catch { Alert.alert("Não foi possível salvar. 🌱") }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
    >
      <View style={styles.safeContainer}>

        <View style={styles.container}>
          <SvgFromUri uri={plant.photo} height={150} width={150} />
          <Text style={styles.name}>{plant.name}</Text>
          <Text style={styles.about}>{plant.about}</Text>
        </View>

        <View style={styles.content}>

          <View style={styles.header}>
            <Image source={waterdrop} style={{ width: 56, height: 56 }} />
            <Text style={styles.waterTips}>{plant.water_tips}</Text>
          </View>

          <Text style={styles.title}>
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

          {Platform.OS === 'android' && (
            <TouchableOpacity
              style={styles.androidDatePickerButton}
              onPress={handleOpenDateTimeAndroid}>

              <Text style={styles.androidDatePickerButtonText}>
                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>
          )}

          <Button title="Cadastrar planta"
            onPress={handleSave}
          />
        </View>

      </View>
    </ScrollView>
  )
}