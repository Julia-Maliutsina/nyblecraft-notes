import { FC, useState } from 'react';

import { TAGS } from '../../constants/tags';
import { ITag } from '../../interfaces/tags';

import Tags from './Tags';

const TagsContainer: FC = () => {
  let tags = TAGS;
  let [newTag, setNewTag] = useState('');

  const enterTag = (value: string) => {
    let tag = value.split(' ').join('_').split('#').join('');
    setNewTag(tag);
  };

  const saveNewTag = () => {
    const id = tags[tags.length - 1].id + 1;
    let tag: ITag = {
      id: id,
      name: newTag,
    };
    tags.push(tag);
    setNewTag('');
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

  return (
    <Tags
      tags={tags}
      newTag={newTag}
      enterTag={enterTag}
      saveNewTag={saveNewTag}
      deleteTag={deleteTag}
    />
  );
};

export default TagsContainer;
