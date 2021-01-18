import React, { useCallback } from 'react';

import styles from './TablePagination.module.scss';

import classNames from 'classnames';

const TablePagination = ({
    onPageChangeCallback, currentPage, totalPages,
}) => {

    const firstPageNumer = currentPage - 2 > 0 ? currentPage - 2 : 1;
    const lastPageNumber = firstPageNumer + 4 <= totalPages ? firstPageNumer + 4 : totalPages;

    const onChangePage = useCallback(page => {
        onPageChangeCallback(page);
    }, [onPageChangeCallback]);

    const renderPaginationButtons = () => {
        const buttons = []

        for (let pageNumber = firstPageNumer; pageNumber <= lastPageNumber; pageNumber++) {
            const buttonStyle = classNames(styles.pageButton, pageNumber === currentPage && styles.pageButtonSelected);

            buttons.push((
                <button 
                    className={buttonStyle}
                    key={pageNumber}
                    onClick={() => onChangePage(pageNumber)}
                >
                    {pageNumber}
                </button>
            ));
        }

        return buttons;
    };

    const renderNextButton = () => {
        if(currentPage === totalPages) return null;

        return (
            <button
                className={styles.navigateButtons}
                onClick={() => onChangePage(currentPage + 1)}
            >
               {">"}
            </button>
        );
    }

    const renderPreviousButton = () => {
        if(currentPage === firstPageNumer) return null;

        return (
            <button
                className={styles.navigateButtons}
                onClick={() => onChangePage(currentPage - 1)}
            >
               {"<"}
            </button>
        );
    }

    const renderFirstPageButton = () => {
        if (currentPage <= firstPageNumer + 1) return null;

        return (
            <button
                className={styles.navigateButtons}
                onClick={() => onChangePage(1)}
            >
               {"<<"}
            </button>
        );
    }
    
    const renderLastPageButton = () => {
        if (currentPage >= totalPages - 1) return null;

        return (
            <button
                className={styles.navigateButtons}
                onClick={() => onChangePage(totalPages)}
            >
               {">>"}
            </button>
        );
    }

    return (
        <div className={styles.container}>
            {renderFirstPageButton()}
            {renderPreviousButton()}
            {renderPaginationButtons()}
            {renderNextButton()}
            {renderLastPageButton()}
        </div>
    );
}

export default TablePagination;