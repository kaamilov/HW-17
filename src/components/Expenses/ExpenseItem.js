import React from 'react'
import './ExpenseItem.css'
import ExpenseDate from './ExpenseDate'
import Card from '../UI/Card'

function ExpenseItem(props) {
	return (
		<Card className='expense-item'>
			<ExpenseDate date={props.expenseDate} />
			<div className='expense-item__description'>
				<h2>{props.expenseTitle}</h2>
				<div className='expense-item__price'>${props.expensePrice}</div>
			</div>
		</Card>
	)
}

export default ExpenseItem
