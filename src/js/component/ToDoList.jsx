import React, {useState} from "react";
import '/src/styles/index.css'

const ToDoList = () => {

	const [inputValue, setInputValue ] = useState('');
	const [todoList, setTodoList] = useState([]);


	const pressEnterToInput = (event) =>{
		if(event.key === 'Enter' && inputValue !== '')
		{
			setTodoList([...todoList, inputValue])
			setInputValue("")
		}
	}

	const deleteTask= (e)=>
	{
		const newListOfTodos= todoList.filter((item, idx)=>idx !== parseInt(event.target.id))
		setTodoList(newListOfTodos)
	}
	

	const listOfTodos= todoList.map((task, index)=>
	{
	return <li className="list-group-item d-flex justify-content-between" key={index}>{task}
	<button id={index} className="button btn-close justify-content-end"  aria-label="Close" onClick={deleteTask}></button>
	</li>
	})
	
	return (
		<div>
			<h1 className="text-center my-3">List of To Do's</h1>
			<div class="d-flex justify-content-lg-center">
                <ul className="list-group">
                    <li className="list-group-item"><input onKeyDown={pressEnterToInput} onChange={ event => setInputValue(event.target.value)} value={inputValue} type="text" className="form-control" placeholder="Add a task" aria-label="Recipient's username" aria-describedby="basic-addon2"/></li>
                    {listOfTodos}
                    {(todoList.length > 0) ? <li className="list-group-item"><b>{todoList.length}</b> tasks left to do!</li> : null }
                </ul>
            </div>
		</div>
	);

};

export default ToDoList;