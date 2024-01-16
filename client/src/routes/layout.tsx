// Desc: Layout for the main page
import { Outlet } from 'react-router-dom';
import NavBar from './navbar';
import Footer from './footer';

const Layout = () => {
  return (
    <>
      <NavBar />
      <div id='main'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
