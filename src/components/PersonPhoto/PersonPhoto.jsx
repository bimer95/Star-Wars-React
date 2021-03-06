import PropTypes from 'prop-types';
import { removePersonFromFavorite, setPersonToFavorite } from '../../store/actions';
import styles from './PersonPhoto.module.css';
import iconFavorite from './img/heart.png';
import iconFavoriteFill from './img/favorite-fill.svg';
import { useDispatch } from 'react-redux';

const PersonPhoto = ({ personId, personPhoto, personName, personFavorite, setPersonFavorite }) => {
   
    const dispatch = useDispatch();

    const dispatchFavoritePeople = () => {
        if (personFavorite) {
            dispatch(removePersonFromFavorite(personId));
            setPersonFavorite(false);
        } else {
            dispatch(setPersonToFavorite({
                [personId]: {
                    name: personName,
                    img: personPhoto
                },
            }));
            setPersonFavorite(true);
        }
    }
    return (
        <>
        <div className={styles.container}>
            <img className={styles.photo} src={personPhoto} alt={personName} />
            <img
                src={personFavorite ? iconFavoriteFill : iconFavorite}
                onClick={dispatchFavoritePeople}
                className={styles.favorite}
                alt="Add to favorite"
            />
        </div>
    </>
    )
}

PersonPhoto.propTypes = {
    personId: PropTypes.string,
    personPhoto: PropTypes.string,
    personName: PropTypes.string,
    personFavorite: PropTypes.bool,
    setPersonFavorite: PropTypes.func,
}

export default PersonPhoto;
