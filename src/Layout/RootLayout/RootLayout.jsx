import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import TopSection from '../Navbar/TopSection';
import AIChatAgent from '../../Ai/AIChatAgent';

const RootLayout = () => {
    return (
        <div>
            <TopSection/>
            <Navbar/>
            <main className='overflow-x-clip'>
                <Outlet/>
            </main>
            <AIChatAgent/>
            <Footer/>
        </div>
    );
};

export default RootLayout;