import { AiOutlineUser } from 'react-icons/ai'
import { GoChevronDown } from 'react-icons/go'

export function Navbar() {
  return (
    <div className="flex items-center justify-between pt-4">
      <h2 className="text-2xl font-semibold">Gallery App</h2>

      <div className="flex items-center gap-2">
        <div className="grid size-[40px] place-items-center rounded-full border border-gray-400 text-2xl text-gray-600">
          <AiOutlineUser />
        </div>
        <p>Moqueet</p>
        <GoChevronDown className="text-gray-600" />
      </div>
    </div>
  )
}
