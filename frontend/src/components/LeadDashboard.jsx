import { useState, useEffect } from 'react';
import axios from 'axios';

const LeadDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({
    minBudget: '',
    maxBudget: '',
    location: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get('https://lead-assesment.onrender.com/api/leads');
      setLeads(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching leads');
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    if (filters.minBudget && lead.budget < filters.minBudget) return false;
    if (filters.maxBudget && lead.budget > filters.maxBudget) return false;
    if (
      filters.location &&
      (!lead.location || !lead.location.toLowerCase().includes(filters.location.toLowerCase()))
    )
      return false;
    return true;
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]:
        e.target.name === 'minBudget' || e.target.name === 'maxBudget'
          ? Number(e.target.value) || ''
          : e.target.value,
    });
  };

  if (loading)
    return <div className="text-center p-6 text-gray-700 text-lg">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-6 text-red-600 font-semibold text-lg">{error}</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center sm:text-left">
        Lead Dashboard
      </h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="minBudget"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Min Budget
          </label>
          <input
            type="number"
            id="minBudget"
            name="minBudget"
            value={filters.minBudget}
            onChange={handleFilterChange}
            placeholder="e.g. 1000"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2
              text-gray-900 placeholder-gray-400
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition duration-300 ease-in-out"
          />
        </div>

        <div>
          <label
            htmlFor="maxBudget"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Max Budget
          </label>
          <input
            type="number"
            id="maxBudget"
            name="maxBudget"
            value={filters.maxBudget}
            onChange={handleFilterChange}
            placeholder="e.g. 5000"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2
              text-gray-900 placeholder-gray-400
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition duration-300 ease-in-out"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            placeholder="Enter location"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2
              text-gray-900 placeholder-gray-400
              shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition duration-300 ease-in-out"
          />
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLeads.map((lead) => (
          <div
            key={lead._id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 truncate max-w-[70%]">
                {lead.name}
              </h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 select-none">
                Score: {lead.score}
              </span>
            </div>
            <div className="space-y-2 text-gray-700 text-sm sm:text-base">
              <p>
                <span className="font-semibold">Email:</span> {lead.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {lead.phone}
              </p>
              <p>
                <span className="font-semibold">Budget:</span> ${lead.budget}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {lead.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-lg">
          No leads found matching the current filters.
        </div>
      )}
    </div>
  );
};

export default LeadDashboard;
