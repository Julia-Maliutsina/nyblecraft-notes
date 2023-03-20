import React from 'react';
import { FC } from 'react';

import { NoteDialog } from '../../components/Dialogs';
import { INote } from '../../interfaces/notes';

import './style.scss';

interface INotes {
  notes: INote[];
  activeNote: INote;
  dialogOpen: boolean;
  setDialogOpen: any;
  setActiveNote: any;
  createNote: () => INote;
}

const Notes: FC<INotes> = ({
  notes,
  activeNote,
  setActiveNote,
  dialogOpen,
  setDialogOpen,
  createNote,
}) => (
  <>
    <div className="Notes">
      <div className="NotesWrapper">
        {notes.map((note: INote) => (
          <div
            className="Note"
            key={note.id}
            onClick={() => {
              setActiveNote(note);
              setDialogOpen(true);
            }}
          >
            <p>{note.title}</p>
            <p>{note.text.slice(0, 150)} ...</p>
            <p>{note.date}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setDialogOpen(true)}>+ Add note</button>
    </div>
    {dialogOpen &&
      (activeNote?.id ? (
        <NoteDialog isNew={false} note={activeNote} setDialogOpen={setDialogOpen} />
      ) : (
        <NoteDialog isNew={true} note={createNote()} setDialogOpen={setDialogOpen} />
      ))}
  </>
);

export default Notes;
