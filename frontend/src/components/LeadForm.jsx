import { useState } from 'react';
import axios from 'axios';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    location: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://lead-assesment.onrender.com/api/leads', formData);

      if (response.data.success) {
        setMessage('Lead submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          budget: '',
          location: ''
        });
      } else {
        setMessage('Error submitting lead. Please try again.');
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error submitting lead. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-wide">Contact Us</h2>

      {message && (
        <div className="mb-6 px-4 py-3 rounded-md bg-blue-50 text-blue-900 border border-blue-200 shadow-sm select-none">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/** Input Group Template **/}
        {[
          { id: 'name', label: 'Name', type: 'text' },
          { id: 'email', label: 'Email', type: 'email' },
          { id: 'phone', label: 'Phone', type: 'tel' },
          { id: 'budget', label: 'Budget', type: 'number' },
          { id: 'location', label: 'Preferred Location', type: 'text' },
        ].map(({ id, label, type }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
              {label}
            </label>
            <input
              type={type}
              id={id}
              name={id === 'location' ? 'location' : id} // For 'location', name is 'location'
              value={formData[id === 'location' ? 'location' : id]}
              onChange={handleChange}
              required
              className="
                mt-2
                block
                w-full
                rounded-lg
                border
                border-gray-300
                bg-gray-50
                px-4
                py-2
                text-gray-900
                placeholder-gray-400
                shadow-sm
                focus:border-blue-500
                focus:bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-blue-400
                transition
                duration-300
                ease-in-out
              "
              placeholder={`Enter your ${label.toLowerCase()}`}
            />
          </div>
        ))}

        <button
          type="submit"
          className="
            w-full
            bg-gradient-to-r from-blue-600 to-indigo-600
            text-white
            font-semibold
            py-3
            rounded-lg
            shadow-md
            hover:from-blue-700 hover:to-indigo-700
            focus:outline-none
            focus:ring-4
            focus:ring-blue-300
            transition
            duration-300
            ease-in-out
          "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
