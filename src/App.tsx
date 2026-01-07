import { useState, useEffect } from 'react'
import './App.css'
import { LetterCard } from './components/LetterCard'
import lettersData from './letters.json'

function App() {
  // Inizializza lo stato leggendo dal LocalStorage, se esiste, altrimenti usa il JSON
  const [letters, setLetters] = useState(() => {
    const saved = localStorage.getItem('epistolary_archive')
    return saved ? JSON.parse(saved) : lettersData
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [isWriting, setIsWriting] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [filterTag, setFilterTag] = useState<string>('All')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Salva nel LocalStorage ogni volta che la lista 'letters' cambia
  useEffect(() => {
    localStorage.setItem('epistolary_archive', JSON.stringify(letters))
  }, [letters])

  const filteredLetters = letters
    .filter(letter => {
      const matchesSearch = letter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            letter.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = filterTag === 'All' || letter.tag === filterTag
      return matchesSearch && matchesTag
    })
    .sort((a, b) => sortOrder === 'desc' ? b.id - a.id : a.id - b.id)

  const handleSaveLetter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    if (editingId) {
      // MODIFICA: Aggiorna la lettera esistente
      setLetters(letters.map((l: any) => l.id === editingId ? {
        ...l,
        title: (formData.get('title') as string),
        content: (formData.get('content') as string),
        sender: (formData.get('sender') as string),
        tag: (formData.get('tag') as string)
      } : l))
      setEditingId(null)
    } else {
      // CREAZIONE: Aggiunge una nuova lettera
      const newLetter = {
        id: Date.now(),
        title: (formData.get('title') as string) || 'Senza Titolo',
        date: new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }),
        content: (formData.get('content') as string) || '',
        sender: (formData.get('sender') as string) || 'Anonimo',
        tag: (formData.get('tag') as string) || 'Nessuno'
      }
      setLetters([newLetter, ...letters])
    }
    setIsWriting(false)
  }

  const handleDeleteLetter = (id: number) => {
    if (window.confirm("Sei sicuro di voler bruciare questa lettera per sempre?")) {
      setLetters(letters.filter((l: any) => l.id !== id))
    }
  }

  const handleEditLetter = (letter: any) => {
    setEditingId(letter.id)
    setIsWriting(true)
    // Scrolla verso l'alto per vedere il form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const letterToEdit = letters.find((l: any) => l.id === editingId)

  return (
    <div className="app-container">
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Chronicles Epistolary</h1>
        <p>Benvenuto nel tuo archivio epistolare.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <input 
          type="text" 
          placeholder="Cerca nell'archivio..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.8rem',
            width: '300px',
            backgroundColor: '#2a2420',
            border: '1px solid #8c7b65',
            color: '#e0d8c3',
            fontFamily: 'inherit'
          }}
        />
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            value={filterTag} 
            onChange={(e) => setFilterTag(e.target.value)}
            style={{ padding: '0.5rem', backgroundColor: '#2a2420', border: '1px solid #8c7b65', color: '#e0d8c3' }}
          >
            <option value="All">Tutte le Categorie</option>
            <option value="Nessuno">Senza Etichetta</option>
            <option value="Urgente">Urgente</option>
            <option value="Segreto">Segreto</option>
            <option value="Personale">Personale</option>
            <option value="Ufficiale">Ufficiale</option>
          </select>

          <button onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')} style={{ minWidth: '140px' }}>
            {sortOrder === 'desc' ? '↓ Più Recenti' : '↑ Più Antiche'}
          </button>
        </div>
        
        {!isWriting ? (
          <button onClick={() => {
            setEditingId(null) // Resetta l'editing se si clicca su "Scrivi Nuova"
            setIsWriting(true)
          }} style={{
            backgroundColor: '#c9a959',
            color: '#1a1510',
            border: 'none',
            fontWeight: 'bold'
          }}>
            + Scrivi Lettera
          </button>
        ) : (
          <form 
            key={editingId || 'new'} // Forza il re-render del form quando cambia modalità per resettare i campi
            onSubmit={handleSaveLetter} 
            style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#231e19',
            padding: '1rem',
            border: '1px solid #8c7b65'
          }}>
            <select name="tag" defaultValue={letterToEdit?.tag || 'Nessuno'} style={{ padding: '0.5rem', backgroundColor: '#1a1510', border: '1px solid #5a4a3a', color: '#e0d8c3' }}>
              <option value="Nessuno">-- Nessuna Etichetta --</option>
              <option value="Urgente">Urgente</option>
              <option value="Segreto">Segreto</option>
              <option value="Personale">Personale</option>
              <option value="Ufficiale">Ufficiale</option>
            </select>
            <input name="title" defaultValue={letterToEdit?.title} placeholder="Oggetto della lettera" required style={{ padding: '0.5rem', backgroundColor: '#1a1510', border: '1px solid #5a4a3a', color: '#e0d8c3' }} />
            <input name="sender" defaultValue={letterToEdit?.sender} placeholder="Mittente (es. Il tuo nome)" required style={{ padding: '0.5rem', backgroundColor: '#1a1510', border: '1px solid #5a4a3a', color: '#e0d8c3' }} />
            <textarea name="content" defaultValue={letterToEdit?.content} placeholder="Scrivi qui il tuo messaggio..." rows={5} required style={{ padding: '0.5rem', backgroundColor: '#1a1510', border: '1px solid #5a4a3a', color: '#e0d8c3', fontFamily: 'inherit' }} />
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => { setIsWriting(false); setEditingId(null); }} style={{
                backgroundColor: 'transparent',
                color: '#8c7b65',
                border: '1px solid #8c7b65'
              }}>
                Annulla
              </button>
              <button type="submit" style={{
                backgroundColor: '#c9a959',
                color: '#1a1510',
                border: 'none',
                fontWeight: 'bold'
              }}>
                {editingId ? 'Salva Modifiche' : 'Invia Lettera'}
              </button>
            </div>
          </form>
        )}
        
        </div>
      </header>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {filteredLetters.length > 0 ? (
          filteredLetters.map((letter) => (
            <LetterCard 
              key={letter.id}
              title={letter.title}
              date={letter.date}
              content={letter.content}
              sender={letter.sender}
              onDelete={() => handleDeleteLetter(letter.id)}
              onEdit={() => handleEditLetter(letter)}
              tag={letter.tag}
            />
          ))
        ) : (
          <p style={{ color: '#8c7b65', fontStyle: 'italic', marginTop: '2rem', fontSize: '1.2rem' }}>
            Nessuna traccia trovata negli archivi...
          </p>
        )}
      </main>
    </div>
  )
}

export default App
