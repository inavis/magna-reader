import logo from './logo.svg';
import './App.css';
import { Manga } from './Components/Manga';

function App() {
  return (
    <div className="App">
      {/* <div className='appbar yellow-text display-4 mb-5 p-2'>MANGA</div> */}
      <Manga/>
    </div>
  );
}

export default App;
