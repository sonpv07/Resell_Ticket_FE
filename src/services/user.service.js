import { returnValue } from "../utils";
import api from "./axios/axios";

const URL = "Customer";

class UserService {
  static async getProfile(id) {
    try {
      const response = await api.get(`${URL}/${id}`);
      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "");
      } else {
        return returnValue(false, null, "");
      }
    } catch (error) {
      console.error("Error get profile", error);
    }
  }

  // static async editProfile(values) {
  //   try {
  //     console.log(values);

  //     const response = await api.put(`${URL}`, values);

  //     if (response.status >= 200 && response.status < 300) {
  //       return returnValue(true, response.data, "Update profile successfully");
  //     } else {
  //       return returnValue(false, null, "Update profile failed");
  //     }
  //   } catch (error) {
  //     console.error("Error Edit Profile", error);
  //     return returnValue(false, error, "Update profile failed");
  //   }
  // }

  static async editProfile(updatedUser) {
    try {
      console.log(updatedUser); // Log the updated user object for debugging

     const response = await api.put(`${URL}`, updatedUser);

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data, message: "Update profile successfully" };
      } else {
        return { success: false, message: "Update profile failed" };
      }
    } catch (error) {
      console.error("Error Edit Profile", error);
      return { success: false, message: "Update profile failed", error };
    }
  }



  static async getProfileList() {
    try {
      const response = await api.get(`/${URL}`);
      if (response.status >= 200 && response.status < 300) {
        return returnValue(true, response.data, "Fetched user profiles successfully");
      } else {
        return returnValue(false, null, "Failed to fetch user profiles");
      }
    } catch (error) {
      console.error("Error fetching user profiles", error);
      return returnValue(false, error, "Error fetching user profiles");
    }
  }
   static async getTransactionByCustomerId(customerId) {
    try {
      const response = await api.get(`/Transaction/get-transaction-buy-package-successful`, {
        params: { customerId }, 
      });
      return response.data; 
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error; 
    }
  }
  
  // static async updateUser(updatedUser) {
  //   try {
  //     const response = await api.put(`/${URL}`, updatedUser);
  //     return response.data; 
  //     console.error("Error updating user:", error);
  //     return { success: false };
  //   }
  // }


  

  
}

export default UserService;
