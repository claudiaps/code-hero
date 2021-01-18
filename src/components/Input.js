import React, { useCallback } from 'react';
import styles from './Input.module.scss'

const Input = ({
    name, label, type,
    placeholder, onChange
}) => {

    const handleInputChange = useCallback(event => {
        const { target: { value } } = event
        onChange(value)
    }, [onChange])

    return (
        <>
            <p className={styles.label}>{label}</p>
            <div className={styles.inputContainer}>
                <input 
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className={styles.input}
                    onChange={handleInputChange}
                />
            </div>
        </>
    );
}

export default Input;