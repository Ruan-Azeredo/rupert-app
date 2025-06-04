import React, { useState } from 'react';

const App: React.FC = () => {
    const [transcript, setTranscript] = useState<string>('');
    const [input, setInput] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleAddToTranscript = () => {
        setTranscript((prev) => (prev ? `${prev}\n${input}` : input));
        setInput('');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Transcript App</h1>
            <textarea
                value={transcript}
                readOnly
                rows={10}
                cols={50}
                style={{ marginBottom: '20px', width: '100%' }}
            />
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type here..."
                    style={{ marginRight: '10px', width: '70%' }}
                />
                <button onClick={handleAddToTranscript}>Add</button>
            </div>
        </div>
    );
};

export default App;