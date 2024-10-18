import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AdminHeader from '../Components/AdminHeader'; // Adjust the path as necessary
import Sidebar from '../Components/Sidebar'; // Adjust the path as necessary

const AdminTaskPage = () => {
  const [task, setTask] = useState({
    type: '',
    name: '',
    instructions: '',
    link: '',
    points: 0,
    keyword: '',
  });
  const [tasks, setTasks] = useState([]); // State for storing tasks
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to open
  const [activeTab, setActiveTab] = useState('all'); // State for active tab
  const sidebarRef = useRef(null);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Close sidebar if clicked outside
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && sidebarOpen) {
      console.log('Clicked outside, closing sidebar');
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/task/create', task);
      console.log('Task added:', response.data);
      // Reset the form after submission
      setTask({
        type: '',
        name: '',
        instructions: '',
        link: '',
        points: 0,
        keyword: '',
      });
      alert('Task added successfully!');
      fetchTasks(); // Fetch tasks again after adding a new one
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task. Please try again.');
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/task'); // Adjust the endpoint as necessary
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // New delete function
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/task/${taskId}`); // Adjust the endpoint as necessary
      alert('Task deleted successfully!');
      fetchTasks(); // Fetch tasks again after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  useEffect(() => {
    if (activeTab === 'all') {
      fetchTasks(); // Fetch tasks when "All Tasks" tab is selected
    }
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed z-30 inset-y-0 left-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full' // Fully off-screen
        }`}
        style={{ width: '250px' }} // Set the sidebar width to 250px
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`} // Adjust margin-left based on sidebar state
      >
        {/* Header */}
        <AdminHeader toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md">
            {/* Tab Buttons */}
            <div className="flex mb-4">
              <button
                className={`flex-1 p-2 font-semibold text-center rounded-l ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveTab('all')}
              >
                All Tasks
              </button>
              <button
                className={`flex-1 p-2 font-semibold text-center rounded-r ${activeTab === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveTab('add')}
              >
                Add Task
              </button>
            </div>

            {/* Conditional Rendering Based on Active Tab */}
            {activeTab === 'all' ? (
              <div>
                <h2 className="text-2xl font-semibold text-center mb-6">All Tasks</h2>
                {/* Render the list of tasks */}
                <ul>
                  {tasks.map((task) => (
                    <li key={task._id} className="mb-4 p-4 border rounded-lg bg-gray-50">
                      <h3 className="font-semibold">{task.name}</h3>
                      <p>{task.instructions}</p>
                      <a href={task.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Link</a>
                      <p className="text-gray-600">Points: {task.points}</p>
                      <p className="text-gray-600">Keyword: {task.keyword}</p>
                      <button
                        onClick={() => handleDelete(task._id)} // Call delete function on click
                        className="mt-2 px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700 transition duration-200"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold text-center mb-6">Add Task</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="type" className="block mb-1 font-medium text-gray-700">Type:</label>
                    <input
                      type="text"
                      id="type"
                      name="type"
                      value={task.type}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={task.name}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="instructions" className="block mb-1 font-medium text-gray-700">Instructions:</label>
                    <textarea
                      id="instructions"
                      name="instructions"
                      value={task.instructions}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="link" className="block mb-1 font-medium text-gray-700">Link:</label>
                    <input
                      type="text"
                      id="link"
                      name="link"
                      value={task.link}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="points" className="block mb-1 font-medium text-gray-700">Points:</label>
                    <input
                      type="number"
                      id="points"
                      name="points"
                      value={task.points}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="keyword" className="block mb-1 font-medium text-gray-700">Keyword:</label>
                    <input
                      type="text"
                      id="keyword"
                      name="keyword"
                      value={task.keyword}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
                  >
                    Add Task
                  </button>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminTaskPage;
