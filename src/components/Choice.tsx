import React from 'react';

import Button from './Button';
import { Item } from './ListEntry';

export interface Query {
  a: Item;
  b: Item;
}

interface ChoiceProps {
  prefer: (a: Item, b: Item) => void;
}

const Choice = ({ a, b, prefer }: Query & ChoiceProps) => {
  return (
    <div>
      <p>{ a.name }<Button onClick={() => prefer(a, b)}>Prefer this</Button></p>
      <p>{ b.name }<Button onClick={() => prefer(b, a)}>Prefer this</Button></p>
    </div>
  );
}

export default Choice;
