import Image from 'next/image'
import logoImg from '../assets/logo.svg'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import { api } from '@/lib/axios'
import { CreatePoolForm } from '@/components/createPoolForm'

export default async function Home() {
  const [
    {
      data: { count: poolCount },
    },
    {
      data: { count: guessCount },
    },
    {
      data: { count: userCount },
    },
  ] = await Promise.all([
    api.get('pools/count').catch(() => {
      return { data: { count: 'N/A' } }
    }),

    api.get('guesses/count').catch(() => {
      return { data: { count: 'N/A' } }
    }),

    api.get('users/count').catch(() => {
      return { data: { count: 'N/A' } }
    }),
  ])

  return (
    <div className="mx-auto grid h-screen max-w-[1124px] grid-cols-2 items-center gap-28">
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className="mt-14 text-5xl font-bold leading-tight text-white">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="" quality={100} />

          <strong className="text-xl text-gray-100">
            <span className="text-ignite-500">+{userCount}</span> pessoas já
            estão usando
          </strong>
        </div>

        <CreatePoolForm />

        <p className="mt-4 text-sm leading-relaxed text-gray-300">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 flex justify-between border-t border-gray-600 pt-10 text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{poolCount}</span>
              <span>Bolões criados </span>
            </div>
          </div>

          <div className="h-14 w-px bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">+{guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
        quality={100}
        priority
      />
    </div>
  )
}
