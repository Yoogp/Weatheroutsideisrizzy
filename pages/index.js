// pages/index.js
import { useState } from 'react';
import styles from '../styles/Home.module.css'; // Make sure the correct path is used

export default function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      setMessage('Please upload a Lua script!');
      return;
    }

    setIsLoading(true);
    setMessage('Processing your file...');

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/obfuscate', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setIsLoading(false);

    if (data.success) {
      setMessage('Script is clean and has been obfuscated!');
    } else {
      setMessage('Malicious code detected!');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lua Script Obfuscator</h1>
      <p className={styles.subtitle}>Upload your Roblox Lua script to check and obfuscate it.</p>
      
      <div className={styles.uploadContainer}>
        <input 
          type="file" 
          accept=".lua" 
          onChange={handleFileChange} 
          className={styles.fileInput}
        />
      </div>

      <button 
        onClick={handleSubmit} 
        className={`${styles.button} ${isLoading ? styles.disabledButton : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Obfuscate'}
      </button>

      {message && <p className={styles.message}>{message}</p>}
      
      {isLoading && (
        <div className={styles.spinner}></div> // Loading spinner animation
      )}
    </div>
  );
}
