import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StartupCard.module.css';

interface StartupCardProps {
    id: string;
    name: string;
    description: string;
    category: string;
}

const StartupCard: React.FC<StartupCardProps> = ({ id, name, description, category }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/exhibition/${id}`);
    };

    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.header}>
                <span className={styles.category}>{category}</span>
            </div>
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.description}>{description}</p>
            <button className={styles.button}>Enter Showroom</button>
        </div>
    );
};

export default StartupCard;
