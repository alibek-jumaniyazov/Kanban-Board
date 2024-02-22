import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React from 'react';
import User from '../User/User';

export default function UserInfo({ state, status }) {
  return (
    <div className='UserInfo'>
      <SortableContext items={state.filter(task => task.status === status).map(task => task.id)} strategy={verticalListSortingStrategy}>
        {state.filter(task => task.status === status).map(task => (
          <User id={task.id} title={task.title} key={task.id} />
        ))}
      </SortableContext>
    </div>
  );
}
