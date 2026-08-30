//Import from the env
const api_url = import.meta.env.VITE_API_URL;
//Create a function to send a service create request
const createService = async (formServiceData, loggedInEmployeeToken) => {
  console.log(formServiceData.service_price);
  console.log(loggedInEmployeeToken);
  try {
    const response = await fetch(`${api_url}/api/service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInEmployeeToken,
      },
      body: JSON.stringify(formServiceData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
      throw new Error(errorData.error || "Failed to create service");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};
const getAllServices = async (loggedInEmployeeToken) => {
  try {
    const response = await fetch(`${api_url}/api/service`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInEmployeeToken,
      },
    });
    

    // Check if the response status is OK
    if (!response.ok) {
      const errorData = await response.json(); // Extract the error message from the response
      throw new Error(errorData.error || "Failed to fetch services");
    }

    // Parse the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching services: ${error.message}`);
    return {
      success: false,
      message: error.message,
    };
  }
};

// Function to update a service
const updateService = async ( serviceData, loggedEmployeeToken) => {
  console.log(serviceData)
  try {
    // Add serviceId to the body
    const response = await fetch(`${api_url}/api/service-edit`, {
      method: "PUT", // PUT method to update
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedEmployeeToken,
      },
      body: JSON.stringify(serviceData), // Send service data including serviceId in the body
    });

    if (!response.ok) {
      const errorData = await response.json(); // Extract the error message from the response
      throw new Error(errorData.error || "Failed to update service");
    }

    // Return the updated service data from the response
    return response.json();
  } catch (error) {
    console.error("Error updating service:", error.message);
    throw error;
  }
};

//exports the service
const serviceService = {
  createService,
  getAllServices,
  updateService
};

export default serviceService;
