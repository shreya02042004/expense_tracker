// import React, { useState } from 'react';
import React, { useState, useEffect } from "react";
import Expenses from './Expenses/Expenses';
import NewExpense from './NewExpenseItem/NewExpense';

function App() {
  let DUMMY_EXPENSE = [];
  
  const[expenses,setExpenses]=useState(DUMMY_EXPENSE);
  function FetchData(){
  fetch('http://localhost:5000/api/expenses')
  .then((response)=>{
      return response.json();
    })
  .then((data)=>{
        // 1. ITERATE over the data array received from MongoDB
        const loadedExpenses = data.map(expense => {
            return {
                ...expense, 
                // 2. CONVERT the string date (expense.date) into a proper Date object
                date: new Date(expense.date) 
            };
        });

        // 3. SET the state with the correctly formatted data
        setExpenses(loadedExpenses);
    });
 }
  useEffect(()=>{
    FetchData()
  },[]);


  const expenseHandler = (expense) => {
   fetch('http://localhost:5000/expenses',{
    method:"POST",
    headers:{
        "Content-Type":"applications/json",
    },
    body: JSON.stringify(expense),
}).then(
    (response)=>{
        FetchData()
    }
)
  };

  return (
    <div>
      <NewExpense onAddExpense={expenseHandler} />
      <Expenses item={expenses} />
    </div>
  );
}

export default App;
