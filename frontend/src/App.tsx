// import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from './Pages/Landing Page/Home';
import 'rsuite/dist/rsuite-no-reset.min.css';
import NewsDetail from "./components/NewsDetail";
import PersonAlertDetail from "./components/PersonAlertDetail";
import NewsPage from "./Pages/NewsPage";
import { AgencyPage, ContactPage, ManagementTeamPage } from "./Pages/AboutPage";
import DepartmentsPage from "./Pages/DepartmentsPage";
import PersonnelPage from "./Pages/PersonnelPage";
import UnderConstructionPage from "./Pages/UnderConstructionPage";
import OfficerLoginPage from "./Pages/OfficerLoginPage";
import OfficerDashboard from "./Pages/Officer Page/OfficerDashboard";



function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route index element={<Home />} />
                <Route path="/announcement/:slug" element={<NewsDetail />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:slug" element={<NewsDetail />} />
                <Route path="/about/agency" element={<AgencyPage />} />
                <Route path="/about/management" element={<ManagementTeamPage />} />
                <Route path="/about/contact" element={<ContactPage />} />
                <Route path="/missing/:person" element={<PersonAlertDetail />} />
                <Route path="/wanted/:person" element={<PersonAlertDetail />} />
                <Route path="/departments" element={<DepartmentsPage />} />
                <Route path="/personnel" element={<PersonnelPage />} />
                <Route path="/login" element={<OfficerLoginPage />} />
                <Route path="/under-construction" element={<UnderConstructionPage />} />
                <Route path="/officer/name" element={<OfficerDashboard />} />
            </Route>
        )
    );

    return (
        <RouterProvider router={router} />
    );
}

export default App;