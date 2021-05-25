import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../../components/Header';
import PeoplePage from '../../components/PeoplePage';
import PersonPage from '../../components/PersonPage/PersonPage';


import styles from './App.module.css';

const App = () => {
	return (
		<>
		 <BrowserRouter>
		 <div className={styles.wrapper}>
		 <Header />
	

		<Route path='/people' exact component={PeoplePage} />
		<Route path='/people/:id' exact component={PersonPage} />
		<Route path='/' exact component='' />
		</div>
		</BrowserRouter> 
		
		</>
	)
}

export default App;
