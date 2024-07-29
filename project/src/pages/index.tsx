import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { useAppDispatch } from '../stores/hooks'
import { setDarkMode } from '../stores/darkModeSlice'

const StyleSelectPage = () => {
  const dispatch = useAppDispatch()

  dispatch(setDarkMode(false))

  const router = useRouter()

  // Set default style
  React.useEffect(() => {
    document.documentElement.classList.add('style-basic')
      router.push('/login')
  }, [])

  return 
}


export default StyleSelectPage
