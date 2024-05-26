export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-y-4">
      <nav>This is a shared navibar for dashboard segment</nav>
      {children}
    </div>
  )
}
