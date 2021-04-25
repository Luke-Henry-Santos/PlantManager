import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/core'

import { Button } from '../../components/Button'

import styles from './styles'

interface Params {
  title: string
  subtitle: string
  buttonTitle: string
  icon: 'smile' | 'hug',
  nextScreen: string
}

const emojis = {
  hug: '🤗',
  smile: '😁'
}

export default () => {
  const navigation = useNavigation()
  const routes = useRoute()

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen
  } = routes.params as Params

  const handleMoveOn = () => navigation.navigate(nextScreen)

  return (
    <SafeAreaView style={styles.scrollContainer}>
      <View style={styles.container}>

        <Text style={{ fontSize: 72 }}>
          {emojis[icon]}
        </Text>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.buttonView}>
          <Button title={buttonTitle} onPress={handleMoveOn} />
        </View>

      </View>
    </SafeAreaView>
  )
}