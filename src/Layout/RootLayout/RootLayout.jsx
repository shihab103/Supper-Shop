import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import TopSection from '../Navbar/TopSection';

const RootLayout = () => {
    return (
        <div>
            <TopSection/>
            <Navbar/>
            <main className='overflow-x-clip'>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default RootLayout;