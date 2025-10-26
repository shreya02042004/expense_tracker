import React from "react";
import ExpenseItem from "./ExpenseItem";
import Card from "../ui/Card";   // ✅ Import Card
import "./Expenses.css";

function Expenses(props) {
  return (
    <Card className="expenses">   {/* ✅ Wrap all items inside Card */}
      {props.item.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </Card>
  );
}

export default Expenses;
