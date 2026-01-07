import React from 'react';

interface LetterCardProps {
  title: string;
  date: string;
  content: string;
  sender: string;
}

export function LetterCard({ title, date, content, sender }: LetterCardProps) {
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
    }}>
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