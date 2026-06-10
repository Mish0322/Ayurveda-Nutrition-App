import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { OnboardingModal } from './components/OnboardingModal'
import { AppDataProvider } from './context/AppDataContext'
import { Home } from './pages/Home'
import { PantryHelper } from './pages/PantryHelper'
import { Profile } from './pages/Profile'

export default function App() {
  return (
    <AppDataProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-stone-100 text-stone-900">
          <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col">
            <Navbar />
            <main className="flex-1 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pantry" element={<PantryHelper />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
          <OnboardingModal />
        </div>
      </BrowserRouter>
    </AppDataProvider>
  )
}
