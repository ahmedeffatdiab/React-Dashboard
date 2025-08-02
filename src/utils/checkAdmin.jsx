import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../Context/AuthContext";

export default function useCheckAdmin() {
  const [isAdmin, setIsAdmin] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser?.email) return;

    const checkUser = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Roles"));
        let found = false;

        querySnapshot.forEach((doc) => {
          if (doc.data().email === currentUser.email) {
            if (doc.data().role === "Admin") {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
            found = true;
          }
        });

        if (!found) {
          setIsAdmin(false); // User not found in Roles
        }
      } catch (error) {
        console.error("Error checking admin status: ", error);
        setIsAdmin(false);
      }
    };

    checkUser();
  }, [currentUser?.email]);

  return isAdmin;
}
