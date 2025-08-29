'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
  const { id } = useParams();
  const safeId = typeof id === 'string' ? id : '';

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', safeId],
    queryFn: () => fetchNoteById(safeId),
    enabled: !!safeId, 
    refetchOnMount: false,
  });

  if (!safeId) return <p>Invalid note ID.</p>;
  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
