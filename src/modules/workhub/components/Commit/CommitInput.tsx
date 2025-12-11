import React, { useState } from 'react';
import styles from '../../styles/commit.module.css';

interface CommitInputProps {
    onCommit: (title: string, description: string) => void;
}

const CommitInput: React.FC<CommitInputProps> = ({ onCommit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onCommit(title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <div className={styles.inputContainer}>
            <h3 style={{ margin: '0 0 10px', fontSize: '1.1rem' }}>New Commit</h3>
            <form onSubmit={handleSubmit}>
                <input
                    className={styles.inputField}
                    type="text"
                    placeholder="Commit title (e.g., Fix login bug)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className={`${styles.inputField} ${styles.textarea}`}
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit" className={styles.submitButton}>
                    Commit Changes
                </button>
            </form>
        </div>
    );
};

export default CommitInput;
