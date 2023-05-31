import { ROLES } from './constants'

const currentUser = () => {
  const local = localStorage.getItem('camino')

  if (!local) {
    return null
  }

  return JSON.parse(local).user
}

const hasRole = (role) => {
  const user = currentUser()

  if (!user) {
    return false
  }

  return user.userRol === role
}

const isResident = () => hasRole(ROLES.RESIDENT)
const isNormative = () => hasRole(ROLES.NORMATIVE)
const isCoordinator = () => hasRole(ROLES.COORDINATOR)

export { currentUser, isResident, isNormative, isCoordinator }
