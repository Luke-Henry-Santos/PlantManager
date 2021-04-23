import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function UserImageIdentification() {
  const [avatar, setAvatar] = useState<string>('')

  const navigation = useNavigation()

  useEffect(() => {
    requestCameraPermission()
  }, [])

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
    return status
  }

  const pickImage = async () => {
    const status = await requestCameraPermission()

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });

      if (!result.cancelled)
        setAvatar(result.uri);
    }

  }

  const handleSubmit = async () => {

    await AsyncStorage.setItem('@plantmanager:avatar', avatar)

    navigation.navigate('Confirmation', {
      title: 'Prontinho',
      subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
      buttonTitle: 'Começar',
      icon: 'smile',
      nextScreen: 'PlantSelect'
    })
  }


  return (
    <SafeAreaView
      style={{
        flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'
      }}>
      <View style={{ flex: 1, width: '100%' }}>

        <View
          style={{
            flex: 1, justifyContent: 'center', alignItems: 'center',
            paddingHorizontal: 54
          }}>

          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 44 }}>{avatar != '' ? '😄' : '😀'}</Text>

            <Text
              style={{
                marginTop: 20, textAlign: 'center',
                fontSize: 24, lineHeight: 32, fontFamily: fonts.heading,
                color: colors.heading
              }}>Gostaria de {'\n'} inserir um avatar?</Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.green,
              width: 100,
              height: 100,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20
            }}
            onPress={pickImage}
          >
            {avatar != '' ? (
              <Image source={{uri: avatar}} style={{width: '100%', height: '100%', borderRadius: 100}} />
            ) : (
              <Feather name="camera"
                style={{ fontSize: 35, color: colors.white }}
              />
            )}
          </TouchableOpacity>

          <View style={{ marginTop: 40, width: '100%', paddingHorizontal: 20 }}>
            <Button
              title="Confirmar"
              onPress={handleSubmit}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}