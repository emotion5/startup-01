import { useStore } from '../../../hooks/useStore';
import styles from './InfoModal.module.css';

const InfoModal = () => {
    const { isModalOpen, modalContent, closeModal } = useStore();

    if (!isModalOpen) return null;

    return (
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closeModal}>
                    &times;
                </button>
                <div className={styles.content}>
                    {modalContent}
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
