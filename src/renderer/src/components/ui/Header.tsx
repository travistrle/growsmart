import React from 'react'
import { NavLink } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

// Reusable NavLink component for both desktop and mobile
const NavItem = ({
  to,
  children,
  setOpen
}: {
  to: string
  children: React.ReactNode
  setOpen?: (open: boolean) => void
}): React.ReactElement => (
  <NavLink
    to={to}
    onClick={() => setOpen?.(false)}
    className={({ isActive }) =>
      cn(
        'transition-colors hover:text-white',
        isActive ? 'text-white font-semibold' : 'text-white/70'
      )
    }
  >
    {children}
  </NavLink>
)

// Desktop navigation component
const DesktopNav: React.FC = () => (
  <NavigationMenu className="hidden md:flex">
    <NavigationMenuList className="gap-6">
      <NavigationMenuItem>
        <NavItem to="/home">Let&apos;s type!</NavItem>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavItem to="/about">About</NavItem>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
)

// Mobile navigation component
const MobileNav: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="grid gap-6 text-lg font-medium mt-8 ">
          <NavItem to="/" setOpen={setOpen}>
            Home
          </NavItem>
          <NavItem to="/about" setOpen={setOpen}>
            About
          </NavItem>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Main Header component
const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-zinc-800 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-4 flex items-center">
          <NavLink
            to="/"
            className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 text-lg font-bold text-white"
          >
            MyApp 🚀
          </NavLink>
        </div>

        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
