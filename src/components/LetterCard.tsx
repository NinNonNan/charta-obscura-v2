import React from 'react';

interface LetterCardProps {
  title: string;
  date: string;
  content: string;
  sender: string;
  onDelete?: () => void;
  onEdit?: () => void;
  tag?: string;
}

export function LetterCard({ title, date, content, sender, onDelete, onEdit, tag }: LetterCardProps) {
  // Funzione per determinare il colore del tag
  const getTagColor = (t: string) => {
    switch(t) {
      case 'Urgente': return '#8b0000'; // Rosso scuro
      case 'Segreto': return '#4b0082'; // Indaco
      case 'Personale': return '#2f4f4f'; // Grigio ardesia scuro
      default: return '#5a4a3a'; // Marrone standard
    }
  };

  return (
    <div style={{
      backgroundColor: '#f4e4bc', // Sfondo carta
      color: '#2c241b', // Testo inchiostro scuro
      padding: '2rem',
      margin: '1rem 0',
      borderRadius: '2px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
      maxWidth: '600px',
      fontFamily: '"Courier New", Courier, monospace', // Font macchina da scrivere
      position: 'relative', // Necessario per posizionare il bottone X
    }}>
      {onEdit && (
        <button 
          onClick={onEdit}
          style={{
            position: 'absolute',
            top: '10px',
            right: '40px', // Spostato a sinistra della X
            background: 'transparent',
            border: 'none',
            color: '#8c7b65',
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: '0 5px'
          }}
          title="Riscrivi questa lettera"
        >
          ✎
        </button>
      )}
      {onDelete && (
        <button 
          onClick={onDelete}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            color: '#8c7b65',
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: '0 5px'
          }}
          title="Brucia questa lettera"
        >
          &times;
        </button>
      )}
      
      {tag && tag !== 'Nessuno' && (
        <span style={{
          backgroundColor: getTagColor(tag),
          color: '#e0d8c3',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '0.5rem',
          display: 'inline-block',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          {tag}
        </span>
      )}

      <div style={{ borderBottom: '1px solid #8c7b65', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{title}</h2>
        <small style={{ fontStyle: 'italic', color: '#5a4a3a' }}>{date}</small>
      </div>
      <p style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>{content}</p>
      <div style={{ marginTop: '2rem', textAlign: 'right', fontStyle: 'italic', fontWeight: 'bold' }}>
        — {sender}
      </div>
    </div>
  );
}