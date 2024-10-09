import { Search } from './components/Search/Search';
import { ScrollTopButton } from './components/ScrollTopButton/ScrollTopButton';
import './App.css';

const App = async () => {
  return (
    <div className="px-6 h-auto flex flex-col items-center justify-center ">
      <ScrollTopButton />
      <h1 className="mt-20 text-3xl font-extralight text-white md:text-6xl my-6 md:mt-40 text-center ">
        Compare your Air
      </h1>
      <p className="text-lg leading-6 text-white md:text-2xl mb-12 font-thin text-center max-w-2xl">
        Compare the air quality between cities in the UK. Select cities to
        compare using the search tool below.
      </p>
      <Search />
    </div>
  );
};

export default App;
