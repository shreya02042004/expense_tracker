import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

function NewExpense(props){

    const saveExpenseDataHandler=(enteredexpenseData)=>{
        const expenseData={
            ...enteredexpenseData, //... is used to copy all the properties inside the object ie expensedata
            id:Math.random().toString()
        }
        // console.log(enteredexpenseData)
        props.onAddExpense(expenseData)
        console.log(expenseData)
    }

    return(
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}></ExpenseForm>
        </div>
    )
}

export default NewExpense;