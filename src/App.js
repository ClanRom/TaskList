import './App.css';
import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') {
      alert("Задача не может быть пустой");
      return;
    }
    const task = { text: newTask.trim(), completed: false };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index){
        return {...task, completed: !task.completed};
      } else
        return task;
  });
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((component, i) => i !== index));
  };

  return (
    <div className="app">
      <h1>Список задач</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="Введите задачу"
        />
        <button onClick={addTask} className="add">Добавить</button>
      </div>
      <TaskList
        tasks={tasks}
        onToggleCompletion={toggleTaskCompletion}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}

export default App;

function TaskList({ tasks, onToggleCompletion, onDeleteTask }) {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onToggleCompletion={() => onToggleCompletion(index)}
          onDeleteTask={() => onDeleteTask(index)}
        />
      ))}
    </div>
  );
}

function Task({ task, onToggleCompletion, onDeleteTask }) {
  return (
    <div className="task">
      <span
        onClick={onToggleCompletion}
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? 'gray' : 'black',
          fontWeight: task.completed ? 'none' : 'bold',
        }}
      >
        {task.text}
      </span>
      <button onClick={onDeleteTask} className="remove">Удалить</button>
    </div>
  );
}