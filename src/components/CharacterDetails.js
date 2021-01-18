import React, { useCallback, useState, useEffect } from 'react';

import axios from 'axios';

import styles from './CharacterDetails.module.scss';

const CharacterDetails = ({
    characterId, characterName
}) => {

    const [characterComics, setCharacterComics] = useState(null)

    const requestCharacterComics = useCallback(async () => {
        try {
            const { data: { data }} = await axios.get(`characters/${characterId}/comics`);
            setCharacterComics(data.results);
        } catch (ex) {
            console.warn(ex);
        }
    }, [characterId]);

    useEffect(() => {
        requestCharacterComics();
    }, [requestCharacterComics]);

    const formatImageUrl = useCallback(image => {
        const { path, extension } = image;
        return `${path}/portrait_small.${extension}`
    }, []);

    const renderComicsItems = () => {

        if(!characterComics?.length) return (
            <span>Esse porsonagem não aparece em nenhuma HQ</span>
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
                    {title}
                </div>
            );
        });
    }

    return (
        <div className={styles.container}>
            <h4>HQs - {characterName}</h4>
            {renderComicsItems()}
        </div>
    );
}

export default CharacterDetails;