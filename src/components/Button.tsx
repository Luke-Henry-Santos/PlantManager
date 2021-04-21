import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ButtonProps extends TouchableOpacityProps {
  title: string
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.green,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      {...rest}
    >
      <Text style={{
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading
      }}>{title}</Text>
    </TouchableOpacity>
  )
}