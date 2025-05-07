import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

interface RegistrationData {
  email?: string;
  password?: string;
}

interface RegistrationContextType {
  formData: RegistrationData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationData>>;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: PropsWithChildren) {
  const [formData, setFormData] = useState({});

  return (
    <RegistrationContext.Provider value={{ formData, setFormData }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};
