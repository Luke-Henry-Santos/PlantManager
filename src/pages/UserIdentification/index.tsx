import React, { useState } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button } from '../../components/Button'

import colors from '../../styles/colors'
import styles from './styles'

export default () => {

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()

  const navigation = useNavigation()

  const handleInputBlur = () => { setIsFocused(false); setIsFilled(!!name) }
  const handleInputFocus = () => setIsFocused(true)

  const handleInputChange = (value: string) => {
    setIsFilled(!!value)
    setName(value)
  }

  async function handleSubmit() {
    if (!name) return Alert.alert('Informe seu nome')

    if (name.length < 3) return Alert.alert('Informe um nome maior')

    await AsyncStorage.setItem('@plantmanager:user', name)
    navigation.navigate('UserImageIdentification')

  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboard}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={{ flex: 1, width: '100%' }}>

            <View style={styles.content}>

              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 44 }}>
                  {isFilled ? '😄' : '😀'}
                </Text>

                <Text style={styles.title}>
                  Como podemos {'\n'} chamar você?
                </Text>
              </View>

              <TextInput
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]}
              />

              <View style={styles.button}>
                <Button title="Continuar" onPress={handleSubmit} />
              </View>

            </View>

          </View>

        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}