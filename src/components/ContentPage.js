import React from 'react';
import styles from './ContentPage.module.scss'

const ContentPage = ({
    children, title,
}) => {

    return (
        <div className={styles.mainContainer}>
            { title ? (
                <h1 className={styles.title}>
                    {title}
                </h1>
                ) : null
            }
            {children}
        </div>
    );
}

export default ContentPage;