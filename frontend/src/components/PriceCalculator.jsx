import { useState, useEffect } from 'react';
import { calculatePrice } from '../api/pricing';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { Calculator } from 'lucide-react';
import { getMaterials, getExtras } from '../api/admin';

const PriceCalculator = () => {
  const [formData, setFormData] = useState({
    width_ft: '',
    height_ft: '',
    material: 'vinyl', // Default, but will try to load from API
    quantity: 1,
    lamination: false,
    frame: false,
  });

  const [materials, setMaterials] = useState([]);
  const [extras, setExtras] = useState([]);
  const [loadingExtras, setLoadingExtras] = useState(false);

  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  // Load materials and extras on mount
  useEffect(() => {
    const fetchOptions = async () => {
      setLoadingExtras(true);
      try {
        const [mats, exts] = await Promise.all([
          getMaterials().catch(() => []), 
          getExtras().catch(() => [])
        ]);
        
        // Fallback if API fails or returns empty (though backend should have data)
        const loadedMaterials = mats.length > 0 ? mats : [
          { id: 1, name: 'vinyl' },
          { id: 2, name: 'canvas' },
          { id: 3, name: 'paper' }
        ];
        
        setMaterials(loadedMaterials);
        setExtras(exts);
        
        // Set default material
        if (loadedMaterials.length > 0) {
            setFormData(prev => ({ ...prev, material: loadedMaterials[0].name }));
        }

      } catch (err) {
        console.error("Failed to load options", err);
        // Fallback hardcoded
         setMaterials([
          { id: 1, name: 'vinyl' },
          { id: 2, name: 'canvas' },
          { id: 3, name: 'paper' }
        ]);
      } finally {
        setLoadingExtras(false);
      }
    };
    fetchOptions();
  }, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Reset pricing when inputs change to force re-calculation
    setPricing(null); 
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...formData,
        width_ft: parseFloat(formData.width_ft),
        height_ft: parseFloat(formData.height_ft),
        quantity: parseInt(formData.quantity),
      };
      
      const result = await calculatePrice(data);
      setPricing(result);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!pricing) return;
    
    addToCart({
      ...formData,
      width_ft: parseFloat(formData.width_ft),
      height_ft: parseFloat(formData.height_ft),
      quantity: parseInt(formData.quantity),
      unit_price: pricing.unit_price,
      total_price: pricing.total_price,
    });
    
    // Reset form or keep it? Usually keep it in case they want to add another similar item
    // setPricing(null); 
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-slate-200 max-w-4xl mx-auto">
      <div className="px-4 py-5 sm:px-6 bg-indigo-600 text-white flex items-center">
        <Calculator className="h-6 w-6 mr-2" />
        <h3 className="text-lg leading-6 font-medium">Quick Price Calculator</h3>
      </div>
      <div className="px-4 py-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Form */}
        <form onSubmit={handleCalculate} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Width (ft)</label>
              <input
                type="number"
                name="width_ft"
                required
                min="0.1"
                step="0.1"
                value={formData.width_ft}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Height (ft)</label>
              <input
                type="number"
                name="height_ft"
                required
                min="0.1"
                step="0.1"
                value={formData.height_ft}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Material</label>
            <select
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
            >
              {materials.map((m) => (
                <option key={m.id || m.name} value={m.name}>
                  {m.name.charAt(0).toUpperCase() + m.name.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              required
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
            />
          </div>

          <div className="flex items-center space-x-4">
             <div className="flex items-center">
              <input
                id="lamination"
                name="lamination"
                type="checkbox"
                checked={formData.lamination}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="lamination" className="ml-2 block text-sm text-slate-900">
                Lamination
              </label>
            </div>
             <div className="flex items-center">
              <input
                id="frame"
                name="frame"
                type="checkbox"
                checked={formData.frame}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="frame" className="ml-2 block text-sm text-slate-900">
                Frame
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Calculating...' : 'Get Price'}
          </button>
        </form>

        {/* Results Area */}
        <div className="bg-slate-50 p-6 rounded-lg flex flex-col justify-center items-center text-center">
          {!pricing ? (
            <div className="text-slate-500">
              <p>Enter dimensions and quantity to see pricing.</p>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <div>
                <span className="block text-sm font-medium text-slate-500">Unit Price</span>
                <span className="block text-2xl font-bold text-slate-900">₹{pricing.unit_price.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <span className="block text-sm font-medium text-slate-500">Total Price</span>
                <span className="block text-4xl font-extrabold text-indigo-600">₹{pricing.total_price.toFixed(2)}</span>
              </div>
              <button
                onClick={handleAddToCart}
                className="mt-4 w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
