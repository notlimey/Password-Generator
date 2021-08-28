import './App.scss';
import Generator from './components/Generator';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

function App() {
  return (
    <>
      <section id="page">
        <h1 className="title">Password generator</h1>
        <Generator />
      </section>
      <footer id="footer">
        <p>Created with <FavoriteOutlinedIcon className="heart-icon"/> by <a href="https://github.com/NotLimey" rel="noreferrer" target="_blank">LIMEY</a></p>
      </footer>
    </>
  );
}

export default App;
