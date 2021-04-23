import React from 'react'
import { Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface PlantProps extends RectButtonProps {
  data: {
    name: string
    photo: string
    hour: string
  }
}

export function PlantCardSecondary({ data, ...rest }: PlantProps) {
  return (
    <RectButton
      style={{
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5
      }}
      {...rest}
    >
      <SvgFromUri uri={data.photo} width={50} height={50} />
      <Text style={{
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading
      }}>
        {data.name}
      </Text>
      <View style={{
        alignItems: 'flex-end'
      }}>
        <Text style={{
          fontSize: 16,
          fontFamily: fonts.text,
          color: colors.body_light
        }}>
          Regar às</Text>
        <Text style={{
          marginTop: 5,
          fontSize: 16,
          fontFamily: fonts.heading,
          color: colors.body_dark
        }}>
          {data.hour}
        </Text>
      </View>
    </RectButton>
  )
}