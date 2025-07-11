import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApiProvider,
  AuthProvider,
  EventProvider,
  FilterProvider,
  InterceptorProvider,
  LocaleProvider,
  SelectedDateProvider,
  ToastProvider
} from './context';
import { apiMethods } from './api';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ApiProvider methods={apiMethods}>
      <AuthProvider>
        <ToastProvider>
          <InterceptorProvider>
            <LocaleProvider>
              <SelectedDateProvider>
                <EventProvider>
                  <FilterProvider>
                    <App />
                  </FilterProvider>
                </EventProvider>
              </SelectedDateProvider>
            </LocaleProvider>
          </InterceptorProvider>
        </ToastProvider>
      </AuthProvider>
    </ApiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
