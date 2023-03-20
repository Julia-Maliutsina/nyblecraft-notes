import React from 'react';
import { FC } from 'react';

import { INote } from '../../interfaces/notes';

import './style.scss';

interface INoteDialog {
  activeNote: INote;
  isNew: boolean;
  changeTitle: (value: string) => void;
  changeText: (value: string) => void;
  setDialogOpen: any;
}

const NoteDialog: FC<INoteDialog> = ({
  activeNote,
  isNew,
  changeTitle,
  changeText,
  setDialogOpen,
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
      <p className="Date">{activeNote.date}</p>
      <div className="Buttons">
        {isNew ? <button>Save</button> : <button>Delete</button>}
        <button onClick={() => setDialogOpen(false)}>Close</button>
      </div>
    </div>
  </div>
);

export default NoteDialog;
