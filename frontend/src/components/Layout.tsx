import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <Flex overflow="hidden" direction="column" h="100vh" m="0" p="0" gap="0">
      <Header />
      <Outlet />
      <Footer />
    </Flex>
  );
};

export default Layout;
