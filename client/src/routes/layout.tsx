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
          className='flex flex-col justify-between h-dvh w-dvw mx-auto p-3 gap-4 max-w-screen-md'
        >
          <NavBar />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Layout;
