import React, { useState } from 'react';

function Task({ taskData, handleGoClick, handleKeywordSubmit, loadingTaskIndex, submittedKeywords }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Available Tasks</h2>
      {taskData.map((task, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
          <div>
            <h2 className="text-xl font-semibold">{task.name}</h2>
            <p className="mt-2">{task.instructions}</p>
            <p className="mt-2 font-bold">Earn: {task.points} points</p>
          </div>

          {loadingTaskIndex === index && (
            <form onSubmit={(e) => handleKeywordSubmit(e, task.keyword, index,task.points )} className="mt-4">
              <input
                type="text"
                name="keyword"
                placeholder="Enter task keyword"
                className="px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg w-full"
                required
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
              >
                Submit
              </button>
            </form>
          )}

          {!submittedKeywords[index] && loadingTaskIndex !== index && (
            <button
              onClick={() => handleGoClick(task.link, index)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
            >
              {loadingTaskIndex === index ? 'Loading...' : 'Go'}
            </button>
          )}

          {submittedKeywords[index] && (
            <p className="mt-2 text-green-400 font-bold">{submittedKeywords[index]}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Task;
