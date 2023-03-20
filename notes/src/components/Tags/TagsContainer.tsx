import { FC, useState } from 'react';

import { ITag } from '../../interfaces/tags';

import Tags from './Tags';

interface ITagsProps {
  activeTag: string;
  selectTag: (tag: string) => void;
  tags: ITag[];
  saveNewTag: (newTag: string) => void;
}

const TagsContainer: FC<ITagsProps> = ({ tags, activeTag, selectTag, saveNewTag }) => {
  let [newTag, setNewTag] = useState('');

  const enterTag = (value: string) => {
    let tag = value.split(' ').join('_').split('#').join('');
    setNewTag(tag);
  };

  const deleteTag = (tagId: number) => {
    for (let t = 0; t < tags.length; t++) {
      if (tags[t].id === tagId) {
        tags.splice(t, 1);
        console.log(tags);
        return;
      }
    }
  };

  const saveTag = () => {
    saveNewTag(newTag);
    setNewTag('');
  };

  return (
    <Tags tags={tags} newTag={newTag} enterTag={enterTag} saveTag={saveTag} deleteTag={deleteTag} />
  );
};

export default TagsContainer;
