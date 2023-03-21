import React from 'react';
import { FC, useState } from 'react';

import { TAGS } from '../constants/tags';
import { ITag } from '../interfaces/tags';

import NotesPage from './NotesPage';

const NotesPageContainer: FC = () => {
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
      const id = tags[tags.length - 1].id + 1;
      let tag: ITag = {
        id: id,
        name: newTag,
      };
      setTags((prev: ITag[]) => {
        let newTags = [...prev];
        newTags.push(tag);
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
