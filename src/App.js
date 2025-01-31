import React from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { InitializeProjectSetup } from "Views/Common/Docs/InitializeProjectSetup";
import Login from "Views/Common/Docs/Login";
import Error from "Views/Common/Docs/error";
import InterviewCandidatesRegistration from "Views/InterviewCandidates/Docs/InterviewCandidatesRegistration";
import InterviewCandidatesHome from "Views/InterviewCandidates/Docs/InterviewCandidatesHome";
import InterviewCandidatesAuth from "Views/InterviewCandidates/Docs/InterviewCandidatesAuth";
import CandidateStatus from "CandidateStatus";
import AdminAuth from "Views/Admin/Docs/AdminAuth";
import Layout from "Views/Admin/Layout/Layout";
import Home from "Home";
import ChatPage from "ChatPage";
import MediaUpload from "MediaUpload";


const App = () => {

  return (
    <HelmetProvider>
      <ToastContainer theme='light' />
      <Routes>

        
        <Route element={<InitializeProjectSetup />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage/>} />
          <Route path="/media-upload" element={<MediaUpload />} />
         

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </HelmetProvider >
  )
}
export default App;