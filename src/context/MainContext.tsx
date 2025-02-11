'use client'

import AuthProvider from '@context/AuthContext';
import NotificationProvider from '@context/NotificationContext';
import ThemeProvider from '@context/ThemeContext';
import { NavigationProvider } from '@context/NavigationContext';
import { ModalProvider } from '@context/ModalContext';

const MainContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ThemeProvider>
          <NavigationProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </NavigationProvider>
        </ThemeProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default MainContext;