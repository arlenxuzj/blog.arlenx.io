import React from 'react';

import { ScrollToTop } from '../Button';
import Footer from '../Footer';
import Header from '../Header';

export interface LayoutWrapperProps {
  showHeaderProgressBar?: boolean;
  children: React.ReactNode;
}

const LayoutWrapper = (props: LayoutWrapperProps) => {
  const { children, showHeaderProgressBar } = props;

  return (
    <>
      <Header showProgressBar={showHeaderProgressBar} />
      {children}
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default LayoutWrapper;
