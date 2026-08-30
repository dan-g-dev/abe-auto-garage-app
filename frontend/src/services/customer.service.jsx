//Import from the env
const api_url = import.meta.env.VITE_API_URL;

//A function to send post request to create a new customer
const createCustomer = async (formData, loggedInEmployeeToken) => {
  try {
    const response = await fetch(`${api_url}/api/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInEmployeeToken,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create customer");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

//A function to send get request to fetch all customers
const getAllCustomers = async (token) => {
  console.log(token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/customers`, requestOptions);
  // console.log(response)
  return response;
};

//A function to send an edit(put) request
const editCustomer = async (updatedCustomerData, loggedInEmployeeToken, id) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(updatedCustomerData),
  };
  const response = await fetch(`${api_url}/api/customer/${id}`, requestOptions);
  return response;
};

const customerSearch = async (searchQuery, loggedInEmployeeToken) => {
  try {
    const url = new URL(`${api_url}/api/customers/search`);
    url.searchParams.append("query", searchQuery);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInEmployeeToken,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Search failed");
    }

    const responseData = await response.json();
    return responseData.data; // Directly return the data array

  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};
//Explore all the functions
const customerService = {
  createCustomer,
  getAllCustomers,
  editCustomer,
  customerSearch,
};

export default customerService;
