import React from 'react';
import { FC, useState } from 'react';

import { INote } from '../../interfaces/notes';
import NoteDialog from './NoteDialog';

import './style.scss';

interface INoteDialog {
  note: INote;
  isNew: boolean;
  closeDialog: () => void;
}

const NoteDialogContainer: FC<INoteDialog> = ({ note, isNew, closeDialog }) => {
  let [activeNote, setActiveNote] = useState(note);

  const changeTitle = (value: string) => {
    let newNote = activeNote;
    newNote.title = value;
    setActiveNote(newNote);
  };
  const changeText = (value: string) => {
    let newNote = activeNote;
    newNote.text = value;
    setActiveNote(newNote);
  };

  return (
    <NoteDialog
      activeNote={activeNote}
      isNew={isNew}
      changeTitle={changeTitle}
      changeText={changeText}
      closeDialog={closeDialog}
    />
  );
};

export default NoteDialogContainer;
