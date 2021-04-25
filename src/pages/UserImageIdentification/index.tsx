import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, TouchableOpacity, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/core'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button } from '../../components/Button'

import colors from '../../styles/colors'
import styles from './styles'

export default () => {
  const navigation = useNavigation()
  const [avatar, setAvatar] = useState<string>('')

  useEffect(() => { requestCameraPermission() }, [])

  async function requestCameraPermission() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted')
      alert('Sorry, we need camera roll permissions to make this work!');

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
      nextScreen: 'Preload'
    })
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, width: '100%' }}>

        <View style={styles.content}>

          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 44 }}>{avatar != '' ? '😄' : '😀'}</Text>

            <Text style={styles.title}>
              Gostaria de {'\n'} inserir um avatar?
            </Text>
          </View>

          <TouchableOpacity
            style={styles.selectImageButton}
            onPress={pickImage}
          >
            {avatar != '' ? (
              <Image
                source={{ uri: avatar }}
                style={{ width: '100%', height: '100%', borderRadius: 100 }}
              />
            ) : (
              <Feather
                name="camera"
                style={{ fontSize: 35, color: colors.white }}
              />
            )}
          </TouchableOpacity>

          <View style={styles.button}>
            <Button title="Confirmar" onPress={handleSubmit} />
          </View>

        </View>

      </View>
    </SafeAreaView>
  )
}