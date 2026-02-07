import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import OrdersTable from '../components/OrdersTable';
import { getMaterials, getExtras, createMaterial, createExtra } from '../api/admin';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [materials, setMaterials] = useState([]);
  const [extras, setExtras] = useState([]);
  const [newMaterial, setNewMaterial] = useState({ name: '', rate_per_sqft: '' });
  const [newExtra, setNewExtra] = useState({ name: '', price: '' });

  useEffect(() => {
    if (activeTab === 'materials') loadMaterials();
    if (activeTab === 'extras') loadExtras();
  }, [activeTab]);

  const loadMaterials = async () => {
    try {
      const data = await getMaterials();
      setMaterials(data);
    } catch (err) {
      toast.error('Failed to load materials');
    }
  };

  const loadExtras = async () => {
    try {
      const data = await getExtras();
      setExtras(data);
    } catch (err) {
      toast.error('Failed to load extras');
    }
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    try {
      await createMaterial({ ...newMaterial, rate_per_sqft: parseFloat(newMaterial.rate_per_sqft) });
      toast.success('Material added');
      setNewMaterial({ name: '', rate_per_sqft: '' });
      loadMaterials();
    } catch (err) {
      toast.error('Failed to add material');
    }
  };

  const handleAddExtra = async (e) => {
    e.preventDefault();
    try {
      await createExtra({ ...newExtra, price: parseFloat(newExtra.price) });
      toast.success('Extra added');
      setNewExtra({ name: '', price: '' });
      loadExtras();
    } catch (err) {
      toast.error('Failed to add extra');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-b border-slate-200 mb-6">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {['orders', 'materials', 'extras'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === 'orders' && <OrdersTable />}

          {activeTab === 'materials' && (
            <div className="space-y-6">
              <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-slate-900">Add New Material</h3>
                <form onSubmit={handleAddMaterial} className="mt-5 sm:flex sm:items-center">
                  <div className="w-full sm:max-w-xs">
                    <label htmlFor="material-name" className="sr-only">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="material-name"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border"
                      placeholder="Material Name"
                      value={newMaterial.name}
                      onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="w-full sm:max-w-xs sm:ml-4 mt-3 sm:mt-0">
                     <label htmlFor="material-rate" className="sr-only">Rate (per sqft)</label>
                    <input
                      type="number"
                      name="rate"
                      id="material-rate"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border"
                      placeholder="Rate per sqft"
                      value={newMaterial.rate_per_sqft}
                      onChange={(e) => setNewMaterial({ ...newMaterial, rate_per_sqft: e.target.value })}
                      required
                      step="0.01"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add
                  </button>
                </form>
              </div>

              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-slate-200">
                  {materials.map((material) => (
                    <li key={material.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate capitalize">{material.name}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            ₹{material.rate_per_sqft}/sqft
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'extras' && (
            <div className="space-y-6">
               <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-slate-900">Add New Extra</h3>
                <form onSubmit={handleAddExtra} className="mt-5 sm:flex sm:items-center">
                  <div className="w-full sm:max-w-xs">
                    <label htmlFor="extra-name" className="sr-only">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="extra-name"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border"
                      placeholder="Extra Name"
                      value={newExtra.name}
                      onChange={(e) => setNewExtra({ ...newExtra, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="w-full sm:max-w-xs sm:ml-4 mt-3 sm:mt-0">
                     <label htmlFor="extra-price" className="sr-only">Price</label>
                    <input
                      type="number"
                      name="price"
                      id="extra-price"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-300 rounded-md p-2 border"
                      placeholder="Price"
                      value={newExtra.price}
                      onChange={(e) => setNewExtra({ ...newExtra, price: e.target.value })}
                      required
                      step="0.01"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add
                  </button>
                </form>
              </div>

               <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-slate-200">
                  {extras.map((extra) => (
                    <li key={extra.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate capitalize">{extra.name}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            ₹{extra.price}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
