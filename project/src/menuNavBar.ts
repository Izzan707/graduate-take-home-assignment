import {
  mdiAccount,
  mdiLogout,
  mdiThemeLightDark,
} from '@mdi/js'
import { MenuNavBarItem } from './interfaces'

const menuNavBar: MenuNavBarItem[] = [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'My Profile',
        href: '/profile',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: 'Log Out',
        isLogout: true,
        href: '/login'
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
]

export default menuNavBar
