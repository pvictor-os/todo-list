import { React, useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import { VscArrowDown } from "react-icons/vsc";
import { ImCheckmark } from "react-icons/im";
import ListItem from "./components/ListItem.js";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [listTodo, setListTodo] = useState([]);

  const getListTodo = () => {
    let stored = JSON.parse(localStorage.getItem("todo"));
    if (stored != "") {
      setListTodo(stored);
    }
  };

  useEffect(() => {
    getListTodo();
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(listTodo));
  }, [listTodo]);

  const haddleInput = (event) => {
    setInputValue(event.target.value);
  };

  const addTodo = () => {
    if (inputValue)
      setListTodo([
        ...listTodo,
        {
          text: inputValue,
          id: Math.ceil(Math.random() * 10000),
        },
      ]);
    setInputValue("");
  };

  const updateTodo = (id) => {
    let newValue = prompt("Digite a alteração da tarefa: ");

    if (newValue) {
      let updatedListTodo = [...listTodo];

      updatedListTodo.map((todo) => {
        if (todo.id === id) {
          todo.text = newValue;
        }
      });

      setListTodo(updatedListTodo);
    }
  };

  const deleteTodo = (id) => {
    setListTodo(listTodo.filter((todo) => todo.id != id));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTodo();
    }
  };

  const listTodoRender = listTodo.map((todo) => {
    return (
      <ListItem
        text={todo.text}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        id={todo.id}
      ></ListItem>
    );
  });

  return (
    <div className="App">
      <div className="App-main">
        <div className="App-header">
          <h1>To-Do</h1>
          <ImCheckmark className="App-header-check" size={30} />
        </div>
        <div className="App-todo">
          <form className="App-input-wrapper">
            <input
              type={"text"}
              className="App-input"
              value={inputValue}
              onChange={haddleInput}
              onKeyDown={handleKeyDown}
              placeholder="Digite uma tarefa"
            />
            <div className="App-input-button" onClick={addTodo}>
              <VscArrowDown size={25} />
            </div>
          </form>
          <div className={"App-todo-list"}>
            {listTodo.length >= 1 ? (
              listTodoRender
            ) : (
              <p>
                <span>Não há tarefas no momento.</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
