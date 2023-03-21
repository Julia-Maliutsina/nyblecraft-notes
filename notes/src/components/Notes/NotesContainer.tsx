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
    checkEndTags();
    closeDialog(true);
  };

  const saveNewNote = (note: INote) => {
    if (note.title) {
      setNotes((notes) => {
        let newNotes = [...NOTES];
        newNotes.push(note);
        localStorage.setItem('notes', JSON.stringify(newNotes));
        return newNotes;
      });
      checkEndTags();
      closeDialog(true);
    }
  };

  const saveEditedNote = () => {
    if (activeNote.title) {
      setNotes((notes) => {
        let newNotes = [...NOTES];
        for (let n = 0; n < newNotes.length; n++) {
          if (newNotes[n].id === activeNote.id) {
            newNotes[n] = activeNote;
            break;
          }
        }
        localStorage.setItem('notes', JSON.stringify(newNotes));
        return newNotes;
      });
      checkEndTags();
    }
  };

  const checkEndTags = () => {
    let foundTag = activeNote.text.match(/(?<=^#|\s#)([a-z\d]+)(?=$)/g);
    if (foundTag && !activeNote.tags.includes(foundTag[0])) {
      console.log(foundTag[0]);
      setActiveNote((note) => {
        let newNote = { ...note };
        if (foundTag) {
          newNote.tags.push(foundTag[0]);
        }
        return newNote;
      });
      saveNewTag(foundTag[0]);
    }
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
