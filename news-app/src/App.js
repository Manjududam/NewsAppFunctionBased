  
import Navbar from './components/Navbar';
import News from "./components/News"
import Footer from './components/Footer';

import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
// import PropTypes from 'prop-types'
import { useState } from 'react';


function App() {
  const apiKey = (process.env.REACT_APP_NEWS_API);
  const [progress, setProgress] = useState(0)

  return (
    <>
    <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Switch>
          <Route exact path="/home">
          <News setProgress={setProgress} apiKey={apiKey} key="general" pagesize ={9} country="in" category= "general"/>
          </Route>
          <Route exact path="/business">
          <News setProgress={setProgress} apiKey={apiKey} key="business" pagesize ={9} country="in" category= "business"/>
          </Route>
          <Route exact path="/entertainment">
          <News setProgress={setProgress} apiKey={apiKey} key="entertainment" pagesize ={9} country="in" category= "entertainment"/>
          </Route>
          <Route exact path="/health">
          <News setProgress={setProgress} apiKey={apiKey} key="health" pagesize ={9} country="in" category= "health"/>
          </Route>
          <Route exact path="/science">
          <News setProgress={setProgress} apiKey={apiKey} key="science" pagesize ={9} country="in" category= "science"/>
          </Route>
          <Route exact path="/sports">
          <News setProgress={setProgress} apiKey={apiKey} key="sports" pagesize ={9} country="in" category= "sports"/>
          </Route>
          <Route exact path="/technology">
          <News setProgress={setProgress} apiKey={apiKey} key="technology" pagesize ={9} country="in" category= "technology"/>
          </Route>
        </Switch>
        </Router>
        <Footer/>
  
      </div>
    </>
    
  );
}

export default App;
