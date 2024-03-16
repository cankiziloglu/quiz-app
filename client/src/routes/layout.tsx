// Desc: Layout for the main page
import { Outlet } from 'react-router-dom';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import { ThemeProvider } from '@/context/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const Layout = () => {
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <div
          id='container'
          className='flex flex-col h-screen w-screen mx-auto p-3 gap-4 overflow-hidden max-w-screen-lg'
        >
          <NavBar />
          <main className='overflow-auto w-full h-full'>
            <Outlet />
          </main>
          <Toaster />
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Layout;
