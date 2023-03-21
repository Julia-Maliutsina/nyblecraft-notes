import { FC, useEffect, useState } from 'react';

import { INote } from '../../interfaces/notes';
import { NOTES } from '../../constants/notes';

import Notes from './Notes';

interface INotesContainer {
  activeTag: string;
  saveNewTag: (newTag: string) => void;
}

const NotesContainer: FC<INotesContainer> = ({ activeTag, saveNewTag }) => {
  let [notes, setNotes] = useState<INote[]>(NOTES);
  let [dialogOpen, setDialogOpen] = useState(false);
  let [activeNote, setActiveNote] = useState<INote>({
    id: null,
    title: '',
    text: '',
    tags: [],
    date: '',
  });

  useEffect(() => {
    console.log(activeTag);
    if (activeTag) {
      setNotes((notes) => {
        let newNotes = [...NOTES];
        newNotes = newNotes.filter((n) => n.tags.includes(activeTag));
        return newNotes;
      });
    }
  }, [activeTag]);

  const createNote = () => {
    const lastNote = NOTES?.length - 1;
    const lastId = NOTES[lastNote].id || 0;
    const newId = lastId + 1;
    const newDate = new Date();
    return {
      id: newId,
      title: '',
      text: '',
      date: newDate.toISOString().slice(0, 10),
      tags: [],
    };
  };

  const deleteNote = (id: number | null) => {
    for (let n = 0; n < notes.length; n++) {
      if (notes[n].id === id) {
        notes.splice(n, 1);
      }
    }
    closeDialog();
  };

  const saveNewNote = (note: INote) => {
    if (note.title) {
      notes.push(note);
      closeDialog();
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setActiveNote({
      id: null,
      title: '',
      text: '',
      tags: [],
      date: '',
    });
  };

  return (
    <Notes
      notes={notes}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      activeNote={activeNote}
      setActiveNote={setActiveNote}
      createNote={createNote}
      closeDialog={closeDialog}
      saveNewNote={saveNewNote}
      deleteNote={deleteNote}
      saveNewTag={saveNewTag}
    />
  );
};

export default NotesContainer;
