import { createContext, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase.config";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <UserContext.Provider value={{ user, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
