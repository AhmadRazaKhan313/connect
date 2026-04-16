import jwt from 'jwtservice/jwtService';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { AppContextProvider } from './AppContext';
import moment from 'moment';

function AppContextContainer({ children }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState([]);
    const [smsBalance, setSmsBalance] = useState('');
    const [ispSelected, setIspSelected] = useState('');
    const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'));

    useEffect(() => {
        getSmsBalance();
    }, []);

    const getSmsBalance = async () => {
        jwt.getSmsBalance()
            .then((res) => {
                setSmsBalance((+res?.data?.smsBalance).toFixed(2));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const contextValues = {
        data,
        setData,
        filteredData,
        setFilteredData,
        filters,
        setFilters,
        smsBalance,
        getSmsBalance,
        ispSelected,
        setIspSelected,
        startDate,
        setStartDate,
        endDate,
        setEndDate
    };

    return <AppContextProvider value={contextValues}>{children}</AppContextProvider>;
}

export default AppContextContainer;
