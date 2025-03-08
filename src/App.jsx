import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserLayout from './layout/UserLayout'
import Home from './pages/sections/Home'
import DetectPage from './pages/sections/DetectDisease'
import Shop from './pages/sections/Shop'
import ContactPage from './pages/sections/Contact'
import Guide from './pages/sections/Guide'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import { Toaster } from './components/ui/sonner'
import './App.css'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/detect",
          element: <DetectPage />
        },
        {
          path: "/shop",
          element: <Shop />
        },
        {
          path: "/contact",
          element: <ContactPage />
        },
        {
          path: "/guide",
          element: <Guide />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
