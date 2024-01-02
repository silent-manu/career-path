import Header from "./components/Header.jsx";
import Results from "./components/Results.jsx";
import UserInput from "./components/UserInput.jsx";

import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const isValidInput = userInput.initialInvestment > 0 && userInput.annualInvestment > 0 && userInput.expectedReturn > 0 && userInput.duration > 0;

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: parseInt(newValue, 10), //+newValue
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput onChangeInput={handleChange} userInput={userInput} />
      {isValidInput && <Results userInput={userInput} />}
      {!isValidInput && <p className="center">Please enter valid input data</p>}
    </>
  );
}

export default App;
