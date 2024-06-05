import React from "react";
import { useSelector, useDispatch } from "react-redux";

const TextEditor = () => {
  const content = useSelector((state) => state.content);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch({ type: "ADD_CHANGE", payload: e.target.value });
  };

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
  };

  return (
    <div>
      <textarea value={content} onChange={handleChange} />
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
    </div>
  );
};

export default TextEditor;
