import React, { useEffect, useState } from "react";
import "./ExpenseForm.css";

const defaultValues = {
  enteredTitle: "",
  enteredDate: "",
  enteredAmount: "",
};

const ExpenseForm = (props) => {
  const [userInput, setUserInput] = useState(defaultValues);

  const changeValuesHandler = (key) => {
    return (e) => {
      setUserInput((prevState) => {
        return {
          ...prevState,
          [key]: e.target.value,
        };
      });
    };
  };

  const postData = async (values) => {
    try {
      await fetch(
        'https://hw17-69e45-default-rtdb.asia-southeast1.firebasedatabase.app/hw_17.json',
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
    } catch (e) {
      console.log(`smth went wrong ${e.message}`);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    //
    const isFormNotFilled = Object.values(userInput).some((value) => !value);
    if (isFormNotFilled) {
      return alert("Please, fill all fields!");
    }

    const expenseData = {
      title: userInput.enteredTitle,
      amount: userInput.enteredAmount,
      date: new Date(userInput.enteredDate),
      id: Math.random().toString(),
    };
    await postData(expenseData);
    props.onSaveExpenseData(expenseData);
    setUserInput(defaultValues);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={userInput.enteredTitle}
            onChange={changeValuesHandler("enteredTitle")}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={userInput.enteredAmount}
            onChange={changeValuesHandler("enteredAmount")}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2025-12-31"
            value={userInput.enteredDate}
            onChange={changeValuesHandler("enteredDate")}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
