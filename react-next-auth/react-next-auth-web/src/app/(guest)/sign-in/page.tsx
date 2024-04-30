import { Metadata } from 'next'
import { UserAuthForm } from './_components/user-auth-form'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
}

export default function AuthenticationPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center md:grid lg:grid-cols-2">
      <div className="relative hidden h-full bg-[hsl(250_10%_8%)] p-10 text-muted-foreground dark:border-r lg:flex lg:flex-col">
        <div className="absolute inset-0 bg-[url(../assets/country.svg)] bg-cover bg-center bg-no-repeat" />
        {/* <div className="relative z-20 flex items-center text-lg font-medium">
          Logo
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Essa biblioteca me economizou inúmeras horas de trabalho e
              me ajudou a entregar designs impressionantes aos meus clientes com
              mais rapidez do que nunca.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div> */}
      </div>
      <div className="mx-auto flex h-full w-full flex-col justify-center space-y-6 border bg-[hsl(250_10%_8%)] px-12 py-7 shadow sm:h-fit sm:w-96 sm:rounded-3xl">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
          <p className="text-sm text-muted-foreground">
            Digite seu e-mail abaixo para entrar
          </p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  )
}
