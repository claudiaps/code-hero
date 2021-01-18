import React, { useCallback, useState, useEffect } from 'react';

import axios from 'axios';

import ContentPage from '../components/ContentPage'
import Card from '../components/Card'
import Input from '../components/Input'
import TablePagination from '../components/TablePagination';
import CharacterDetails from '../components/CharacterDetails';
import styles from './CharactersListPage.module.scss'

const COLUMNS_WEB = [
    'Personagem',
    'Séries',
    'Eventos'
];

const COLUMNS_MOBILE = [
    'Personagem',
];

const TableHeader = ({
    isMobile
}) =>{ 

    const columnsToMap = isMobile ? COLUMNS_MOBILE : COLUMNS_WEB;

    return (
        <div className={styles.tableHeaderContainer}>
            {columnsToMap.map((column, index) => (
                <p
                    key={`${column} - ${index}`}
                    className={styles.tableHeaderText}
                    >
                    {column}
                </p>
            ))}
        </div>
    )
};

const TableItemArray = ({ array }) => {

    if(!array?.length) {
        return (
            <div  className={styles.columnContainer}/>
        );
    }

    return (
        <div className={styles.columnContainer}>
        {array.map((item, index) => (
            <div
                key={`${item.name} - ${index}`}
                className={styles.columnText}
            >
                {item.name}
            </div>
        ))}
    </div>
    );
}

const CharactersListPage = () => {

    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [requestOffset, setRequestOffset] = useState(0);
    const [loading, setLoding] = useState(false);
    const [characters, setCharacters] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [pages, setPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
 
    const requestCharacters = useCallback(async () => {
        console.log('requestCharacters')
        const params =  {
            orderBy: 'name',
            offset: requestOffset,
        };

        if (inputValue) {
            params['nameStartsWith'] = inputValue;
        }

        try {
            setLoding(true);
            const { data: { data } } = await axios.get('characters', {params});
            const { results, total, limit } = data

            const numberPages = Number.isSafeInteger(total / limit)
                ? total / limit
                : Math.trunc((total / limit) + 1);

            setPages(numberPages)
            setCharacters(results);
        } catch (ex) {
            console.warn(ex);
            alert('Não foi possível concluir a operação. Tente novamente mais tarde');
        } finally {
            setLoding(false);
        }

    }, [inputValue, requestOffset])

    const handlePageChange = useCallback(async nextPage => {
        setCurrentPage(nextPage)
        setRequestOffset((nextPage - 1) * 10)
    }, []);

    const handleChangeInput = useCallback(characterName => {
        setCurrentPage(1)
        setRequestOffset(0)
        setInputValue(characterName)
    }, []);

    const handleWindowResize = useCallback(() => {
        setWindowSize(window.innerWidth)
    }, [])

    useEffect(() => {
        console.log('useEffect')
        requestCharacters();
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener('resize', window.innerWidt);
    }, [requestCharacters, handleWindowResize]);

    const renderInputForm = () => (
        <Input
            name="search"
            label="Nome do personagem"
            placeholder="Search"
            type="search"
            iconName=""
            onChange={handleChangeInput}
        />
    );

    const formatImageUrl = useCallback(image => {
        const { path, extension } = image;
        return `${path}/portrait_small.${extension}`
    }, []);

    const renderTableItem = character => {
        const { name, series, events, thumbnail, id } = character;
        const imageUrl = formatImageUrl(thumbnail);
        const isMobile = Boolean(windowSize < 600);

        return (
            <Card 
                key={id}
                hoverContent={ !isMobile ? (
                    <CharacterDetails
                        characterId={id}
                        characterName={name}
                    />
                ): null}
                characterId={id}
                characterName={name}
                isMobile={isMobile}
            >
                <div className={styles.characterColunm}>
                    <img 
                        src={imageUrl}
                        alt="foto do personagem"
                        className={styles.characterImage}
                    />
                    <h4 className={styles.characterName}>{name}</h4>
                </div>

                { !isMobile ? (
                    <>
                        <TableItemArray
                            array={series.items}
                        />
                        <TableItemArray
                            array={events.items}
                        />
                    </>
                ) : null }
            </Card>
        )
    }

    const renderTable = () => {

        if (loading) {
            return (
                <div className={styles.loadingIcon}>
                    <i className="fa fa-spinner fa-spin fa-2x"/>
                </div>
            );
        }

        if(!characters?.length) {
            return (
                <h4>Nenhum personagem com esse nome encontrado encontrado</h4>
            )
        }

        return (
            <div className={styles.tableContainer}>
                <TableHeader 
                    isMobile={Boolean(windowSize <= 600)}
                />
                {characters.map(character => renderTableItem(character))}
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <ContentPage
                title="Busca de personagens"
            >
                {renderInputForm()}
                {renderTable()}
            </ContentPage>
            {characters?.length ? (
                <TablePagination
                    totalPages={pages}
                    onPageChangeCallback={handlePageChange}
                    currentPage={currentPage}
                />
            ): null}
        </div>
    );
}

export default CharactersListPage;

