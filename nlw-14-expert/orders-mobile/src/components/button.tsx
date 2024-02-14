import { ReactNode } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode
}

type ButtonTextProps = {
  children: ReactNode
}

type ButtonIconProps = {
  children: ReactNode
}

function Button({ children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.7}
      className="h-12 flex-row items-center justify-center rounded-md bg-lime-400"
    >
      {children}
    </TouchableOpacity>
  )
}

function ButtonText({ children }: ButtonTextProps) {
  return (
    <Text className="mx-2 font-heading text-base text-black">{children}</Text>
  )
}

function ButtonIcon({ children }: ButtonIconProps) {
  return children
}

Button.Text = ButtonText
Button.Icon = ButtonIcon

export { Button }
