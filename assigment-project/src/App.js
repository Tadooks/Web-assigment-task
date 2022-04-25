import React, { Component } from 'react';
import GetOnlinePosts from './components/OnlinePosts/GetOnlinePosts';
import './App.css';
import GetLocalPosts from './components/LocalPosts/GetLocalPosts';


class App extends Component {
  render() {
    return (
      <div className="App">

        {/* <h1 className="header">Local Storage</h1> */}
    
        {/* <GetLocalPosts/>
        <br/> */}

        <h1 className="header"><b><span>Countries</span></b></h1>
        <GetOnlinePosts/>
      </div>
    );
  }
}
  
export default App;
