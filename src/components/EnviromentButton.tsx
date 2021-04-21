import React from 'react'
import { Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnviromentButtonProps extends RectButtonProps {
  title: string
  active?: boolean
}

export function EnviromentButton({
  title,
  active = false,
  ...rest
}: EnviromentButtonProps) {
  return (
    <RectButton
      style={[
        {
          backgroundColor: colors.shape,
          width: 76,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
          marginHorizontal: 5
        },
        active && {
          backgroundColor: colors.green_light,
        }
      ]}
      {...rest}
    >
      <Text style={[
        {
          fontFamily: fonts.text,
          color: colors.heading,
        },
        active &&{
          fontFamily: fonts.heading,
          color: colors.green_dark,
        }
        ]}>
        {title}
      </Text>
    </RectButton>
  )
}