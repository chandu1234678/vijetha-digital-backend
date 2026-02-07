import PriceCalculator from '../components/PriceCalculator';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Professional Printing <span className="text-indigo-600">Made Simple</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-slate-500">
            Get instant quotes for vinyl, canvas, and paper prints. Order online in seconds.
          </p>
        </div>
        <PriceCalculator />
      </div>
    </div>
  );
};

export default Home;
