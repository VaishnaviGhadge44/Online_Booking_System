import axios from "axios";

// const url1 = "http://localhost:8080";
// const url= "http://localhost:3003";
// const url4 = "http://localhost:3001";
// const url = "http://localhost:3000";

// const url = "http://localhost:3001";
// const url7 = "http://localhost:8080/user-service"
// const BASE_URL = "http://localhost:8080/user-service";

//URLS For USER and SERVICE CENTER 
// const URL_USERSERVICE = "http://localhost:8080/user-service/api/v1/reg";
// const URL_USERSERVICE_EDIT = "http://localhost:8080/user-service/api/v1";

// const baseURL = "https://swiftqsolution.stackroute.io";
//const baseURL = "http://localhost:8080";
const baseURL="http://127.0.0.1:8080"



// http://localhost:8090/api/v1/reg/userupdate
// const chatServiceUrl = "http://localhost:8084";
// const ticketServiceUrl = "http://localhost:8092";
// /v1/api/userBooking/serviceCentreDetails/
// const url2 ="http://localhost:8092";
// const getSCUrl = "http://localhost:8080";
// const url3="http://localhost:8095";
// const login="http://localhost:8080/authentication-service/api/v1/authenticate"

export const getallUsersBookings = async (id) => {
  id = id || "";
  return await axios.get(`${baseURL}/slot-handling/v1/api/userBooking/userDetails/${id}`);
};

export const registration = async (data,role) => {
  return await axios.post(`${baseURL}/user-service/api/v1/reg/${role}`,data);
};

export const Auth=async(data)=>{
  return await axios.post(`${baseURL}/authentication-service/api/v1/authenticate`,data)
}
// 

export const getallUsers = async (id) => {
  id = id || "";
  return await axios.get(
    `${baseURL}/slot-handling/v1/api/userBooking/serviceCentreDetails/${id}`
  );
};




// get perticular User detail using emailID

export const getUserDetails = async (emailId) => {
  emailId = emailId || "";
  return await axios.get(`${baseURL}/user-service/api/v1/reg/user/${emailId}`);
};

// get perticular Service Center detail using emailID

export const getServiceCenterDetails = async (emailId) => {
  emailId = emailId || "";
  return await axios.get(`${baseURL}/user-service/api/v1/reg/serviceCenter/${emailId}`);
};


// Update User Profile
export const editUser = async (userData) => {
  return await axios.put(`${baseURL}/user-service/api/v1/reg/userupdate`, userData);
};

// Update User Password
export const updateUserPassword = async (userData) => {
  return await axios.put(`${baseURL}/user-service/api/v1/reg/passwordupdate`, userData);
};

// Update Service Center Profile
export const editServiceCenter = async (serviceCenterData) => {
  return await axios.put(`${baseURL}/user-service/api/v1/updateServicecenter`, serviceCenterData);
};

// Update Service Center Password
export const updateServiceCenterPassword = async (serviceCenterData) => {
  return await axios.put(`${baseURL}/user-service/api/v1/reg/updatePassword`,serviceCenterData);
};

// getServiceCenterByStateAndCity

export const getServiceCenterByStateAndCity = async (city,state) => {
  return await axios.get(
    `${baseURL}/user-service/api/v1/FindServiceCenetByStateAndCity/${city}/${state}`
  );
};
export const getServiceCenterByEmail = async (centerByEmailId) => {
   centerByEmailId = centerByEmailId || "";
  return await axios.get(
    `${baseURL}/user-service/api/v1/reg/serviceCenter/${centerByEmailId}`
  );
};

export const getServiceCenter = async () => {
  return await axios.get(`${baseURL}/user-service/api/v1/getAllServiceCenters`);
};

//api to get availabel slots by email and date

export const getAvailableSlots = async (centerEmailId,selectedDate) => {
  centerEmailId = centerEmailId || "";
  return await axios.get(`${baseURL}/slot-handling/v1/api/createSlots/availableSlotMasterDetails/${centerEmailId}/${selectedDate}`);
};

//api to post booking details

export const bookSlotByUser = async (bookingData) => {
  return await axios.post(`${baseURL}/slot-handling/v1/api/userBooking/bookingByUser`,bookingData);
};

export const CreateTicketData = async (data) => {
  return await axios.post(`${baseURL}/ticket-handling-service/v1/api/saveTicket`, data);
};

export const editBooking = async (id,price) => {
  return await axios.put(`${baseURL}/slot-handling/v1/api/userBooking/updateBookingStatus/${id}/${price}`);
};



export const getServiceCentreTickets = async (centerEmail) => {
  return await axios.get(
    `${baseURL}/ticket-handling-service/v1/api/getTicketsbyCenter/${centerEmail}`
  );
};


export const getChatsByticketId = async (id) => {
  return await axios.get(`${baseURL}/chat-service/v1/api/getTicketsbyTicketId/${id}`);
};

export const postChatMessage = async (chatMessage, ticketId) => {
  return await axios.put(
    `${baseURL}/chat-service/v1/api/chatMessage/${ticketId}`,
    chatMessage
  );
};

export const postNewChatMessage = async (request) => {
  return await axios.post(`${baseURL}/chat-service/v1/api/saveChat`, request);
}

export const getUserTickets = async (userEmail) => {
  return await axios.get(
    `${baseURL}/ticket-handling-service/v1/api/getTicketsbyUser/${userEmail}`
  );
};

export const closeTicket = async (ticketId) => {
  return await axios.put(`${baseURL}/ticket-handling-service/v1/api/updateTicketStatus/${ticketId}`);

}

export const getServeCenterByEmailId = async (id) => {
  return await axios.get(`${baseURL}/user-service/api/v1/reg/serviceCenter/${id}`);
};

export const postReviewAndRatings = async (emailId, feedback) => {
  return await axios.put(`${baseURL}/user-service/api/v1/ReviewAndRating/${emailId}`, feedback);

};


export const addOrUpdateSCSlots = async (obj) => {
  return await axios.post(`${baseURL}/slot-handling/v1/api/createSlots/addOrUpdateSlot`,obj);
}
