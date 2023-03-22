import React from 'react';
import { FC } from 'react';
import { HighlightWithinTextarea } from 'react-highlight-within-textarea';

import 'draft-js/dist/Draft.css';

import { INote } from '../../interfaces/notes';

import './style.scss';

interface INoteDialog {
  activeNote: INote;
  isNew: boolean;
  changeTitle: (value: string) => void;
  changeText: (value: string) => void;
  closeDialog: (isNew: boolean) => void;
  saveNewNote: () => void;
  deleteNote: (id: number | null) => void;
  saveNewTag?: (newTag: string) => void;
  displayTextarea: boolean;
}

const NoteDialog: FC<INoteDialog> = ({
  activeNote,
  isNew,
  changeTitle,
  changeText,
  closeDialog,
  saveNewNote,
  deleteNote,
  displayTextarea,
}) => (
  <div className="DialogBackground">
    <div className="NoteDialog">
      <label className="Title">
        Title
        <input
          defaultValue={activeNote.title}
          onChange={(e) => changeTitle(e.target.value)}
          type="text"
          placeholder="Enter title"
        ></input>
      </label>
      {displayTextarea && (
        <label className="Text">
          Text
          <HighlightWithinTextarea
            value={activeNote.text}
            onChange={changeText}
            highlight={/(?<=^|\s)(#[a-z\d]+)(?=$|\s|\W)/g}
          ></HighlightWithinTextarea>
        </label>
      )}
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
          <button onClick={() => saveNewNote()}>Save</button>
        ) : (
          <button onClick={() => deleteNote(activeNote.id)}>Delete</button>
        )}
        <button onClick={() => closeDialog(!!isNew)}>Close</button>
      </div>
    </div>
  </div>
);

export default NoteDialog;
