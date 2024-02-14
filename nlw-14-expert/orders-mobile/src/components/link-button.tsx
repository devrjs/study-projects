import { Link, LinkProps } from 'expo-router'

type LinkButtonProps = LinkProps<string> & {
  title: string
}

export function LinkButton({ title, ...rest }: LinkButtonProps) {
  return (
    <Link className="text-center text-base font-bold text-slate-300" {...rest}>
      {title}
    </Link>
  )
}
