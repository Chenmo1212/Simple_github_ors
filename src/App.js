import './App.css';
import Header from './components/Header/Header';
import PRList from './components/PRList/PRList';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <PRList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
