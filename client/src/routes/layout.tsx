// Desc: Layout for the main page
import { Outlet } from 'react-router-dom';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import { ThemeProvider } from '@/components/theme-provider';

const Layout = () => {
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <div
          id='container'
          className='flex flex-col h-screen w-screen mx-auto p-3 gap-4 overflow-hidden'
        >
          <NavBar />
          <Outlet />
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Layout;
