import React from 'react';
import { FC } from 'react';

import { ITag } from '../../interfaces/tags';

import './style.scss';

interface ITags {
  tags: ITag[];
  newTag: string;
  enterTag: (value: string) => void;
  saveNewTag: () => void;
  deleteTag: (tagId: number) => void;
}

const Tags: FC<ITags> = ({ tags, newTag, enterTag, saveNewTag, deleteTag }) => (
  <div className="Tags">
    <div>
      <h4>Tags</h4>
      <div className="TagsWrapper">
        {tags.map((tag: ITag) => (
          <div className="Tag" key={tag.id}>
            {tag.name} <div className="Delete" onClick={() => deleteTag(tag.id)}></div>
          </div>
        ))}
      </div>
    </div>
    <div className="AddTag">
      <input
        type="text"
        placeholder="new_tag"
        value={newTag}
        onChange={(e) => enterTag(e.target.value)}
      ></input>
      <button onClick={() => saveNewTag()}>+ Add tag</button>
    </div>
  </div>
);

export default Tags;
