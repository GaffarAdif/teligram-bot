import axios from "axios";
import MyContext from '../Contex/MyContext';
import { useContext } from "react";
export const UpdateUserOnServer = async ()=>{

const userData = JSON.parse(localStorage.getItem('user'))

    try {
        // Make a PUT request to the server to update the user's balance
        const response = await axios.put(`http://localhost:3000/user/update-user/${userData.UserId}`, {
            updates: userData, // Send the new balance in the request body
        });
        // Handle successful response
        if (response.status === 200) {
          localStorage.clear()
          localStorage.setItem('user',JSON.stringify(response.data.user))
        
          return response.data; // Return the updated user data
        }
      } catch (error) {
        // Handle errors
        console.error('Error updating user balance:', error);
        throw error; // Rethrow the error to handle it where the function is called
      }




}