import React, {useState, useEffect} from "react";
import {tomasH} from '..'



const ToDoList = () => {

	const [inputValue, setInputValue ] = useState('');
	const [todoList, setTodoList] = useState([]);
	

useEffect(()=>{

	function getTodos(){
		return fetch(`https://assets.breatheco.de/apis/fake/todos/user/tomasH`)
		.then(response =>{
			if(!response.ok){
				console.log('Error with GET ToDos')
				throw Error(response.statusText);
			}
			return response.json();
		})
		.catch(error => {
			console.log('Error on the GET', error);
			return false
		})
	}

	function postTodos(){
	return fetch(`https://assets.breatheco.de/apis/fake/todos/user/tomasH`, {
		method: "POST",
		body: JSON.stringify([]),
		headers: {
			"Content-Type": "application/json"
		}
		})
		.then(response =>{
			if(!response.ok){
				console.log("Error with POST ToDos")
				throw Error(response.statusText);
			}
			return res.json();
		})
		.catch(error => {
			console.log('Error on the POST', error);
			return false
		})
	}
	const getUserList = async () => {

		let userList = []
		let getFetchResult = await getTodos()
		
		if(!getFetchResult){
			await postTodos()
		}else{
			userList = getFetchResult
		}
		setTodoList(userList)
	}
	getUserList();
},[]);


const newItem = (value) =>{
	return {
		label: value,
		done: false
	}
}


const pressEnterToInput = async(evt) =>{
	if(evt.key === 'Enter' && inputValue !== '')
		{
		const item = newItem(inputValue);
		const newTodoList = [...todoList, item]
		setTodoList(newTodoList)
	
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/tomasH`, {
			method: "PUT",
			body: JSON.stringify(
				newTodoList),
			headers: {
			"Content-Type": "application/json"
			}
		})
		.then(resp => {
			console.log(resp.ok); // will be true if the response is successfull
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			console.log(resp.text()); // will try return the exact result as string
			return resp; // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		})
		.catch(error => {
			//error handling
			console.log(error);
		});

		setInputValue("")
		}
	}


	const deleteTodo= async (event)=>
	{
		const newListOfTodos= todoList.filter((item, idx)=>idx !== parseInt(event.target.id))
		setTodoList(newListOfTodos)
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/tomasH`, {
			method: "PUT",
			body: JSON.stringify(newListOfTodos),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(response =>{
				if(!response.ok){
					console.log("Error with PUT ToDos")
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(
				console.log("User list updated")
				)
			.catch(error => {
				console.log('Error on the PUT', error);
				return false
			})
	}

	const deleteTodosAPI = async () =>{
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/tomasH`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
		setTodoList([])
		await fetch(`https://assets.breatheco.de/apis/fake/todos/user/tomasH`, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(response =>{
				if(!response.ok){
					console.log("Error with POST ToDos")
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(
				console.log("User list updated")
				)
			.catch(error => {
				console.log('Error on the POST', error);
				return false
			})	
	}
	

	const listOfTodos= todoList.map((task, index)=>
	{
	return <li className="list-group-item d-flex justify-content-between" key={index}>{task.label}
	<button id={index} className="button btn-close justify-content-end"  aria-label="Close" onClick={deleteTodo}></button>
	</li>
	})
	
	return (
		<div>
			<h1 className="text-center my-3">List of To Do's</h1>
			<div className="d-flex justify-content-lg-center">
				<ul className="list-group">
					<li className="list-group-item"><input onKeyDown={pressEnterToInput} onChange={ e=> setInputValue(e.target.value)} value={inputValue} type="text" className="form-control" placeholder="Add a task to do" aria-label="Recipient's username" aria-describedby="basic-addon2"/></li>
					{listOfTodos}
					{(todoList.length > 0) ? <li className="list-group-item"><b>{todoList.length}</b> tasks left to do!</li> : null }
					<div className="d-flex justify-content-center">
				{todoList.length > 0 ? <button onClick={deleteTodosAPI} type="button" className="mx-auto btn btn-danger my-3">Delete all tasks</button> : null }
			</div>
				</ul>
			</div>
		</div>
	);

};

export default ToDoList;