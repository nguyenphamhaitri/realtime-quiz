import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Flex } from '@chakra-ui/react';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex overflow="hidden" direction="column" h="100vh" m="0" p="0" gap="0">
      <Header />
      {children}
      <Footer />
    </Flex>
  );
};

export default Layout;
