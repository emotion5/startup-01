import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StartupCard.module.css'; // Reusing styles for now

interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
    companyName: string;
    status: string;
    progress: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, description, companyName, status, progress }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/exhibition/${id}`);
    };

    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.header}>
                <span className={styles.category} style={{
                    backgroundColor: status === 'in-progress' ? '#dbeafe' : status === 'completed' ? '#dcfce7' : '#f3f4f6',
                    color: status === 'in-progress' ? '#1e40af' : status === 'completed' ? '#166534' : '#374151'
                }}>
                    {status === 'in-progress' ? 'In Progress' : status === 'completed' ? 'Completed' : 'Planning'}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{progress}%</span>
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '8px' }}>by {companyName}</p>
            <p className={styles.description}>{description}</p>
            <button className={styles.button}>Enter Showroom</button>
        </div>
    );
};

export default ProjectCard;
