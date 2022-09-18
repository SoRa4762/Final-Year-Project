import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/Pages";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage/RegisterUser/index";
import RegistrationBB from "./components/SignUpPage/RegisterBB/index";
import HomePage from "./components/HomePage";
import RequestPage from "./components/RequestPage";
// import RequestList from "./components/RequestPage/DonorList";
import DonatePage from "./components/DonatePage";
// import DonateList from "./components/DonatePage/ReceiverList";
import Notifications from "./components/NotificationPage";
import Messages from "./components/MessagePage";
import Companions from "./components/CompanionsPage";
import CompanionsList from "./components/CompanionsPage/AllCompanions";
import Profile from "./components/ProfilePage";
import User from "./components/UserPage";
import Admin from "./components/Dashboard/Admin/Users";
import EditUser from "./components/Dashboard/Admin/Users/EditUser";
import BloodBanksList from "./components/Dashboard/Admin/BloodBanks";
import EditBloodStock from "./components/Dashboard/Admin/BloodBanks/EditBloodStock";
import Transactions from "./components/Dashboard/Admin/Transactions";
import Posts from "./components/Dashboard/Admin/Posts";
import BloodBankStock from "./components/Dashboard/BloodBank/Stock";
import BloodBankUserList from "./components/Dashboard/BloodBank/UsersList";
import BloodBankVisitUser from "./components/Dashboard/BloodBank/UsersList/VisitUser";
import BloodBankMessages from "./components/Dashboard/BloodBank/Messages";
import BloodBankTransactions from "./components/Dashboard/BloodBank/Transactions";
import BloodBankProfile from "./components/Dashboard/BloodBank/Profile";
import BloodBankRoles from "./components/Dashboard/BloodBank/Roles";
import NotFoundError from "./components/404Error";
import axios from "axios";
import { AuthContext } from "./components/helpers/AuthContext";
import { io } from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
// import Map from "./components/map";
// import { getAutoHeightDuration } from "@mui/material/styles/createTransitions";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
    type: "",
    role: "",
    bloodGroup: "",
    profilePicture: "",
  });

  //!socket.io
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  // console.log(socket);

  useEffect(() => {
    setAuthState({
      ...authState,
      socket: socket,
    });
  }, [authState.id, socket]);
  console.log(authState);

  useEffect(() => {
    socket?.emit("addNewUser", authState.id);
  }, [socket, authState.id]);

  // setAuthState

  // console.log(socket);

  useEffect(() => {
    axios
      .get("http://localhost:3006/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          //we needed to change the value of only one item in the object
          //so we destrucruted it in and only got the value of status to be true
          setAuthState({ ...authState, status: false });
          //same for logout
        } else {
          //adding a new user to socketio
          setAuthState({
            ...authState,
            username: response.data.username,
            profilePicture: response.data.profilePicture,
            id: response.data.id,
            status: true,
            type: response.data.type,
          });

          // console.log(response.data.username)

          // socket?.emit("addNewUser", authState.id);
        }
      });
  }, []);

  // console.log(authState.socket);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/map" element={<Map />} /> */}
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/signUpBB" element={<RegistrationBB />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/request" element={<RequestPage />} />
          {/* <Route path="/request/list" element={<RequestList />} /> */}
          <Route path="/donate" element={<DonatePage />} />
          {/* <Route path="/donate/list" element={<DonateList />} /> */}
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/companions" element={<Companions />} />
          <Route
            path="/companions/companionslist"
            element={<CompanionsList />}
          />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/edituser/:id" element={<EditUser />} />
          <Route path="/admin/bloodbanks" element={<BloodBanksList />} />
          <Route
            path="/admin/editbloodstock/:id"
            element={<EditBloodStock />}
          />
          <Route path="/admin/transactions" element={<Transactions />} />
          <Route path="/admin/posts" element={<Posts />} />
          <Route path="/bloodbank/:id" element={<BloodBankStock />} />
          <Route path="/bloodbank/userlist" element={<BloodBankUserList />} />
          <Route
            path="/bloodbank/visituser/:id"
            element={<BloodBankVisitUser />}
          />
          <Route path="/bloodbank/messages" element={<BloodBankMessages />} />
          <Route
            path="/bloodbank/transactions"
            element={<BloodBankTransactions />}
          />
          <Route path="/bloodbank/profile/:id" element={<BloodBankProfile />} />
          <Route path="/bloodbank/roles" element={<BloodBankRoles />} />
          <Route path="*" element={<NotFoundError />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
