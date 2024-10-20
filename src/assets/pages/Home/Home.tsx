import React from 'react';
import OderCharts from "./components/OderCharts.tsx";
import UserCount from "./components/UserCount.tsx";

const Home: React.FC = () => {
    return (

        <>
            <UserCount/>
            <OderCharts/>
        </>
    )
}
export default Home