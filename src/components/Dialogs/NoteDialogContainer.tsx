import React, { useEffect } from 'react';
import { FC, useState } from 'react';

import { INote } from '../../interfaces/notes';
import NoteDialog from './NoteDialog';

import './style.scss';

interface INoteDialogContainer {
  isNew: boolean;
  closeDialog: (isNew: boolean) => void;
  saveNewNote: () => void;
  deleteNote: (id: number | null) => void;
  saveNewTag: (newTag: string) => void;
  activeNote: INote;
  setActiveNote: any;
}

const NoteDialogContainer: FC<INoteDialogContainer> = ({
  isNew,
  closeDialog,
  saveNewNote,
  deleteNote,
  saveNewTag,
  activeNote,
  setActiveNote,
}) => {
  let [displayTextarea, setDisplayTextarea] = useState(false);
  const changeTitle = (value: string) => {
    let newNote = activeNote;
    newNote.title = value;
    setActiveNote(newNote);
    if (activeNote.title) {
      setDisplayTextarea(true);
    } else {
      setDisplayTextarea(false);
    }
  };
  const changeText = (value: string) => {
    setActiveNote((activeNote: INote) => {
      let newNote = { ...activeNote };
      newNote.text = value;
      return newNote;
    });
    let foundTags = value.match(/(?<=^#|\s#)([a-z\d]+)(?=\s|\W)/g);
    if (foundTags) {
      for (let t = 0; t < foundTags.length; t++) {
        if (!activeNote.tags.includes(foundTags[t])) {
          setActiveNote((activeNote: INote) => {
            let newNote = { ...activeNote };
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
      displayTextarea={displayTextarea}
    />
  );
};

export default NoteDialogContainer;
