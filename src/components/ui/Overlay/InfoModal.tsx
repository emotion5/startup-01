import { useStore } from '../../../hooks/useStore';
import styles from './InfoModal.module.css';
import { useNavigate } from 'react-router-dom';

const InfoModal = () => {
    const { isModalOpen, modalContent, closeModal, selectedProject, selectedCompany } = useStore();
    const navigate = useNavigate();

    if (!isModalOpen) return null;

    return (
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closeModal}>
                    &times;
                </button>
                <div className={styles.content}>
                    {selectedProject ? (
                        <>
                            <div style={{ marginBottom: '16px' }}>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    backgroundColor: selectedProject.status === 'in-progress' ? '#dbeafe' : selectedProject.status === 'completed' ? '#dcfce7' : '#f3f4f6',
                                    color: selectedProject.status === 'in-progress' ? '#1e40af' : selectedProject.status === 'completed' ? '#166534' : '#374151',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                    marginBottom: '8px'
                                }}>
                                    {selectedProject.status === 'in-progress' ? 'In Progress' : selectedProject.status === 'completed' ? 'Completed' : 'Planning'}
                                </span>
                                <h2 style={{ marginTop: 0, marginBottom: '5px', color: '#1e293b' }}>{selectedProject.title}</h2>
                                <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '9999px', height: '8px', marginBottom: '16px' }}>
                                    <div style={{ backgroundColor: '#3b82f6', height: '8px', borderRadius: '9999px', width: `${selectedProject.progress}%` }}></div>
                                </div>
                            </div>

                            <p style={{ lineHeight: '1.6', color: '#334155', marginBottom: '20px' }}>
                                {selectedProject.description}
                            </p>

                            {selectedCompany && (
                                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', fontSize: '0.9rem', color: '#475569' }}>
                                    <h4 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>🏢 수행 기업: {selectedCompany.name}</h4>
                                    <div style={{ marginBottom: '8px' }}>
                                        <strong>📅 설립일:</strong> {selectedCompany.foundedDate}
                                    </div>
                                    <div style={{ marginBottom: '8px' }}>
                                        <strong>📍 주소:</strong> {selectedCompany.address}
                                    </div>
                                    <div style={{ marginBottom: '8px' }}>
                                        <strong>🌐 웹사이트:</strong> <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>{selectedCompany.website}</a>
                                    </div>
                                    <div>
                                        <strong>✉️ 이메일:</strong> <a href={`mailto:${selectedCompany.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>{selectedCompany.email}</a>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    closeModal();
                                    navigate(`/project/${selectedProject.id}/workhub`);
                                }}
                                style={{
                                    marginTop: '20px',
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '1rem'
                                }}
                            >
                                📋 프로젝트 내용보기 (WorkHub)
                            </button>
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
