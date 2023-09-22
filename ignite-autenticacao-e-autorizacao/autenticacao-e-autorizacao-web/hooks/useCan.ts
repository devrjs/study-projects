import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { validateUserPermitons } from "../utils/validateUserPermitions"

type UseCanParams = {
  permissions?: string[]
  roles?: string[]
}

export function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return false
  }

  const userHasValidPermissions = validateUserPermitons({
    user,
    permissions,
    roles,
  })

  return userHasValidPermissions
}
