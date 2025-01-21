import {useEffect, useState} from 'react' 

function UseCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const currencyUrl = `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`;

    useEffect(() => {
        const asyncFun = async () => {
            const response = await fetch(currencyUrl);
            const jsonData = await response.json();
            setData(jsonData[currency]);
        }
        asyncFun();
        
    }, [currency])

    return data;
}

export default UseCurrencyInfo