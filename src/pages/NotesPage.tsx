import React from 'react';
import { FC } from 'react';

import { Tags } from '../components/Tags';
import { Notes } from '../components/Notes';

import './style.scss';
import { ITag } from '../interfaces/tags';

interface INotesProps {
  activeTag: string;
  selectTag: (tag: string) => void;
  tags: ITag[];
  saveNewTag: (newTag: string) => void;
  deleteTag: (tagId: number) => void;
}

const NotesPage: FC<INotesProps> = ({ tags, activeTag, selectTag, saveNewTag, deleteTag }) => (
  <div className="NotesPage">
    <h3>My Notes</h3>
    <div className="NotesContainer">
      <Tags
        tags={tags}
        activeTag={activeTag}
        selectTag={selectTag}
        saveNewTag={saveNewTag}
        deleteTag={deleteTag}
      />
      <Notes activeTag={activeTag} saveNewTag={saveNewTag} />
    </div>
  </div>
);

export default NotesPage;
