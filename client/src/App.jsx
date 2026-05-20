import { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    fetch('/api/time')
      .then((res) => res.json())
      .then((data) => setTime(data.time));
  }, []);

  return <p>Server time: {time ?? 'loading...'}</p>;
}

export default App;
