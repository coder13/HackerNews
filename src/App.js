import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import StoryList from './pages/StoryList';
import StoryPage from './pages/StoryPage';
import UserPage from './pages/UserPage';

function App() {

  return (
    <Router>
      <div className="flex h-full flex-col overflow-hidden">
        <Header />
        <Switch>
          <Route exact path="/">
            <StoryList title="Top Stories" url="/topstories" />
          </Route>
          <Route exact path="/newest">
            <StoryList title="Newest Stories" url="/newstories" />
          </Route>
          <Route exact path="/best">
            <StoryList title="Best Stories" url="/beststories" />
          </Route>
          <Route path="/item/:item">
            <StoryPage />
          </Route>
          <Route path="/user/:user">
            <UserPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
