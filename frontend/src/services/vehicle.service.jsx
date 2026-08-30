//Import from the env
const api_url = import.meta.env.VITE_API_URL;
//A function to create a new vehicle information
const createVehicle = async (formVehicleData, loggedInEmployeeToken) => {
  console.log(formVehicleData);
  try {
    const response = await fetch(`${api_url}/api/add-vehicle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInEmployeeToken,
      },
      body: JSON.stringify(formVehicleData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create vehicle");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

const getVehicle = async (customer_id, loggedInEmployeeToken) => {
  try {
    const response = await fetch(
      `${api_url}/api/get-vehicle?customer_id=${customer_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": loggedInEmployeeToken,
        },
      }
    );
    

    const result = await response.json();
    
    if (!response.ok) {
      // Handle API errors while maintaining array format
      return {
        vehicles: [],
        error: result.message || "Failed to get vehicles"
      };
    }

    // Always return array, even if empty
    return result.data;

  } catch (error) {
    console.error("Error:", error.message);
    return []; // Return empty array on network errors
  }
};

const vehicleService = {
  createVehicle,
  getVehicle,
};
export default vehicleService;
