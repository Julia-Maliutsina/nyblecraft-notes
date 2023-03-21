import React from 'react';
import { FC, useState } from 'react';

import { INote } from '../../interfaces/notes';
import NoteDialog from './NoteDialog';

import './style.scss';

interface INoteDialogContainer {
  note: INote;
  isNew: boolean;
  closeDialog: () => void;
  saveNewNote: (note: INote) => void;
  deleteNote: (id: number | null) => void;
  saveNewTag: (newTag: string) => void;
}

const NoteDialogContainer: FC<INoteDialogContainer> = ({
  note,
  isNew,
  closeDialog,
  saveNewNote,
  deleteNote,
  saveNewTag,
}) => {
  let [activeNote, setActiveNote] = useState(note);

  const changeTitle = (value: string) => {
    let newNote = activeNote;
    newNote.title = value;
    setActiveNote(newNote);
  };
  const changeText = (value: string) => {
    setActiveNote((note) => {
      let newNote = { ...note };
      newNote.text = value;
      return newNote;
    });
    let foundTags = value.match(/(?<=^#|\s#)([a-z\d]+)(?=\s|\W)/g);
    if (foundTags) {
      for (let t = 0; t < foundTags.length; t++) {
        if (!activeNote.tags.includes(foundTags[t])) {
          setActiveNote((note) => {
            let newNote = { ...note };
            if (foundTags) {
              newNote.tags.push(foundTags[t]);
            }
            return newNote;
          });
          saveNewTag(foundTags[t]);
        }
      }
    }
  };

  return (
    <NoteDialog
      activeNote={activeNote}
      isNew={isNew}
      changeTitle={changeTitle}
      changeText={changeText}
      closeDialog={closeDialog}
      saveNewNote={saveNewNote}
      deleteNote={deleteNote}
    />
  );
};

export default NoteDialogContainer;
