import { FC, useState } from 'react';

import { ITag } from '../../interfaces/tags';

import Tags from './Tags';

interface ITagsProps {
  activeTag: string;
  selectTag: (tag: string) => void;
  tags: ITag[];
  saveNewTag: (newTag: string) => void;
  deleteTag: (tagId: number) => void;
}

const TagsContainer: FC<ITagsProps> = ({ tags, activeTag, selectTag, saveNewTag, deleteTag }) => {
  let [newTag, setNewTag] = useState('');

  const enterTag = (value: string) => {
    let tag = value.split(' ').join('_').split(/\W/).join('');
    setNewTag(tag);
  };

  const saveTag = () => {
    saveNewTag(newTag);
    setNewTag('');
  };

  return (
    <Tags
      tags={tags}
      newTag={newTag}
      enterTag={enterTag}
      saveTag={saveTag}
      deleteTag={deleteTag}
      activeTag={activeTag}
      selectTag={selectTag}
    />
  );
};

export default TagsContainer;
