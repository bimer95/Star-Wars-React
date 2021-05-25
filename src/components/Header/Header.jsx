import { NavLink, } from 'react-router-dom';

import styles from './Header.module.css';

const Header = () => {
	return (
		<div className={styles.container}>
            <ul className={styles.list__container}>
	
		<NavLink to='/people/?page=1' exact> Главная</NavLink> 
		<NavLink to='/favorites' exact> Любимые герои</NavLink> 

		</ul>
        </div>
	)
}

export default Header;
