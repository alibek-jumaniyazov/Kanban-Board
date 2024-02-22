import React, { useRef, useState } from 'react';
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core';
import UserInfo from './Components/UserInfo/UserInfo';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

export default function App() {
  const statuses = ['Todo', 'In Progress', 'Done'];
  const [state, setState] = useState([
    { id: 1, title: "Salom Mening Ismim Alibek", status: 'Done' },
    { id: 2, title: "Salom Mening Ismim Amirbek", status: 'Todo' },
    { id: 3, title: "Salom Mening Ismim Akmal", status: 'In Progress' },
    { id: 4, title: "Salom Mening Ismim Ezozbek", status: 'Todo' }
  ]);

  const handleDragEnd = event => {
    const { active, over } = event;
    if (!over) return;
    const activeTask = state.find(task => task.id === active.id);
    const overTask = state.find(task => task.id === over.id);
    if (activeTask.status !== overTask.status) {
      setState(state => {
        return state.map(task => {
          if (task.id === active.id) {
            return { ...task, status: overTask.status };
          }
          return task;
        });
      });
    }
  };

  const sensor = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <div className='App'>
      <DndContext sensors={sensor} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        {statuses.map(status => (
          <div className='Kanban' key={status}>
            <h2>{status}</h2>
            <UserInfo state={state} status={status} />
          </div>
        ))}
      </DndContext>
    </div>
  );
}
