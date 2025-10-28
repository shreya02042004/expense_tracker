import React,{useState} from 'react';
import './ExpenseForm.css';

// Using the full URL since we don't know if the proxy is set up.
const API_URL = 'http://localhost:5000/api/expenses'; 

function ExpenseForm(props){
    const [enteredTitle,setNewTitle]=useState('')
    const [enteredAmount,setNewAmount]=useState('')
    const [enteredDate,setNewDate]=useState('')

    const titleChangeHandler=(event)=>{
        setNewTitle(event.target.value)
    }
    const amountChangeHandler=(event)=>{
        setNewAmount(event.target.value)
    }
    const dateChangeHandler=(event)=>{
        setNewDate(event.target.value)
    }

    const submitHandler = async (event) => { 
        event.preventDefault();
    
        const expenseData = {
            title: enteredTitle,
            // CRITICAL: Convert to Number before sending
            amount: parseFloat(enteredAmount), 
            date: new Date(enteredDate) 
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expenseData)
            });

            if (!response.ok) {
                // If backend returns a 4xx or 5xx error, handle it here
                const errorData = await response.json();
                throw new Error(errorData.message || 'Server failed to process expense.');
            }

            const savedExpense = await response.json();
            
            console.log('Expense successfully saved to MongoDB:', savedExpense);

            // Pass the new expense data up to the parent component for display (if needed)
            props.onSaveExpenseData(savedExpense); 

        } catch (error) {
            console.error('Submission failed:', error);
            // Use a modal or better UI element instead of alert in a real app
            alert(`Could not save expense: ${error.message}`); 
        }


        // Clear the form inputs (Reset state)
        setNewTitle('')
        setNewAmount('')
        setNewDate('')
    }
    
    return(
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__contrl'>
                    <label>Title</label>
                    <input type='text' value={enteredTitle} onChange={titleChangeHandler}></input>
                </div>
                <div className='new-expense__contrl'>
                    <label>Amount</label>
                    {/* Added min/step for better number input handling */}
                    <input type='number' value={enteredAmount} onChange={amountChangeHandler} min="0.01" step="0.01"></input>
                </div>
                <div className='new-expense__contrl'>
                    <label>Date</label>
                    <input type='date' value={enteredDate} onChange={dateChangeHandler}></input>
                </div>
            </div>
            <div className='new-expense__actions'> 
                <button type='submit'>Add Expense</button>
            </div>
        </form>
    );
}

export default ExpenseForm;
