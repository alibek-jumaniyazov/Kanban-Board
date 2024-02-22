import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function User({ id, title, status }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className='User'>
      <p> {title}</p>
      <p> {status}</p>
    </div>
  );
}
