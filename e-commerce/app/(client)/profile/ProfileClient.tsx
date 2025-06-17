// "use client";

// import { useState } from "react";

// interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   emailAddresses: { emailAddress: string }[];
//   publicMetadata?: { role?: string };
// }

// interface Props {
//   user: User;
// }

// export default function ProfileClient({ user }: Props) {
//   const [firstName, setFirstName] = useState(user.firstName);
//   const [lastName, setLastName] = useState(user.lastName);
//   const [username, setUsername] = useState(user.username);
//   const [role, setRole] = useState(user.publicMetadata?.role || "user");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   async function updateRole(newRole: string) {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("/api/set-role", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user.id, role: newRole }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to update role");
//       } else {
//         setRole(newRole);
//       }
//     } catch {
//       setError("Error updating role");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function updateProfile() {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("/api/update-profile", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: user.id,
//           firstName,
//           lastName,
//           username,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to update profile");
//       } else {
//         alert("Profile updated successfully!");
//       }
//     } catch {
//       setError("Error updating profile");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
//       <h1 className="text-2xl font-bold mb-4">My Profile</h1>

//       <label className="block mb-2">
//         First Name:
//         <input
//           type="text"
//           value={firstName}
//           onChange={e => setFirstName(e.target.value)}
//           className="mt-1 w-full border rounded p-2"
//         />
//       </label>

//       <label className="block mb-2">
//         Last Name:
//         <input
//           type="text"
//           value={lastName}
//           onChange={e => setLastName(e.target.value)}
//           className="mt-1 w-full border rounded p-2"
//         />
//       </label>

//       <label className="block mb-2">
//         Username:
//         <input
//           type="text"
//           value={username}
//           onChange={e => setUsername(e.target.value)}
//           className="mt-1 w-full border rounded p-2"
//         />
//       </label>

//       <p><strong>Email:</strong> {user.emailAddresses[0]?.emailAddress || "N/A"}</p>
//       <p><strong>Role:</strong> {role}</p>

//       <div className="mt-4 flex gap-2">
//         {role !== "admin" && (
//           <button
//             onClick={() => updateRole("admin")}
//             disabled={loading}
//             className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Updating..." : "Make Admin"}
//           </button>
//         )}

//         {role === "admin" && (
//           <button
//             onClick={() => updateRole("user")}
//             disabled={loading}
//             className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
//           >
//             {loading ? "Updating..." : "Make User"}
//           </button>
//         )}

//         <button
//           onClick={updateProfile}
//           disabled={loading}
//           className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
//         >
//           {loading ? "Saving..." : "Save Profile"}
//         </button>
//       </div>

//       {error && <p className="mt-2 text-red-600">{error}</p>}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useUserRole } from "@/context/UserRoleContext";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  emailAddresses: { emailAddress: string }[];
  publicMetadata?: { role?: string };
}

interface Props {
  user: User;
}

export default function ProfileClient({ user }: Props) {
  const { role: currentUserRole, isLoading } = useUserRole();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [role, setRole] = useState(user.publicMetadata?.role || "user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateRole(newRole: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, role: newRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update role");
      } else {
        setRole(newRole);
      }
    } catch {
      setError("Error updating role");
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          firstName,
          lastName,
          username,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update profile");
      } else {
        alert("Profile updated successfully!");
      }
    } catch {
      setError("Error updating profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <label className="block mb-2">
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <label className="block mb-2">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </label>

      <p>
        <strong>Email:</strong> {user.emailAddresses[0]?.emailAddress || "N/A"}
      </p>
      <p>
        <strong>Role:</strong> {role}
      </p>

      <div className="mt-4 flex gap-2">
        {!isLoading && currentUserRole === "admin" && (
          <>
            {role !== "admin" && (
              <button
                onClick={() => updateRole("admin")}
                disabled={loading}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Make Admin"}
              </button>
            )}

            {role === "admin" && (
              <button
                onClick={() => updateRole("user")}
                disabled={loading}
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Make User"}
              </button>
            )}
          </>
        )}

        <button
          onClick={updateProfile}
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>

      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}
