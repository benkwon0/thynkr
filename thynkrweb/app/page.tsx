// app/layout.tsx
export default function Home() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <h1 className="roboto-condensed" style={{ fontSize: '15rem' }}>
        Thynkr
      </h1>
    </div>
  )
}

