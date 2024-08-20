import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import EconomicCalendar from './components/Economic_Calendar';
//import EconomicsData from './components/Trading_Economics_Data';



function App() {
    return (
        <ChakraProvider>
            <EconomicCalendar />
        </ChakraProvider>
    );
}

export default App;
