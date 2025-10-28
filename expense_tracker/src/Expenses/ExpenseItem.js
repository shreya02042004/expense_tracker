// import React,{useState} from "react";
import './ExpenseItem.css';
import ExpenseDate from'./ExpenseDate.js';
import Card from '../ui/Card.js'
      const ExpenseItem=(props)=>{
      //      let[newTitle,setNewTitle]=useState('')
      //       let[title,setTitle]=useState(props.title)
      //       function changeTitle(){
      //          setTitle(newTitle)
      //       }

      // const changeHandler = (events)=>{
      //       setNewTitle(events.target.value)
      // }      
    // let day = props.date.toLocaleString('en-US',{day:'2-digit'});
    // let month = props.date.toLocaleString('en-us',{month:'long'});
    // let year = props.date.getFullYear();
   
    return(
       
     <Card className='expense-item'>
        {/* <div>
         <div>{day}</div>
         <div>{month}</div>
         <div>{year}</div>
         </div> */}
         <ExpenseDate date ={new Date(props.date)}></ExpenseDate>

         <div className='expense-item__description'>
            <h2>{props.title}</h2>
            <div className='expense-item__price'>${props.amount}</div>
         </div>
         {/* <input type='text' value={newTitle} onChange={changeHandler}></input>
         <button onClick={changeTitle}>changeTitle</button> */}
     </Card>

);
}

export default ExpenseItem;