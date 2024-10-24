import React, { useState, useEffect, useRef } from 'react';
import AdminHeader from '../Components/AdminHeader'; // Adjust the path as necessary
import Sidebar from '../Components/Sidebar'; // Adjust the path as necessary
import { FiSend, FiTrash2 } from 'react-icons/fi';
import axios from 'axios'; // Import Axios for making server calls
const serverUrl = import.meta.env.VITE_SERVER_URL;

const AdminNotice = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true); // Default to open
    const sidebarRef = useRef(null);
    const [notice, setNotice] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [notices, setNotices] = useState([]);

    // Function to toggle the sidebar
    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    // Close sidebar if clicked outside
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target) && sidebarOpen) {
            setSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarOpen]);

    // Fetch all notices when the component mounts
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get(`${serverUrl}/notice`);
                setNotices(response.data); // Assuming response.data is an array of notices
            } catch (err) {
                setError('Failed to fetch notices');
            }
        };

        fetchNotices();
    }, []);

    // Handle notice form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!notice) {
            setError('Notice content cannot be empty');
            return;
        }
        setError(null);
        setLoading(true);

        try {
            // Make POST request to your server API
            const response = await axios.post('http://localhost:3000/notice', { notice });

            if (response.status === 201) {
                setSuccess(true);
                setNotice('');
                // Add the new notice to the current list of notices
                setNotices([...notices, response.data]);
            } else {
                setError('Failed to send notice');
            }
        } catch (err) {
            setError('Server error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle delete notice
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/notice/${id}`);
            // Remove the deleted notice from the list of notices
            setNotices(notices.filter((notice) => notice._id !== id));
        } catch (err) {
            setError('Failed to delete notice');
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed z-30 inset-y-0 left-0 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                style={{ width: '250px' }}
            >
                <Sidebar />
            </div>

            {/* Main Content */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
            >
                {/* Header */}
                <AdminHeader toggleSidebar={toggleSidebar} />

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-center mb-6">Add Notice</h2>

                        {/* Success Message */}
                        {success && <div className="text-green-500 mb-4">Notice sent successfully!</div>}

                        {/* Error Message */}
                        {error && <div className="text-red-500 mb-4">{error}</div>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <textarea
                                    name="notice"
                                    value={notice}
                                    onChange={(e) => setNotice(e.target.value)}
                                    placeholder="Enter the notice here..."
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    rows="5"
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50"
                                    disabled={loading} // Disable button when loading
                                >
                                    <FiSend className="mr-2" />
                                    {loading ? 'Sending...' : 'Send Notice'}
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* // Display Notices */}
                    <div className="w-full max-w-lg mx-auto mt-10">
                        <h2 className="text-xl font-semibold mb-4">All Notices</h2>
                        {notices.length === 0 ? (
                            <p className="text-gray-500">No notices available.</p>
                        ) : (
                            <ul className="space-y-4">
                                {notices.map((notice) => (
                                    <li key={notice._id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
                                        <span>{notice.notice}</span> {/* Ensure you're accessing the 'notice' property */}
                                        <button
                                            onClick={() => handleDelete(notice._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                </main>
            </div>
        </div>
    );
};

export default AdminNotice;
