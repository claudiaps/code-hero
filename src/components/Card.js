import React, { useCallback, useState } from 'react';
import styles from './Card.module.scss'
import ComicsModal from './ComicsModal';

const Card = ({
    children, hoverContent,
    characterName, characterId,
    isMobile,
}) => {
    
    const [ modalVisible, setModalVisible ] = useState(false)

    const handleOpenDialog = useCallback(() => {
        setModalVisible(true);
    }, [setModalVisible]);

    const handleCloseDialog = useCallback(() => {
        setTimeout(() => {
            setModalVisible(false);
        })
    }, [setModalVisible]);

    const renderModal = useCallback(() => {
        return (
            isMobile && modalVisible ? (
                <ComicsModal 
                    characterName={characterName}
                    characterId={characterId}
                    onClose={handleCloseDialog}
                    visible={modalVisible}
                />
            ) : null
        );
    }, [modalVisible, handleCloseDialog, characterName, characterId, isMobile])

    return (
        <div className={styles.container} onClick={handleOpenDialog}>
            {renderModal()}
            <div className={styles.cardContainer}>
                {children}
            </div>
            <div className={styles.cardHover}>
                {hoverContent}
            </div>
        </div>
    );
}

export default Card;