//Import the //Import from the env
const api_url = import.meta.env.VITE_API_URL;
//Create a function to send and order create request
const createOrder = async (orderData, loggedInEmployeeToken) => {
  console.log(orderData);
  try {
    const response = await fetch(`${api_url}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInEmployeeToken,
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
      throw new Error(errorData.error || "Failed to create order");
    }
    console.log(response);
    return response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

const getAllOrders = async (loggedInEmployeeToken) => {
  console.log(loggedInEmployeeToken);
  try {
    const response = await fetch(`${api_url}/api/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInEmployeeToken,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
      throw new Error(errorData.error || "Failed to get orders");
    }
    console.log(response);
    return response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

const getCustomerOrders = async (customer_id, loggedInEmployeeToken) => {
  try {
    const response = await fetch(`${api_url}/api/order/${customer_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInEmployeeToken,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
      throw new Error(errorData.error || "Failed to get orders");
    }
    console.log(response);
    return response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

const updateOrder = async (orderData, loggedInEmployeeToken) => {
  try {
    const response = await fetch(`${api_url}/api/order/${orderData.order_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInEmployeeToken,
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
      throw new Error(errorData.error || "Failed to update order");
    }
    console.log(response);
    return response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

const trackOrder = async (orderHash) => {
  console.log(orderHash);
  try {
    const response = await fetch(`${api_url}/api/track-order/${orderHash.order_hash}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch order details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes("No Order found")) {
      throw new Error("Order not found - please check your tracking code");
    }
    throw new Error(error.message || "Failed to connect to the server");
  }
};

const orderService = {
  createOrder,
  getAllOrders,
  getCustomerOrders,
  updateOrder,
  trackOrder,
};
//Export the orderService
export default orderService;
