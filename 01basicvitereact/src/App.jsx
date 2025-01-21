import { useState } from "react"

function App() {
  let [counter, setCounter] = useState(10);

  const [msg, updateMsg] = useState(`Counter value: ${counter}`);

  const addValue = () => {
    if (counter<=19) {
      counter++;
      setCounter(counter);
      updateMsg(`Counter value: ${counter}`)
    }
    else {
      updateMsg(`Add Value can be added only till 20`);
    }
  }

  const removeValue = () => {
    if (counter>=1) {
      counter--;
      setCounter(counter);
      updateMsg(`Counter value: ${counter}`)
    }
    else {
      updateMsg(`Remove Value can be removed only till 0`);
    }
  }

  return (
    <>
    <h1>Hello Dhiraj!</h1>
    <h3>Counter Value: {counter}</h3>
    <br/>
    <br/>
    <button onClick={addValue}>Add Value</button>
    <br/>
    <br/>
    <button onClick={removeValue}>Remove Value</button>
    <br/>
    <br/>
    <p>{msg}</p>
    </>
  )
}

export default App
