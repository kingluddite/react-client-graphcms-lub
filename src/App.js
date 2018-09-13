import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './App.css';

// components
import Post from './Posts/Post';
import Posts from './Posts/Posts';
import NewPostForm from './Posts/NewPost';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <h1 className="App-title">GraphQL Blog</h1>
            </Link>
          </header>

          <main>
            <Switch>
              <Route path="/" exact component={Posts} />
              <Route path="/post/new" component={NewPostForm} />
              <Route path="/post/:id" component={Post} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
