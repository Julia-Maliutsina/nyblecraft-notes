import React from 'react';
import { FC, useState } from 'react';

import { ITag } from '../interfaces/tags';

import NotesPage from './NotesPage';

const NotesPageContainer: FC = () => {
  let data = localStorage.getItem('tags') || '[]';
  let TAGS = JSON.parse(data);
  let [activeTag, setActiveTag] = useState('');
  let [tags, setTags] = useState<ITag[]>(TAGS);
  const selectTag = (tag: string) => {
    if (tag === activeTag) {
      setActiveTag(() => '');
    } else {
      setActiveTag(() => tag);
    }
  };
  const saveNewTag = (newTag: string) => {
    if (!tags.some((t) => t.name === newTag)) {
      let id: number;
      if (TAGS.length) {
        id = tags[tags.length - 1].id + 1;
      } else {
        id = 1;
      }
      let tag: ITag = {
        id: id,
        name: newTag,
      };
      setTags((prev: ITag[]) => {
        let newTags = [...prev];
        newTags.push(tag);
        localStorage.setItem('tags', JSON.stringify(newTags));
        return newTags;
      });
    }
  };
  const deleteTag = (tagId: number) => {
    for (let t = 0; t < tags.length; t++) {
      if (tags[t].id === tagId) {
        setTags((prev: ITag[]) => {
          let newTags = [...prev];
          newTags.splice(t, 1);
          localStorage.setItem('tags', JSON.stringify(newTags));
          return newTags;
        });
        break;
      }
    }
  };

  return (
    <NotesPage
      tags={tags}
      activeTag={activeTag}
      selectTag={selectTag}
      saveNewTag={saveNewTag}
      deleteTag={deleteTag}
    />
  );
};

export default NotesPageContainer;
