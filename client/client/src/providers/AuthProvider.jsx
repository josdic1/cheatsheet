import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect } from "react";


export function AuthProvider({ children }) {





  return (
    <AuthContext.Provider 
        value={value}>{children}</AuthContext.Provider>
  )
} 