import { FC, useEffect, useState } from 'react';

import { INote } from '../../interfaces/notes';

import Notes from './Notes';

interface INotesContainer {
  activeTag: string;
  saveNewTag: (newTag: string) => void;
}

const NotesContainer: FC<INotesContainer> = ({ activeTag, saveNewTag }) => {
  let data = localStorage.getItem('notes') || '[]';
  let NOTES = JSON.parse(data);
  let [notes, setNotes] = useState<INote[]>(NOTES);
  let [dialogOpen, setDialogOpen] = useState(false);
  let [activeNote, setActiveNote] = useState<INote>({
    id: null,
    title: '',
    text: '',
    tags: [],
    date: '',
  });
  let [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (activeTag) {
      setNotes((notes) => {
        let newNotes = [...NOTES];
        newNotes = newNotes.filter((n) => n.tags.includes(activeTag));
        return newNotes;
      });
    } else {
      setNotes(NOTES);
    }
  }, [activeTag]);

  const createNote = () => {
    let newId: number;
    if (NOTES.length) {
      const lastId = NOTES[NOTES.length - 1].id;
      newId = lastId + 1;
    } else {
      newId = 1;
    }
    const newDate = new Date();
    setIsNew(true);
    return {
      id: newId,
      title: '',
      text: '',
      date: newDate.toISOString().slice(0, 10),
      tags: [],
    };
  };

  const deleteNote = (id: number | null) => {
    let newNotes = [...NOTES];
    for (let n = 0; n < notes.length; n++) {
      if (notes[n].id === id) {
        setNotes((notes) => {
          newNotes.splice(n, 1);
          localStorage.setItem('notes', JSON.stringify(newNotes));
          return newNotes;
        });
      }
    }
    closeDialog(true);
  };

  const saveNewNote = (note: INote) => {
    if (note.title) {
      setActiveNote(note);
      const newNote = checkEndTags(note);
      setNotes((notes) => {
        let newNotes = [...NOTES];
        newNotes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(newNotes));
        return newNotes;
      });
      closeDialog(true);
    }
  };

  const saveEditedNote = () => {
    if (activeNote.title) {
      const newNote = checkEndTags(activeNote);
      setNotes((notes) => {
        let newNotes = [...NOTES];
        for (let n = 0; n < newNotes.length; n++) {
          if (newNotes[n].id === newNote.id) {
            newNotes[n] = newNote;
            break;
          }
        }
        localStorage.setItem('notes', JSON.stringify(newNotes));
        return newNotes;
      });
    }
  };

  const checkEndTags = (note: INote) => {
    let foundTag = note.text.match(/(?<=^#|\s#)([a-z\d]+)(?=$)/g);
    if (foundTag && !note.tags.includes(foundTag[0])) {
      saveNewTag(foundTag[0]);
      let newNote = { ...note };
      newNote.tags.push(foundTag[0]);
      return newNote;
    } else return note;
  };

  const closeDialog = (isNew: boolean) => {
    if (!isNew) {
      saveEditedNote();
    }
    setDialogOpen(false);
    setIsNew(false);
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
      isNew={isNew}
    />
  );
};

export default NotesContainer;
