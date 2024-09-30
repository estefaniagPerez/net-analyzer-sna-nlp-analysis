import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {DefaultLayout} from '../components/layouts/default-layout/index.jsx';
import {NetworkPage} from '../features/network-page/components/network-page.jsx';
import {AboutPage} from '../features/about-page/components/about-page.jsx';
import {PrivacyPage} from '../features/privacy-page/components/privacy-page.jsx';
//import {TestCard} from '../components/test.jsx'

export function AppRouter() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<DefaultLayout ></DefaultLayout>}>
          <Route index element={<NetworkPage />} />
          <Route path="about" element={<AboutPage/>} />
          <Route path="legal" element={<PrivacyPage/>} />
          <Route path="*" element={<p>Page Not Found</p>} />
          {/*<Route path="*" element={<NotFoundPage />} />*/}
        </Route>
      </Routes>
    
    </Router>
  );
}

export default AppRouter;
