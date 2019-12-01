import React, { useState } from 'react';
import './App.css';

import Choice, { Query } from './components/Choice';
import ListEntry, { Item } from './components/ListEntry';
import Button from './components/Button';

interface Preference {
  key: number;
  better: number[];
}

type Maybe<x> = x | undefined;

const findPref = (item: Item, prefs: Preference[]) => {
  return prefs.find(({ key }) => key === item.id);
}

const App = () => {
  const [items, setItems] = useState([{ name: 'a', id: 1 }, { name: 'b', id: 2 }, { name: 'c', id: 3 }, { name: 'd', id: 4 }, { name: 'e', id: 5 }] as Item[]);
  const [query, setQuery] = useState(undefined as Maybe<Query>);
  const [prefs, setPrefs] = useState([] as Preference[]);

  // A better than B
  const prefer = (a: Item, b: Item) => {
    const pref: Preference | undefined = findPref(b, prefs);
    let newPrefs;
    if (!pref) {
      newPrefs = [
        ...prefs,
        { key: b.id, better: [a.id] }
      ];
    } else {
      newPrefs = [
        ...prefs.filter(({ key }) => key !== pref.key),
        { key: pref.key, better: [...pref.better, a.id] }
      ];
    }
    setPrefs(newPrefs);
    trySort(newPrefs);
  };

  const trySort = (prefs: Preference[]) => {
    const qs: Query[] = [];
    items.sort((a: Item, b: Item) => {
      const prefA: Maybe<Preference> = findPref(a, prefs);
      const prefB: Maybe<Preference> = findPref(b, prefs);
      // B better than A
      if (prefA && prefA.better.find(id => id === b.id)) {
        return 1;
      }
      // A better than B
      else if (prefB && prefB.better.find(id => id === a.id)) {
        return -1;
      }
      // No sort info found
      else {
        qs.push({ a, b });
        return -1;
      }
    });
    if (qs.length === 0) {
      setQuery(undefined);
    } else {
      setQuery(qs[Math.floor(Math.random() * qs.length)]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Human Sorting</h1>
        <p>Got a list of things you want sorted but don't want to figure out yourself how to sort it yourself?</p>
        {query ? (
          <Choice {...query} prefer={prefer} />
        ) : (
          <ListEntry
            items={items}
            setItems={setItems}
            fields={<Button onClick={() => trySort(prefs)}>Sort</Button>}
          />
        )}
      </header>
    </div>
  );
}

export default App;
