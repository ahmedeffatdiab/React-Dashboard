import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
  Alert,
} from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const navigate=useNavigate();
  // Refs for input fields
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { signup } = useAuth(); // Access signup from context
  function isGoogleEmail(email) {
    return email.trim().toLowerCase().endsWith("@gmail.com");
  }
  // Form submission handler
  async function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!email || !password || !confirmPassword) {
      return setError("All fields are required");
    }
    
    if (!isGoogleEmail(email)) {
      return setError("Only Google email addresses (@gmail.com) are allowed.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password); // Create user in Firebase
      await addDoc(collection(db, "Roles"), {
  email: email,
  role: "User", // أو "Admin" إذا أردت
});
      navigate("/pie");
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      width="100%"
      height="70vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 2, width: { xs: "70vw", lg: "500px" } }}
      >
        <Typography
          color={theme.palette.info.light}
          variant="h3"
          textAlign="center"
          mb={5}
        >
          Register
        </Typography>

        {error && (
          <Alert variant="outlined" severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          inputRef={emailRef}
          type="email"
          label="Email"
          variant="filled"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          inputRef={passwordRef}
          type="password"
          label="Password"
          variant="filled"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          inputRef={confirmPasswordRef}
          type="password"
          label="Password Confirmation"
          variant="filled"
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          disabled={loading}
          variant="contained"
          sx={{ mt: 2, width: "100%", fontWeight: 600 }}
        >
          Sign Up
        </Button>
      </Paper>

      <Typography mt={2}>
        Already have an account?{" "}
        <Link className="Link_Form" to="/login">
          Log In
        </Link>
      </Typography>
    </Box>
  );
}
