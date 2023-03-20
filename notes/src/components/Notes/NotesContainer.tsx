import { FC, useState } from 'react';

import { INote } from '../../interfaces/notes';
import { NOTES } from '../../constants/notes';

import Notes from './Notes';

const TagsContainer: FC = () => {
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
  return (
    <Notes
      notes={NOTES}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      activeNote={activeNote}
      setActiveNote={setActiveNote}
      createNote={createNote}
    />
  );
};

export default TagsContainer;
