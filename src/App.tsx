import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { PantryScreen } from './components/PantryScreen';
import { ProfileScreen } from './components/ProfileScreen';

type Tab = 'home' | 'pantry' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'pantry' && <PantryScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          <button onClick={() => setActiveTab('home')}>Home</button>
          <button onClick={() => setActiveTab('pantry')}>Pantry</button>
          <button onClick={() => setActiveTab('profile')}>Profile</button>
        </div>
      </div>
    </div>
  );
}