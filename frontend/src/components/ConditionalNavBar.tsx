'use client'

import { usePathname } from 'next/navigation'
import NavBar from './NavBar/NavBar'

const ConditionalNavBar = () => {
  const pathname = usePathname()
  
  // Define pages where you DON'T want the navbar to show
  const pagesWithoutNavbar = [
    '/' // Only the root login page
    // Add more paths as needed
  ]
  
  // Check if current page should hide navbar
  const shouldHideNavbar = pagesWithoutNavbar.includes(pathname)
  
  // Don't render navbar on excluded pages
  if (shouldHideNavbar) {
    return null
  }
  
  return <NavBar />
}

export default ConditionalNavBar
