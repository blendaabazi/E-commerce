// "use client";

// import { useState } from "react";

// interface User {
//   id: string;
//   firstName: string | null;
//   lastName: string | null;
//   emailAddresses: { emailAddress: string }[];
//   publicMetadata?: { role?: string };
// }

// export default function UserListClient({ initialUsers }: { initialUsers: User[] }) {
//   const [users, setUsers] = useState(initialUsers);
//   const [loadingId, setLoadingId] = useState<string | null>(null);
//   const [showCreateForm, setShowCreateForm] = useState(false);

//   // Create user states
//   const [newFirstName, setNewFirstName] = useState("");
//   const [newLastName, setNewLastName] = useState("");
//   const [newEmail, setNewEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [newRole, setNewRole] = useState("user");
//   const [creating, setCreating] = useState(false);

//   // Edit user states
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editFirstName, setEditFirstName] = useState("");
//   const [editLastName, setEditLastName] = useState("");
//   const [editRole, setEditRole] = useState("");
//   const [updating, setUpdating] = useState(false);

//   const deleteUser = async (userId: string) => {
//     if (!confirm("A je i sigurt që dëshiron ta fshish këtë përdorues?")) return;
//     setLoadingId(userId);
//     const res = await fetch("/api/delete-user", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId }),
//     });
//     if (res.ok) {
//       setUsers(users.filter((u) => u.id !== userId));
//     } else {
//       alert("Fshirja dështoi.");
//     }
//     setLoadingId(null);
//   };

//   const createUser = async () => {
//     if (!newEmail || !newPassword) {
//       alert("Email dhe fjalëkalimi janë të detyrueshëm.");
//       return;
//     }

//     setCreating(true);
//     try {
//       const res = await fetch("/api/create-user", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           emailAddress: newEmail,
//           password: newPassword,
//           firstName: newFirstName,
//           lastName: newLastName,
//           publicMetadata: { role: newRole },
//         }),
//       });

//       if (!res.ok) {
//         alert("Krijimi dështoi.");
//         return;
//       }

//       const createdUser = await res.json();
//       setUsers((prev) => [...prev, createdUser]);
//       setNewFirstName("");
//       setNewLastName("");
//       setNewEmail("");
//       setNewPassword("");
//       setNewRole("user");
//       setShowCreateForm(false);
//     } catch {
//       alert("Gabim gjatë krijimit.");
//     }
//     setCreating(false);
//   };

//   function startEditing(user: User) {
//     setEditingId(user.id);
//     setEditFirstName(user.firstName || "");
//     setEditLastName(user.lastName || "");
//     setEditRole(user.publicMetadata?.role || "user");
//   }

//   function cancelEditing() {
//     setEditingId(null);
//   }

//   const saveEdit = async () => {
//     if (!editingId) return;
//     setUpdating(true);
//     try {
//       const res = await fetch("/api/update-user", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: editingId,
//           firstName: editFirstName,
//           lastName: editLastName,
//           role: editRole,
//         }),
//       });

//       if (!res.ok) {
//         alert("Update dështoi.");
//         return;
//       }

//       const updatedUser = await res.json();
//       setUsers((prev) =>
//         prev.map((u) => (u.id === editingId ? updatedUser : u))
//       );
//       setEditingId(null);
//     } catch {
//       alert("Gabim gjatë update.");
//     }
//     setUpdating(false);
//   };

//   return (
//     <div>
//       <button
//         onClick={() => setShowCreateForm(!showCreateForm)}
//         className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//       >
//         {showCreateForm ? "Mbyll formën e krijimit" : "Shto përdorues të ri"}
//       </button>

//       {showCreateForm && (
//         <div className="mb-6 p-4 border rounded">
//           <h2 className="font-bold mb-2">Shto përdorues të ri</h2>
//           <input
//             placeholder="Emri"
//             value={newFirstName}
//             onChange={(e) => setNewFirstName(e.target.value)}
//             className="border p-2 w-full mb-2 rounded"
//           />
//           <input
//             placeholder="Mbiemri"
//             value={newLastName}
//             onChange={(e) => setNewLastName(e.target.value)}
//             className="border p-2 w-full mb-2 rounded"
//           />
//           <input
//             placeholder="Email"
//             type="email"
//             value={newEmail}
//             onChange={(e) => setNewEmail(e.target.value)}
//             className="border p-2 w-full mb-2 rounded"
//           />
//           <input
//             placeholder="Fjalëkalimi"
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="border p-2 w-full mb-2 rounded"
//           />
//           <select
//             value={newRole}
//             onChange={(e) => setNewRole(e.target.value)}
//             className="border p-2 w-full mb-2 rounded"
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//           <button
//             onClick={createUser}
//             disabled={creating}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
//           >
//             {creating ? "Duke krijuar..." : "Krijo përdorues"}
//           </button>
//         </div>
//       )}

//       <ul className="space-y-2">
//         {users.map((u) => (
//           <li
//             key={u.id}
//             className="p-4 border rounded shadow-sm flex justify-between items-center"
//           >
//             <div className="flex-grow">
//               <p><strong>ID:</strong> {u.id}</p>
//               <p><strong>Email:</strong> {u.emailAddresses[0]?.emailAddress}</p>

//               {editingId === u.id ? (
//                 <div className="flex flex-col gap-2 mt-2">
//                   <input
//                     type="text"
//                     value={editFirstName}
//                     onChange={(e) => setEditFirstName(e.target.value)}
//                     className="border p-1 rounded"
//                     placeholder="Emri"
//                   />
//                   <input
//                     type="text"
//                     value={editLastName}
//                     onChange={(e) => setEditLastName(e.target.value)}
//                     className="border p-1 rounded"
//                     placeholder="Mbiemri"
//                   />
//                   <select
//                     value={editRole}
//                     onChange={(e) => setEditRole(e.target.value)}
//                     className="border p-1 rounded"
//                   >
//                     <option value="user">User</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </div>
//               ) : (
//                 <p className="mt-2">
//                   <strong>Emri:</strong> {u.firstName} {u.lastName}
//                 </p>
//               )}

//               <p><strong>Roli:</strong> {u.publicMetadata?.role ?? "user"}</p>
//             </div>

//             <div className="flex gap-2 ml-4">
//               {editingId === u.id ? (
//                 <>
//                   <button
//                     onClick={saveEdit}
//                     disabled={updating}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//                   >
//                     {updating ? "Duke ruajtur..." : "Ruaj"}
//                   </button>
//                   <button
//                     onClick={cancelEditing}
//                     disabled={updating}
//                     className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
//                   >
//                     Anulo
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => startEditing(u)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-yellow-500"
//                   >
//                     Edito
//                   </button>
//                   <button
//                     onClick={() => deleteUser(u.id)}
//                     disabled={loadingId === u.id}
//                     className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
//                   >
//                     {loadingId === u.id ? "Duke fshirë..." : "Fshi"}
//                   </button>
//                 </>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
"use client";

import { useState } from "react";

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: { emailAddress: string }[];
  publicMetadata?: { role?: string };
}

export default function UserListClient({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Create user states
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("user");
  const [creating, setCreating] = useState(false);

  // Edit user states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editRole, setEditRole] = useState("user");
  const [updating, setUpdating] = useState(false);

  const deleteUser = async (userId: string) => {
    if (!confirm("A je i sigurt që dëshiron ta fshish këtë përdorues?")) return;

    setLoadingId(userId);
    try {
      const res = await fetch("/api/delete-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error("Fshirja dështoi.");

      setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      alert((err as Error).message || "Gabim gjatë fshirjes.");
    } finally {
      setLoadingId(null);
    }
  };

  const createUser = async () => {
    if (!newEmail || !newPassword || !newFirstName || !newLastName) {
      alert("Të gjitha fushat janë të detyrueshme për krijimin e përdoruesit.");
      return;
    }

    setCreating(true);
    try {
      const res = await fetch("/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailAddress: newEmail,
          password: newPassword,
          firstName: newFirstName,
          lastName: newLastName,
          publicMetadata: { role: newRole },
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Krijimi dështoi: " + (errorData.error || "Gabim i panjohur."));
        return;
      }

      const createdUser: User = await res.json();
      setUsers((prev) => [...prev, createdUser]);

      // Reset form
      setNewFirstName("");
      setNewLastName("");
      setNewEmail("");
      setNewPassword("");
      setNewRole("user");
      setShowCreateForm(false);
    } catch {
      alert("Gabim gjatë krijimit të përdoruesit.");
    }
    setCreating(false);
  };

  // Funksionet për editim dhe ruajtje mbeten të njëjta me disa përmirësime stili në kod

  function startEditing(user: User) {
    setEditingId(user.id);
    setEditFirstName(user.firstName || "");
    setEditLastName(user.lastName || "");
    setEditRole(user.publicMetadata?.role || "user");
  }

  function cancelEditing() {
    setEditingId(null);
  }

  const saveEdit = async () => {
    if (!editingId) return;

    if (!editFirstName || !editLastName) {
      alert("Emri dhe mbiemri janë të detyrueshëm.");
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch("/api/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: editingId,
          firstName: editFirstName,
          lastName: editLastName,
          role: editRole,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Update dështoi: " + (errorData.error || "Gabim i panjohur."));
        return;
      }

      const updatedUser: User = await res.json();
      setUsers((prev) =>
        prev.map((u) => (u.id === editingId ? updatedUser : u))
      );
      setEditingId(null);
    } catch {
      alert("Gabim gjatë update.");
    }
    setUpdating(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {showCreateForm ? "Mbyll formën e krijimit" : "Shto përdorues të ri"}
      </button>

      {showCreateForm && (
        <div className="mb-6 p-4 border rounded">
          <h2 className="font-bold mb-2">Shto përdorues të ri</h2>
          <input
            placeholder="Emri"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            placeholder="Mbiemri"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            placeholder="Email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            placeholder="Fjalëkalimi"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={createUser}
            disabled={creating}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {creating ? "Duke krijuar..." : "Krijo përdorues"}
          </button>
        </div>
      )}

      <ul className="space-y-2">
        {users.map((u) => (
          <li
            key={u.id}
            className="p-4 border rounded shadow-sm flex justify-between items-center"
          >
            <div className="flex-grow">
              <p><strong>ID:</strong> {u.id}</p>
              <p><strong>Email:</strong> {u.emailAddresses[0]?.emailAddress}</p>

              {editingId === u.id ? (
                <div className="flex flex-col gap-2 mt-2">
                  <input
                    type="text"
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    className="border p-1 rounded"
                    placeholder="Emri"
                  />
                  <input
                    type="text"
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    className="border p-1 rounded"
                    placeholder="Mbiemri"
                  />
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              ) : (
                <p className="mt-2">
                  <strong>Emri:</strong> {u.firstName} {u.lastName}
                </p>
              )}

              <p><strong>Roli:</strong> {u.publicMetadata?.role ?? "user"}</p>
            </div>

            <div className="flex gap-2 ml-4">
              {editingId === u.id ? (
                <>
                  <button
                    onClick={saveEdit}
                    disabled={updating}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {updating ? "Duke ruajtur..." : "Ruaj"}
                  </button>
                  <button
                    onClick={cancelEditing}
                    disabled={updating}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
                  >
                    Anulo
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(u)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-yellow-500"
                  >
                    Edito
                  </button>
                  <button
                    onClick={() => deleteUser(u.id)}
                    disabled={loadingId === u.id}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    {loadingId === u.id ? "Duke fshirë..." : "Fshi"}
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
