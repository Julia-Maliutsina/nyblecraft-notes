import { FC, useState } from 'react';

import { TAGS } from '../../constants/tags';

import Tags from './Tags';

const TagsContainer: FC = () => {
  let [newTag, setNewTag] = useState('');

  const enterTag = (value: string) => {
    let tag = value.split(' ').join('_').split('#').join('');
    setNewTag(tag);
  };

  return <Tags tags={TAGS} newTag={newTag} enterTag={enterTag} />;
};

export default TagsContainer;
