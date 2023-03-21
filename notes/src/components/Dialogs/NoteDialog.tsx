import React from 'react';
import { FC } from 'react';

import { INote } from '../../interfaces/notes';

import './style.scss';

interface INoteDialog {
  activeNote: INote;
  isNew: boolean;
  changeTitle: (value: string) => void;
  changeText: (value: string) => void;
  closeDialog: () => void;
  saveNewNote: (note: INote) => void;
  deleteNote: (id: number | null) => void;
  saveNewTag?: (newTag: string) => void;
}

const NoteDialog: FC<INoteDialog> = ({
  activeNote,
  isNew,
  changeTitle,
  changeText,
  closeDialog,
  saveNewNote,
  deleteNote,
}) => (
  <div className="DialogBackground">
    <div className="NoteDialog">
      <label className="Title">
        Title
        <input
          defaultValue={activeNote.title}
          onChange={(e) => changeTitle(e.target.value)}
          type="text"
        ></input>
      </label>
      <label className="Text">
        Text
        <textarea
          defaultValue={activeNote.text}
          onChange={(e) => changeText(e.target.value)}
        ></textarea>
      </label>
      {activeNote.tags[0] && (
        <div className="NoteDialog-Tags">
          TAGS:
          {activeNote.tags.map((tag, id) => (
            <span key={id + tag}>{tag}</span>
          ))}
        </div>
      )}
      <p className="Date">{activeNote.date}</p>
      <div className="Buttons">
        {isNew ? (
          <button onClick={() => saveNewNote(activeNote)}>Save</button>
        ) : (
          <button onClick={() => deleteNote(activeNote.id)}>Delete</button>
        )}
        <button onClick={() => closeDialog()}>Close</button>
      </div>
    </div>
  </div>
);

export default NoteDialog;
