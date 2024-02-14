import clsx from 'clsx'
import { Pressable, PressableProps, Text } from 'react-native'

type CategoryProps = PressableProps & {
  title: string
  isSelected?: boolean
}

export function CategoryButton({ title, isSelected, ...rest }: CategoryProps) {
  return (
    <Pressable
      className={clsx(
        'h-10 justify-center rounded-md bg-slate-800 px-4',
        isSelected && 'border-2 border-lime-300',
      )}
      {...rest}
    >
      <Text className="font-subtitle text-sm text-slate-100">{title}</Text>
    </Pressable>
  )
}
