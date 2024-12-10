import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="page-container">
      <Header />
      <main className="content-wrap">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;