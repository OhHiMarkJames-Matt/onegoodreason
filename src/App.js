import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import Navbar from "./components/Navbar";
import List from './pages/list'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context";


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main className='main'>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/List" element={<List />} />
            </Routes>
          </Router>
        </main>
      </ApolloProvider>
    </div>
  );
}

export default App;
