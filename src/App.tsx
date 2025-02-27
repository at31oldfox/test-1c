import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import { Global } from '@emotion/react';

import LeftMenu from './features/menu/LeftMenu';
import Schedule from './features/schedule/Schedule';
import { globalStyles } from './shared/styles/globalStyles';
import { theme } from './shared/styles/theme';
import {
  CancelledEntries,
  ClientArrived,
  EntriesOnConfirmation,
  RecordsToTransfer,
  UnpaidEntries,
} from './features/tables';

import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Router basename="/aurumFrontend">
        <Routes>
          <Route path="/menu" element={<LeftMenu />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route
            path="/"
            element={<Navigate to="/cancelled-entries" replace />}
          />
          <Route path="/cancelled-entries" element={<CancelledEntries />} />
          <Route path="/client-arrived" element={<ClientArrived />} />
          <Route
            path="/entries-confirmations"
            element={<EntriesOnConfirmation />}
          />
          <Route path="/records-to-transfer" element={<RecordsToTransfer />} />
          <Route path="/unpaid-entries" element={<UnpaidEntries />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
