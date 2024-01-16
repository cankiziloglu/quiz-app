// Desc: Layout for the main page
import { Outlet } from 'react-router-dom';
import NavBar from './navbar';
import Footer from './footer';
import { ThemeProvider } from '@/components/theme-provider';

const Layout = () => {
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <div id="container" className="h-dvh mx-auto p-3 w-auto">
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
