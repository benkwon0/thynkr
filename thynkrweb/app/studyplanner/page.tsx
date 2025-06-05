'use client';
import { useState } from 'react';

export default function StudyPlanner() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setResponse('');
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(data.text || data.error || 'No response');
    setLoading(false);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Hello! I'm Tink! Ask Away!</h1>
      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Ask Tink something..."
        rows={4}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <br />
      <button onClick={handleAsk} disabled={loading || !prompt}>
        {loading ? 'Thinking...' : 'Ask Tink'}
      </button>
      <div style={{ marginTop: 24, whiteSpace: 'pre-wrap' }}>
        {response}
      </div>
    </div>
  );
}