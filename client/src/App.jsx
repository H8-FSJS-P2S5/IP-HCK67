
import axios from 'axios';
import React from 'react';
import NewsList from './components/NewsList'; // Import the NewsList component
import NavBar from './components/NavBar';


function App() {
  return (
    <div className="App">
      {/* Include the NavBar component */}
      
      <NavBar />
      {/* Include the NewsList component */}

      <NewsList />
    </div>
  );
}
export default App;



// // App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import Home from './Home';
// import AllArticles from './AllArticles';
// import IndonesianNews from './IndonesianNews';

// function App() {
//   return (
//     <Router>
//       <div>
//         <NavBar />
//         <Switch>
//           <Route path="/" exact component={Home} />
//           <Route path="/all-articles" component={AllArticles} />
//           <Route path="/indonesian-news" component={IndonesianNews} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;
