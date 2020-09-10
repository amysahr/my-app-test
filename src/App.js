import React, { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";

function App() {
  const [input, setInput] = useState(0); //input number from textbox
  const [showPercent, setShowPercent] = useState(0); //percentage of number between 0-1000
  const [bgColor, setBgColor] = useState("#EF5F3C"); //background color with default value "orange"
  const [tagVisibility, setTagVisibility] = useState(false); //it is boolean state for handling visiblity
  const inputRef = React.createRef(); //reference to the input element in DOM

  // This function handles click button in submit form.
  // Following Items should change after clicking on submit button:
  // 1. Prevent form from being submited
  // 2. Check the user's input whether it is a well-formed number(not being float or string or negetive)
  // 3. if condition is not true show relevant message

  function handleSubmit(event) {
    event.preventDefault();
    const userInput = parseFloat(inputRef.current.value);
    if (isInt(userInput)) {
      const newInput = userInput + input;
      setInput(newInput);
      let percentage = (parseInt(newInput) * 100) / 1000;
      let backgroundColor = percentage >= 100 ? "#1CBC2C" : "#EF5F3C";
      setTagVisibility(true);
      setShowPercent(percentage);
      setBgColor(backgroundColor);
      inputRef.current.value = "";
      if (userInput >= 1000 || newInput >= 1000) {
        alert("WOW, It's reached 1000$, Congratulations! ");
      }
    } else alert("Please input the right number!");
  }

  function isInt(value) {
    var x;
    if (isNaN(value)) {
      return false;
    }
    if (parseInt(value) <= 0) {
      return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
  }

  // This method handle <a> tag's onClick
  function handleClose() {
    setTagVisibility(false);
  }

  App.propTypes = {
    input: PropTypes.number.isRequired,
  };

  return (
    <div className="container">
      <h2>The fundraising widget</h2>

      <div className="tooltip">
        <strong id="fundraise_remainingText">{showPercent}%</strong> of the goal
        funded
      </div>

      <div className="boxFrame">
        <div className="progressBar_container">
          <div
            className="progressBar_bar inProgress"
            id="fundraise_progressBar"
            style={{ width: showPercent + "%", backgroundColor: bgColor }}
          ></div>
        </div>

        <div className="boxFrame_content">
          <p>
            Only 3 days left to fund this project,{" "}
            <strong id="fundraise_currentFundingText">${input}</strong> has been
            raised towards the goal to raise{" "}
            <strong id="fundraise_goalText">$1000</strong>.
          </p>
          <p>
            Pledge money by entering the sum in the field below and press
            pledge, we already know your credit card details.
          </p>
          <form
            style={{ visibility: tagVisibility ? "hidden" : null }}
            id="fundraise_form"
          >
            <input
              ref={inputRef}
              id="fundraise_amount"
              type="text"
              value={input.input}
              name="input"
            />
            <input
              type="submit"
              id="fundraise_pledgeButton"
              name="Pledge"
              value="Pledge"
              onClick={(event) => handleSubmit(event)}
            />
          </form>

          <div
            style={{ visibility: tagVisibility ? null : "hidden" }}
            className="notification notification-success"
          >
            Thank you for your pledge!
            <a href="#" onClick={handleClose}>
              Close
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
