import React from "react";
import Home from "./components/Home/Home";
import Bookings from "./components/Bookings/Bookings";
import SetSlot from "./components/SetSlot/SetSlot";
import Overview from "./components/Service/Tickets/Overview";
import Tickets from "./components/Service/Tickets/Tickets";
import ChatComponent from "./components/Service/Tickets/ChatComponent";
import PageNotFound from "./components/PageNotFound";
import CreateTicket from "./components/CreateTicket/CreateTicket";
import BookSlot from "./components/SlotBooking/BookSlot";
import UserEditProfile from "./components/Home/UserEditProfile";
import MyBookings from "./components/MyBookings/MyBookings";
import UserChangePassword from "./components/Home/UserChangePassword";

// import SCDashboard from "./components/ServiceCenterHome/Dashboard";
import SCDashboard from "./components/Home/SCDashboard";
import ServiceCenterEditProfile from "./components/Home/ServiceCenterEditProfile";
import ServiceCenterChangePassword from "./components/Home/ServiceCenterChangePassword";

const routes = [
  { path: "/", exact: true, name: "Home",user:"USER" },
  { path: "/", exact: true, name: "Home" },
  { path: "/home", name: "Home", element: Home, user: "USER" },
  { path: "/home", name: "Home", element: Home, user: "SERVICECENTER" },
  { path: "*", name: "PageNotFound", element: PageNotFound, user: "USER" },
  {
    path: "*",
    name: "PageNotFound",
    element: PageNotFound,
    user: "SERVICECENTER",
  },
  {
    path: "/Bookings",
    name: "Bookings",
    element: Bookings,
    user: "SERVICECENTER",
  },
  {
    path: "/tickets-overview",
    name: "Tickets-Overview",
    element: Overview,
    user: "SERVICECENTER",
  },
  {
    path: "/tickets-overview",
    name: "Tickets-Overview",
    element: Overview,
    user: "USER",
  },
  {
    path: "/chat",
    name: "Chat",
    element: ChatComponent,
    user: "SERVICECENTER",
  },
  {
    path: "/chat",
    name: "Chat",
    element: ChatComponent,
    user: "USER",
  },
  {
    path: "/Tickets",
    name: "Tickets",
    element: Tickets,
    user: "SERVICECENTER",
  },
  {
    path: "/Tickets",
    name: "Tickets",
    element: Tickets,
    user: "USER",
  },
  { path: "/bookaslot", name: "BookASlot", element: BookSlot, user: "USER" },
  {
    path: "/SetSlot",
    name: "SetSlot",
    element: SetSlot,
    user: "SERVICECENTER",
  },
  {
    path: "/MyBookings",
    name: "MyBookings",
    element: MyBookings,
    user: "USER",
  },
  {
    path: "/CreateTicket",
    name: "CreateTicket",
    element: CreateTicket,
    user: "USER",
  },
  {
    path: "/SCDashboard",
    name: "SCDashboard",
    element: SCDashboard,
    user: "SERVICECENTER",
  },

  {
    path: "/edituserprofile",
    name: "UserEditProfile",
    element: UserEditProfile,
    user: "USER",
  },
  {
    path: "/changepassword",
    name: "UserChangePassword",
    element: UserChangePassword,
    user: "USER",
  },
  {
    path: "/changepassword",
    name: "UserChangePassword",
    element: UserChangePassword,
    user: "USER",
  },
  {
    path: "/editserviceprofile",
    name: "ServiceCenterEditProfile",
    element: ServiceCenterEditProfile,
    user: "SERVICECENTER",
  },
  {
    path: "/changecenterpassword",
    name: "ServiceCenterChangePassword",
    element: ServiceCenterChangePassword,
    user: "SERVICECENTER",
  },
];

export default routes;
