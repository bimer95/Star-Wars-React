import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { API_PERSON } from '../../constants/api'
import styles from './PersonPage.module.css';
import PersonPhoto from '../PersonPhoto/PersonPhoto';
import PersonInfo from '../PersonInfo/PersonInfo';
import { getApiResource } from '../../utils/network';
import { getPeopleImage } from '../../services/getPeopleData';
import { useSelector } from 'react-redux';

const PersonPage = ({ match }) => {
    const [personId, setPersonId] = useState(null);
    const [personInfo, setPersonInfo] = useState(null);
    const [personName, setPersonName] = useState(null);
    const [personPhoto, setPersonPhoto] = useState(null);
    const [personFavorite, setPersonFavorite] = useState(false);

    const storeDate = useSelector(state => state.favoriteReducer);

    useEffect(() => {
        (async () => {
            const id = match.params.id;
            const res = await getApiResource(`${API_PERSON}/${id}/`);

            storeDate[id] ? setPersonFavorite(true) : setPersonFavorite(false);

            setPersonId(id);

            if (res) {
                setPersonInfo([
                    { title: 'Height', data: res.height },
                    { title: 'Mass', data: res.mass },
                    { title: 'Hair Color', data: res.hair_color },
                    { title: 'Skin Color', data: res.skin_color },
                    { title: 'Eye Color', data: res.eye_color },
                    { title: 'Birth Year', data: res.birth_year },
                    { title: 'Gender', data: res.gender },
                ]);

                setPersonName(res.name);
                setPersonPhoto(getPeopleImage(id));

                // res.films

          
            }
        })();
    }, []);

    return (
        <>
            <div className={styles.wrapper}>
                <span className={styles.person__name}>{personName}</span>
                
                <div className={styles.container}>
                    <PersonPhoto
                    personId={personId}
                        personPhoto={personPhoto}
                        personName={personName}
                        personFavorite={personFavorite}
                        setPersonFavorite={setPersonFavorite}
                    />

                    {personInfo && <PersonInfo personInfo={personInfo} />}
                </div>


            </div>
        </>
    )
}

PersonPage.propTypes = {
    match: PropTypes.object,
    
}

export default PersonPage;
