import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from '../ui/Header';
import Footer from '../ui/Footer';

const MainLayout: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        
          <Outlet />
       
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

