import React, { useState, useEffect } from 'react';
import './App.css';
import { realApi } from './realApi';

function App() {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [processingId, setProcessingId] = useState(localStorage.getItem('processingId') || '');

  useEffect(() => {
    if (processingId && !videoUrl) {
      setIsProcessing(true);
      pollStatus();
    }
  }, [processingId, videoUrl]);

  const pollStatus = async () => {
    try {
      const data = await realApi.getStatus(processingId);
      
      if (data.status === 'completed' && data.videoUrl) {
        // Success: clear text, show video, stop processing
        setText('');
        setVideoUrl(data.videoUrl);
        setIsProcessing(false);
        setProcessingId('');
        localStorage.removeItem('processingId');
      } else if (data.status === 'failed' || data.error) {
        // Show processing errors
        setError(data.error || 'Processing failed');
        setIsProcessing(false);
        setProcessingId('');
        localStorage.removeItem('processingId');
      } else {
        // Keep processing - continue polling
        setTimeout(pollStatus, 1000);
      }
    } catch (err) {
      setError('Failed to check status');
      setIsProcessing(false);
      setProcessingId('');
      localStorage.removeItem('processingId');
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    
    // Clear all previous states first
    setError('');
    setVideoUrl('');
    
    // Then start processing
    setIsProcessing(true);
    
    try {
      const data = await realApi.convert(text);
      setProcessingId(data.id);
      localStorage.setItem('processingId', data.id);
      // Don't call pollStatus here - let useEffect handle it
    } catch (err) {
      setError('Network error occurred');
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = 'converted-video.mp4';
    a.click();
  };

  const handleReset = () => {
    setText('');
    setIsProcessing(false);
    setError('');
    setVideoUrl('');
    setProcessingId('');
    localStorage.removeItem('processingId');
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Text to Video Converter</h1>
        
        <div className="input-section">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            maxLength={5000}
            disabled={isProcessing}
          />
          <div className="char-counter">{text.length}/5000</div>
          
          <button 
            onClick={handleSubmit}
            disabled={isProcessing || !text.trim()}
            className="submit-btn"
          >
            {isProcessing ? 'Processing...' : 'Convert to Video'}
          </button>
        </div>

        {error && (
          <div className="error">{error}</div>
        )}

        {isProcessing && !error && (
          <div className="status">
            <div className="spinner"></div>
            <p>Converting your text to video...</p>
          </div>
        )}

        {videoUrl && (
          <div className="success">
            <p>Video ready!</p>
            <video 
              src={videoUrl} 
              controls 
              className="video-preview"
              width="100%"
              height="300"
            >
              Your browser does not support the video tag.
            </video>
            <button onClick={handleDownload} className="download-btn">
              Download Video
            </button>
          </div>
        )}

        <button onClick={handleReset} className="reset-btn">
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
