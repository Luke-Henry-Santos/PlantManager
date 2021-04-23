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

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function UserIdentification() {

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()

  const navigation = useNavigation()

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!name)
  }
  function handleInputFocus() { setIsFocused(true) }

  function handleInputChange(value: string) {
    setIsFilled(!!value)
    setName(value)
  }

  const handleSubmit = async () => {
    if (!name)
      return Alert.alert('Informe seu nome')

    if (name.length < 3)
      return Alert.alert('Informe um nome maior')

    await AsyncStorage.setItem('@plantmanager:user', name)

    navigation.navigate('UserImageIdentification')

  }

  return (
    <SafeAreaView
      style={{
        flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, width: '100%' }}>

            <View
              style={{
                flex: 1, justifyContent: 'center', alignItems: 'center',
                paddingHorizontal: 54
              }}>

              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 44 }}>{isFilled ? '😄' : '😀'}</Text>

                <Text
                  style={{
                    marginTop: 20, textAlign: 'center',
                    fontSize: 24, lineHeight: 32, fontFamily: fonts.heading,
                    color: colors.heading
                  }}>Como podemos {'\n'} chamar você?</Text>
              </View>

              <TextInput
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
                style={[{
                  borderBottomWidth: 1, borderColor: colors.gray,
                  width: '100%', marginTop: 50, padding: 10,
                  fontSize: 18, color: colors.heading, textAlign: 'center',
                },
                (isFocused || isFilled) && { borderColor: colors.green }
                ]} />

              <View style={{ marginTop: 40, width: '100%', paddingHorizontal: 20 }}>
                <Button
                  title="Continuar"
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}