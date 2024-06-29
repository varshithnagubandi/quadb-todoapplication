import React, { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  //instially showing false-->todolist true-->completedlist
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  //cointains all items of todo list  --> intially passing empty array
  const [allTodos, setTodos] = useState([]);
  //for title --> intially passing Empty String
  const [newTitle, setNewTitle] = useState("");
  //for decription --> intially passing Empty String
  const [newDescription, setNewDescription] = useState("");
  //contains list of completed tasks
  const [completedTodos, setCompletedTodos] = useState([]);
  //for edit of list
  const [currentEdit, setCurrentEdit] = useState([]);
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  //it will happen when we click on ADD button ---> Adding Todo task into list
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    //for todo-list-items
    let updatedTodoArr = [...allTodos];
    //adding last when new title and new description is added to todo-list-items
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    // after refresing our data will dissappear to avoid it we are using --> localstorage
    //to store in form of string we use JSON.stringify
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  //it will happen when we click on delete icon
  let handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    //splice will delete and add elements at certain index
    reducedTodo.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  //it will happen when we click on complete icon
  //iam  adding time when the task is completed
  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    //month index start with 0 so add 1 to get exact
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;
    let filterItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompleteArr = [...completedTodos];
    updatedCompleteArr.push(filterItem);
    setCompletedTodos(updatedCompleteArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompleteArr));
  };

  //it will be happen when delete icon is clicked in completed section
  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    //splice will delete and add elements at certain index
    reducedTodo.splice(index, 1);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  //when page is refreshed item should not dissappear-->so getItem
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  //when we click on the edit icon
  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };
  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };
  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };

  //When we click on update button
  const handleupdateTodo = () => {
    let newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("")
  };

  return (
    <div className="App">
      {/*heading of Application*/}
      <h1>TODO APPLICATION</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            {/*Taking task input from the user*/}
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter Title"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            {/*Taking Task-Description input from the user*/}
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter Description"
            />
          </div>
          <div className="todo-input-item">
            {/* Creating button to ADD Task*/}
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          {/* Creating button to show Task List when clicked*/}
          {/* if todo button clicked  make ---> setIsCompleteScreen(false) --> to get task*/}

          <button
            className={`secondaryBtn  ${
              isCompleteScreen === false && "active"
            }`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          {/* Creating button to show Completed List when clicked*/}
          <button
            className={`secondaryBtn  ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {/*To add Each iteration we use map*/}
          {isCompleteScreen === false &&
            allTodos.map((items, index) => {
              if (currentEdit === index) {
                return (
                  <div className="edit_wrapper" key={index}>
                    <input
                      placeholder="Updated Tile"
                      onChange={(e) => handleUpdateTitle(e.target.value)}
                      value={currentEditedItem.title}
                    />
                    <textarea
                      placeholder="Updated Description"
                      rows={4}
                      onChange={(e) => handleUpdateDescription(e.target.value)}
                      value={currentEditedItem.description}
                    />
                    <button
                      type="button"
                      onClick={handleupdateTodo}
                      className="primaryBtn"
                    >
                      UPDATE
                    </button>
                  </div>
                );
              } else {
                return (
                  //key is used for unique addition by index
                  <div className="todo-list-item" key={index}>
                    <div>
                      {/* Here it will show the Data of task along with Description dynamically by alltodos array*/}
                      <h3>{items.title}</h3>
                      <p>{items.description}</p>
                    </div>

                    <div>
                      {/* handleDeleteTodo(index) used to delete indivual ny their index*/}
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete?"
                      />
                      {/* handleComplete(index) used to move task to completed tab by their index*/}
                      <BsCheckLg
                        className="check-icon"
                        onClick={() => handleComplete(index)}
                        title="Complete?"
                      />
                      <AiOutlineEdit
                        className="check-icon"
                        onClick={() => handleEdit(index, items)}
                        title="Edit?"
                      />
                    </div>
                  </div>
                );
              }
            })}
          {isCompleteScreen === true &&
            completedTodos.map((items, index) => {
              return (
                //key is used for unique addition by index
                <div className="todo-list-item" key={index}>
                  <div>
                    {/* Here it will show the Data of task along with Description dynamically by alltodos array*/}
                    <h3>{items.title}</h3>
                    <p>{items.description}</p>
                    <p>
                      <small>Completed on : {items.completedOn}</small>
                    </p>
                  </div>

                  <div>
                    {/* handleDeleteCompletedTodo(index) used to delete indivual ny their index*/}
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
