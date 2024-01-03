import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/home/home';
import CategoryItem from './screens/categoryItems/categoryItem';
import Checkout from './screens/checkout/checkout';
import Billing from './screens/billing/billing';

function App() {
  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category' element={<CategoryItem/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/billing' element={<Billing/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
  