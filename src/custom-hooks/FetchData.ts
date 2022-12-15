import React, { useState, useEffect } from 'react';
import { serverCalls } from '../api';

export const useGetData = () => {
    const [albumData, setData] = useState<any>([]);
    async function handleDataFetch(){
        const result = await serverCalls.get();
        setData(result)
    };
    useEffect( () => {
        handleDataFetch();
    }, [])
    return {albumData, getData:handleDataFetch}
};

export const useGetExchange = () => {
    const [exchangeData, setData] = useState<any>([]);
    async function handleDataFetch() {
        const result = await serverCalls.getExchange();
        setData(result)
    };
    useEffect( () => {
        handleDataFetch();
    }, [])
    return {exchangeData, getData:handleDataFetch}
};