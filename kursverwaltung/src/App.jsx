import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import axios from 'axios';
import Home from './pages/Home';
import Root from './pages/Root';
import Lehrbetriebe from './pages/Lehrbetriebe';
import Lernende from './pages/Lernende';
import LehrbetriebLernende from './pages/LehrbetriebLernende';
import Laender from './pages/Laender';
import Dozenten from './pages/Dozenten';
import Kurse from './pages/Kurse';
import KurseLernende from './pages/KurseLernende';
import ErrorPage from './pages/Error';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root/>,
      errorElement: <ErrorPage/>,
      children: [
        { index: true, element: <Home/>},
        { path: 'lehrbetriebe', element: <Lehrbetriebe/>},
        { path: 'lernende', element: <Lernende/>},
        { path: 'lehrbetrieb_lernende', element: <LehrbetriebLernende/>},
        { path: 'laender', element: <Laender/>},
        { path: 'dozenten', element: <Dozenten/>},
        { path: 'kurse', element: <Kurse/>},
        { path: 'kurse_lernende', element: <KurseLernende/>},
      ]
    },
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
