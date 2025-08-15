import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container text-center text-sm text-muted-foreground">
        <p>&copy; {currentYear} MyApp Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
