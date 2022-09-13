import { useState } from 'react';
// custom component
import CustomForm from './components/CustomForm';
import TaskList from './components/TaskList';
import EditForm from './components/EditForm';
import ThemeSwitcher from './components/ThemeSwitcher';
// custom hooks 
import useLocalStorage from './hooks/useLocalStorage'


function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', []);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => (t.id === id ? { ...t, checked: !t.checked } : t)))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (t.id === task.id ? { ...t, name: task.name } : t)))
    // close the edit mode
    closeEditMode();
  }

  const closeEditMode= () => {
    setIsEditing(false);
    previousFocusEl.focus();
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  }

  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>
      {
        isEditing && (
        <EditForm 
        editedTask={editedTask}
        updateTask={updateTask}
        closeEditMode={closeEditMode}
      />
          )
      }
      
      <CustomForm addTask={addTask} />
      {tasks && (
      <TaskList 
      tasks={tasks} 
      deleteTask={deleteTask}
      toggleTask={toggleTask}
      enterEditMode={enterEditMode}
      />
      )}
      <ThemeSwitcher />
    </div>
  )
}

export default App
