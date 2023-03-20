import React from 'react';
import { FC } from 'react';

import { Tags } from '../components/Tags';

import './style.scss';

const NotesPage: FC = ({}) => (
  <div className="NotesPage">
    <h3>My Notes</h3>
    <div className="NotesContainer">
      <Tags />
      <div className="Notes"></div>
    </div>
  </div>
);

export default NotesPage;
