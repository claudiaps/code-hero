import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './ComicsModal.module.scss';

const ComicsModal = ({
    onClose, characterId, characterName,
}) => {
    const [characterComics, setCharacterComics] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleCloseModal = useCallback(() => {
        onClose();
    }, [onClose]);

    const requestCharacterComics = useCallback(async () => {
        try {
            setLoading(true);
            const { data: { data }} = await axios.get(`characters/${characterId}/comics`);
            setCharacterComics(data.results);
        } catch (ex) {
            console.warn(ex);
            alert('Não foi possível concluir a operação. Tente novamente mais tarde');
            handleCloseModal();
        } finally {
            setLoading(false);
        }
    }, [characterId, handleCloseModal]);

    useEffect(() => {
        requestCharacterComics();
    }, [requestCharacterComics]);

    const formatImageUrl = useCallback(image => {
        const { path, extension } = image;
        return `${path}/portrait_small.${extension}`
    }, []);

    const renderComicsItems = () => {

        if (loading) {
            return (
                <div className={styles.loadingIcon}>
                    <i className="fa fa-spinner fa-spin fa-2x"/>
                </div>
            );
        }

        if(!characterComics?.length) return (
            <div  className={styles.comicText}>Esse porsonagem não aparece em nenhuma HQ</div>
        );
        return characterComics.map(comic => {
            const { thumbnail, title, id } = comic;
            const imageUrl = formatImageUrl(thumbnail);

            return (
                <div className={styles.comicItem} key={id}>
                    <img 
                        src={imageUrl}
                        alt="foto do personagem"
                        className={styles.comicImage}
                    />
                    <div className={styles.comicText}>
                        {title}
                    </div>
                </div>
            );
        });
    }


    return (
        <div className={styles.container}>
            <h3 className={styles.title}>HQs - {characterName}</h3>
            <div className={styles.comicsList}>
                {renderComicsItems()}
            </div>
            <button
                className={styles.closeButton}
                onClick={handleCloseModal}
            >
                Fechar
            </button>
        </div>
    );
}

export default ComicsModal;