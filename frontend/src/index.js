import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// context provider
import { TasksContextProvider } from './context/TasksContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TasksContextProvider>
      <App />
    </TasksContextProvider>
  </React.StrictMode>
);