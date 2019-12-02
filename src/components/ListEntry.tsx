import React, { useState } from 'react';

import Button from './Button';
import Field from './Field';

export interface Item {
  id: number;
  name: string;
}

const id = () => {
  return Math.floor(Math.random() * 1000000);
}

interface ListEntryProps {
  items: Item[];
  setItems: (l: Item[]) => void;
  fields?: React.ReactNode;
}

const ListEntry = ({ items, setItems, fields }: ListEntryProps) => {
  const [curr, setCurr] = useState('');

  return (
    <div>
      <div className="input-container">
        <Field value={curr} onChange={setCurr} />
        <Button onClick={() => {
          setItems([...items, { id: id(), name: curr }]);
          setCurr('');
        }}>
          Add item
        </Button>
        { fields }
      </div>
      <table>
        <tbody>
          {items.map(({ id, name }) => (
            <tr key={id}>
              <td>
                { name }
              </td>
              <td>
                <Button onClick={() => setItems(items.filter(({ id: id2 }) => id2 !== id))}>
                  x
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListEntry;
