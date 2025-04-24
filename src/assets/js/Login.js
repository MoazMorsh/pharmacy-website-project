document.addEventListener("DOMContentLoaded", function () {
    // Your Supabase URL and Key
    const SUPABASE_URL = "https://kzvtniajqclodwlokxww.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6dnRuaWFqcWNsb2R3bG9reHd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzOTQyODUsImV4cCI6MjA1Nzk3MDI4NX0.Q2jWPiZFE371GJaKsPb92yFpLSshiT4laz3wT6gfr4M";  // Replace with your actual Supabase Key
    
    // Initialize the Supabase client
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  
    // Check if Supabase client is connected and fetch data
    async function checkConnection() {
      try {
        // Attempt to fetch data from the 'patients' table
        const { data: patients, error } = await supabase
          .from('patients')  // Replace 'patients' with your actual table name
          .select('*');
  
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Supabase is connected! Patients data:", patients);
        }
      } catch (error) {
        console.error("Error during the connection check:", error);
      }
    }
  
    checkConnection();
  });
  document.addEventListener("DOMContentLoaded", function () {
    const SUPABASE_URL = "https://kzvtniajqclodwlokxww.supabase.co";
    const SUPABASE_KEY = "your-supabase-key-here"; // Replace with your actual Supabase Key
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  
    // Function to handle the sign-up process
    async function signupUser() {
      const username = document.getElementById("signup-username-input").value;
      const email = document.getElementById("signup-email-input").value;
      const password = document.getElementById("signup-password-input").value;
  
      if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
      }
  
      try {
        // Insert the user into the 'patients' table in Supabase
        const { data, error } = await supabase
          .from("patients")
          .insert([{ username, email, password }]);
  
        if (error) {
          console.error("Error during sign-up:", error.message);
          alert("Error during sign-up. Please try again.");
        } else {
          console.log("User signed up successfully:", data);
          alert("Sign-up successful! You can now log in.");
        }
      } catch (error) {
        console.error("Unexpected error during sign-up:", error);
        alert("Unexpected error during sign-up. Please try again.");
      }
    }
  
    // Function to handle the login process
    async function loginUser() {
      const username = document.getElementById("username-input").value;
      const password = document.getElementById("password-input").value;
  
      if (!username || !password) {
        alert("Please fill in all fields.");
        return;
      }
  
      try {
        // Check if the username and password match
        const { data, error } = await supabase
          .from("patients")
          .select("*")
          .eq("username", username)
          .eq("password", password)
          .single();
  
        if (error || !data) {
          console.error("Invalid credentials:", error.message);
          alert("Invalid credentials. Please try again.");
        } else {
          console.log("User logged in successfully:", data);
          alert("Login successful! Redirecting...");
          window.location.href = "/index.html";  // Redirect to index page after successful login
        }
      } catch (error) {
        console.error("Unexpected error during login:", error);
        alert("Unexpected error during login. Please try again.");
      }
    }
  
    // Event listeners for the buttons
    const signupButton = document.getElementById("signup-button");
    const loginButton = document.getElementById("login-button");
  
    // Sign-up button click event
    signupButton.addEventListener("click", (e) => {
      e.preventDefault();
      signupUser();  // Call the sign-up function when the button is clicked
    });
  
    // Login button click event
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      loginUser();  // Call the login function when the button is clicked
    });
  });
  