import React from 'react';
import { FC, useState } from 'react';

import NotesPage from './NotesPage';

const NotesPageContainer: FC = () => {
  let [activeTag, setActiveTag] = useState('');
  const chooseTag = (tag: string) => {};
  return <NotesPage />;
};

export default NotesPageContainer;
