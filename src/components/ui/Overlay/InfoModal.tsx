import { useStore } from '../../../hooks/useStore';
import styles from './InfoModal.module.css';

const InfoModal = () => {
    const { isModalOpen, modalContent, closeModal, selectedStartup } = useStore();

    if (!isModalOpen) return null;

    return (
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closeModal}>
                    &times;
                </button>
                <div className={styles.content}>
                    {selectedStartup ? (
                        <>
                            <h2 style={{ marginTop: 0, marginBottom: '10px', color: '#1e293b' }}>{selectedStartup.name}</h2>
                            <span style={{
                                display: 'inline-block',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                backgroundColor: '#e2e8f0',
                                color: '#475569',
                                fontSize: '0.8rem',
                                marginBottom: '16px'
                            }}>
                                {selectedStartup.category || 'Startup'}
                            </span>
                            <p style={{ lineHeight: '1.6', color: '#334155', marginBottom: '20px' }}>
                                {selectedStartup.description}
                            </p>

                            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', fontSize: '0.9rem', color: '#475569' }}>
                                <div style={{ marginBottom: '8px' }}>
                                    <strong>📅 설립일:</strong> {selectedStartup.foundedDate}
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    <strong>📍 주소:</strong> {selectedStartup.address}
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    <strong>🌐 웹사이트:</strong> <a href={selectedStartup.website} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>{selectedStartup.website}</a>
                                </div>
                                <div>
                                    <strong>✉️ 이메일:</strong> <a href={`mailto:${selectedStartup.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>{selectedStartup.email}</a>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>{modalContent}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
