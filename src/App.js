import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import StoryList from './pages/StoryList';
import StoryPage from './pages/StoryPage';

function App() {

  return (
    <Router>
      <div className="flex h-full flex-col overflow-hidden">
        <Header />
        <Switch>
          <Route exact path="/">
            <StoryList />
          </Route>
          <Route path="/item/:item">
            <StoryPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
