import { useState, useEffect } from 'react';
import { getApiResource, changeHTTP } from '../../utils/network';
import { API_PEOPLE } from '../../constants/api';
import { getPeopleId, getPeopleImage, getPeoplePageId} from '../../services/getPeopleData';
import PeopleList from '../PeopleList';
import PropTypes from 'prop-types';

import styles from './PeoplePage.module.css';
import { useQueryParams } from '../../hoc/useQueryParams';
import PeopleNavigation from '../PeopleNavigation/PeopleNavigation';

const PeoplePage = () => {
    const [people, setPeople] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setnextPage] = useState(null);
    const [counterPage, setCounterPage] = useState(1);

    const query = useQueryParams();
    const queryPage = query.get('page');

    const getResource = async (url) => {
        const res = await getApiResource(url);
        
        const peopleList = res.results.map(({ name, url }) => {
            const id = getPeopleId(url);
            const img = getPeopleImage(id);

            return {
                id,
                name,
                img
            }
        })
        
        setPeople(peopleList);
        setPrevPage(changeHTTP(res.previous));
        setnextPage(changeHTTP(res.next));
        setCounterPage(getPeoplePageId(url))
    }

    useEffect(() => {
        getResource(API_PEOPLE+queryPage);
    }, [queryPage]);

    return (
        <>
        <PeopleNavigation
            getResource={getResource}
            prevPage={prevPage}
            nextPage={nextPage}
            counterPage={counterPage}
        />
        {people && <PeopleList people={people} />}
    </>
)
}

PeoplePage.propTypes = {
setErrorApi: PropTypes.func
}

export default PeoplePage;
