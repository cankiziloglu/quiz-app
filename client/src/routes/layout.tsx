// Desc: Layout for the main page
import { Outlet } from 'react-router-dom';
import NavBar from './navbar';
import Footer from './footer';
import { ThemeProvider } from '@/components/theme-provider';

const Layout = () => {
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <NavBar />
        <div id='main'>
          <Outlet />
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Layout;
