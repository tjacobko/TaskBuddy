import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// context provider
import { TasksContextProvider } from './context/TasksContext';
import { TaskDetailsContextProvider } from './context/TaskDetailsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TasksContextProvider>
      <TaskDetailsContextProvider>
        <App />
      </TaskDetailsContextProvider>
    </TasksContextProvider>
  </React.StrictMode>
);