export function Header() {
  return (
    <div className="pt-8">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Photos</div>
        <input className="" type="text" placeholder="Search Image..." />
      </div>

      <div className="flex items-center gap-4 pt-2 text-gray-500">
        <p className="font-semibold text-[#31b666]">Recent</p>
        <p>1 Month Ago</p>
        <p>3 Months Ago</p>
      </div>
    </div>
  )
}
