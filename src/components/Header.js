import React from 'react';

import logo from '../assets/logo_objective.png'

import styles from './Header.module.scss'

const Avatar = () => (
	<div className={styles.avatarContainer}>
		CB
	</div>
);

const Header = () => {
    return (
        <header className={styles.headerContainer}>
			
            <img src={logo} className={styles.logoContainer} alt="logo objective"/>

			<div className={styles.rightContent}>
				<div className={styles.textContainer}>
					<b><span>Cláudia L P Sampedro</span></b>
					<span>Teste de Front-End</span>
				</div>
				<Avatar/>
			</div>

        </header>
    );
}

export default Header;