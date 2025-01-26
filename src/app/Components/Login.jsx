// "use client";
// import React, { useState, useEffect } from "react";
// import { supabase } from "../../services/createclient";

// const Login = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkSession = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       if (!session) {
//         // Show alert and redirect to Google login on confirmation

//         await supabase.auth.signInWithOAuth({ provider: "google" });
//       } else {
//         setIsLoggedIn(true);
//       }
//     };

//     checkSession();
//   }, []);

//   return (
//     <div>
//       {isLoggedIn ? <p>You are logged in.</p> : <p>your arent logged in</p>}
//     </div>
//   );
// };

// export default Login;
