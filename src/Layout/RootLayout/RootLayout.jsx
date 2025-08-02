import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar/>
            <main className='overflow-x-clip'>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default RootLayout;