import React from 'react';
import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { NotesPage } from 'pages';
import './App.scss';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate replace to="my-notes" />} />
      <Route path="/my-notes" element={<NotesPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
