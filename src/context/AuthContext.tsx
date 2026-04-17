import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, doc, getDoc, onAuthStateChanged, FirebaseUser, setDoc, serverTimestamp } from '../lib/firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  role: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, role: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Safety timeout: if auth hasn't resolved in 6 seconds, stop loading
    // to prevent the "spinner of death" in iframe environments
    const safetyTimer = setTimeout(() => {
      setLoading((prevLoading) => {
        if (prevLoading) {
          console.warn("Auth initialization timed out - forcing loading to false");
          return false;
        }
        return prevLoading;
      });
    }, 6000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        console.log("Auth state changed:", user ? `Logged in as ${user.email}` : "Not logged in");
        setUser(user);
        
        if (user) {
          // Check role in firestore with a timeout for the doc fetch
          const fetchRole = async () => {
            try {
              const userDocPromise = getDoc(doc(db, 'users', user.uid));
              // Timeout the getDoc call as well just in case
              const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 4000));
              
              const userDoc = await Promise.race([userDocPromise, timeoutPromise]) as any;
              
              if (userDoc.exists()) {
                setRole(userDoc.data().role);
              } else {
                const isAdminEmail = user.email === "wisnumahndr321@gmail.com";
                const newRole = isAdminEmail ? 'admin' : 'user';
                
                await setDoc(doc(db, 'users', user.uid), {
                  uid: user.uid,
                  email: user.email,
                  role: newRole,
                  displayName: user.displayName,
                  createdAt: serverTimestamp()
                });
                setRole(newRole);
              }
            } catch (err) {
              console.error("Error fetching/setting role:", err);
              // Fallback for bootstrapped admin if firestore fails
              if (user.email === "wisnumahndr321@gmail.com") {
                setRole('admin');
              }
            }
          };

          await fetchRole();
        } else {
          setRole(null);
        }
      } catch (error) {
        console.error("Auth context error:", error);
      } finally {
        setLoading(false);
        clearTimeout(safetyTimer);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
