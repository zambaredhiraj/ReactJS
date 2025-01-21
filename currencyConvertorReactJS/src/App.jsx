import { useEffect, useState } from 'react'
import UseCurrencyInfo from './hooks/currencyInfo'
import InputBox from './components/InputBox';

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTO] = useState("inr");
  const useCurrencyInfo = UseCurrencyInfo(from);
  let options = Object.keys(useCurrencyInfo)
  const [convertedAmount, setConvertedAmount] = useState(0);

  const convert = () => {
    setConvertedAmount(useCurrencyInfo[to]* amount);
  }

  const swap = () => {
    setFrom(to);
    setTO(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  }

  useEffect(() => {
    if (useCurrencyInfo[to] && !isNaN(amount)) {
      setConvertedAmount(useCurrencyInfo[to] * amount);
    } else {
      setConvertedAmount(0);
    }
  }, [useCurrencyInfo, to]);


  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/26743048/pexels-photo-26743048/free-photo-of-stock-charts-on-tablet-screen-business-and-economy.jpeg?auto=compress&cs=tinysrgb&w=1200')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();  
              convert()          
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount = {amount}
                onAmountChange = {(amount) => setAmount(amount)}
                onCurrencyChange = {(currency) => setFrom(currency)}  
                currencyOptions = {options} 
                selectCurrency = {from}              
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                onClick={swap}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"                 
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount = {convertedAmount}
                onAmountChange = {(convertedAmount) => setConvertedAmount(convertedAmount)}
                onCurrencyChange = {(currency) => setTO(currency)}  
                currencyOptions = {options} 
                selectCurrency = {to}
                amountDisable    
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
