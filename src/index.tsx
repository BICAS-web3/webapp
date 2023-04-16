import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { Layout } from './widgets/layout/Layout';
import { Games } from './widgets/games/Games';
import { LoadPage } from './widgets/loadPage/LoadPage';
import { Signup } from './widgets/signup/Signup'
import { SelectPage } from './widgets/dunkinCaps/selectPage/SelectPage';
import store from './redux_store/store';
import { Provider } from "react-redux"


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Games/>} />
            <Route path="about" element={<LoadPage/>} />
            <Route path="signup" element={<Signup/>} />
            <Route path="DunkinCaps" element={<SelectPage/>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </>
  
);

