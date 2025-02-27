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
import ErrorBoundary from './shared/components/ErrorBoundary';
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
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Router basename="/">
          <Routes>
            <Route path="/menu" element={<LeftMenu />} />
            <Route
              path="/schedule"
              element={
                <ErrorBoundary>
                  <Schedule />
                </ErrorBoundary>
              }
            />
            <Route path="/" element={<Navigate to="/schedule" replace />} />
            <Route
              path="/cancelled-entries"
              element={
                <ErrorBoundary>
                  <CancelledEntries />
                </ErrorBoundary>
              }
            />
            <Route
              path="/client-arrived"
              element={
                <ErrorBoundary>
                  <ClientArrived />
                </ErrorBoundary>
              }
            />
            <Route
              path="/entries-confirmations"
              element={
                <ErrorBoundary>
                  <EntriesOnConfirmation />
                </ErrorBoundary>
              }
            />
            <Route
              path="/records-to-transfer"
              element={
                <ErrorBoundary>
                  <RecordsToTransfer />
                </ErrorBoundary>
              }
            />
            <Route
              path="/unpaid-entries"
              element={
                <ErrorBoundary>
                  <UnpaidEntries />
                </ErrorBoundary>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
