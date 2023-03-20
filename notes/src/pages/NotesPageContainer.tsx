import React from 'react';
import { FC, useState } from 'react';

import { TAGS } from '../constants/tags';
import { ITag } from '../interfaces/tags';

import NotesPage from './NotesPage';

const NotesPageContainer: FC = () => {
  let [activeTag, setActiveTag] = useState('');
  let tags = TAGS;
  const selectTag = (tag: string) => {
    setActiveTag(tag);
  };
  const saveNewTag = (newTag: string) => {
    const id = tags[tags.length - 1].id + 1;
    let tag: ITag = {
      id: id,
      name: newTag,
    };
    tags.push(tag);
  };
  return (
    <NotesPage tags={tags} activeTag={activeTag} selectTag={selectTag} saveNewTag={saveNewTag} />
  );
};

export default NotesPageContainer;
