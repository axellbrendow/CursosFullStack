import React from 'react';
import Button from '../Button';

export default function Search({ value, onChange, onSubmit, children })
{
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange}></input>
      <Button type="submit">
        { children }
      </Button>
    </form>
  );
}
