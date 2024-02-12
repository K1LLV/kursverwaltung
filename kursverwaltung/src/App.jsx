import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Root from './pages/Root';
import Lehrbetriebe from './pages/lehrbetriebe/Lehrbetriebe';
import AddLehrbetrieb from './pages/lehrbetriebe/AddLehrbetrieb'
import Lernende from './pages/lernende/Lernende';
import LernendeProfile from './pages/lernende/LernendeProfile';
import AddLernende from './pages/lernende/AddLernende';
import EditLernende from './pages/lernende/EditLernende';
import LehrbetriebLernende from './pages/lehrbetriebLernende/LehrbetriebLernende';
import EditLehrbetrieb from './pages/lehrbetriebe/EditLehrbetrieb';
import Laender from './pages/laender/Laender';
import Dozenten from './pages/dozenten/Dozenten';
import Kurse from './pages/kurse/Kurse';
import KurseLernende from './pages/kurseLernende/KurseLernende';
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
        { path: 'lehrbetriebe/add', element: <AddLehrbetrieb/>},
        { path: 'lehrbetriebe/:id/edit', element: <EditLehrbetrieb/>},
        { path: 'lernende', element: <Lernende/>},
        { path: 'lernende/:id', element: <LernendeProfile/>},
        { path: 'lernende/add', element: <AddLernende/>},
        { path: 'lernende/:id/edit', element: <EditLernende/>},
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
