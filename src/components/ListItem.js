import { React, useState } from "react";
import "./ListItem.css";
import { AiOutlineCheck } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { BsPenFill } from "react-icons/bs";

const ListItem = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={"todo"}>
      <div
        className={!isChecked ? "todo-radio" : "todo-radio-checked"}
        onClick={() => setIsChecked(!isChecked)}
      >
        <AiOutlineCheck />
      </div>
      <div
        className={!isChecked ? "todo-text" : "todo-text-checked"}
        onClick={() => setIsChecked(!isChecked)}
      >
        {props.text}
      </div>

      <div className="todo-update" onClick={() => props.updateTodo(props.id)}>
        <BsPenFill />
      </div>
      <div className="todo-delete" onClick={() => props.deleteTodo(props.id)}>
        <ImBin />
      </div>
    </div>
  );
};

export default ListItem;
