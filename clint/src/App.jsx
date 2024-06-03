import    { Switch , Route,Redirect}    from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import store from './store/store.js'
import { Provider } from 'react-redux'

 
const App=() =>{
  
  return (
    <Provider store={store}>
    <div className="App">
      <Switch>
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
        <Route path="/" component={Home} exact />
         <Redirect to="/"></Redirect>
      </Switch>
    </div>
    </Provider>
  );
}

export default App;
