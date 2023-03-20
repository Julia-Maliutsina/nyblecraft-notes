import { FC, useState } from 'react';

import { INote } from '../../interfaces/notes';
import { NOTES } from '../../constants/notes';

import Notes from './Notes';

interface INotesProps {
  activeTag: string;
}

const NotesContainer: FC<INotesProps> = ({ activeTag }) => {
  let [dialogOpen, setDialogOpen] = useState(false);
  let [activeNote, setActiveNote] = useState<INote>({
    id: null,
    title: '',
    text: '',
    tags: [],
    date: '',
  });

  const createNote = () => {
    const newId = NOTES[NOTES.length - 1].id + 1;
    const newDate = new Date();
    return {
      id: newId,
      title: '',
      text: '',
      date: newDate.toISOString().slice(0, 10),
      tags: [],
    };
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
      notes={NOTES}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      activeNote={activeNote}
      setActiveNote={setActiveNote}
      createNote={createNote}
      closeDialog={closeDialog}
    />
  );
};

export default NotesContainer;
