import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PeopleList from '../PeopleList';



import styles from './FavoritesPage.module.css';

const FavoritesPage = () => {
    const [people, setPeople] = useState([]);

    const storeDate = useSelector(state => state.favoriteReducer);

    useEffect(() => {
        const arr = Object.entries(storeDate);
        
        if (arr.length) {
            const res = arr.map(item => {
                return {
                    id: item[0],
                    ...item[1]
                }
            })

            setPeople(res);
        }
    
    }, []);

    return (
        <>
            <h1 className={styles.comment}>Любимые герои</h1>
            {people.length
                ? <PeopleList people={people} />
                : <h2 className={styles.comment}>No data</h2>
            }
            
        </>
    )
}

export default FavoritesPage;
