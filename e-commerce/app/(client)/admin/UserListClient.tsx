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
  const [users, setUsers] = useState(initialUsers);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const deleteUser = async (userId: string) => {
    const confirmed = confirm("A je i sigurt që dëshiron ta fshish këtë përdorues?");
    if (!confirmed) return;

    setLoadingId(userId);

    const res = await fetch("/api/delete-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      setUsers(users.filter((u) => u.id !== userId));
    } else {
      alert("Fshirja dështoi.");
    }

    setLoadingId(null);
  };

  return (
    <ul className="space-y-2">
      {users.map((u) => (
        <li key={u.id} className="p-4 border rounded shadow-sm flex justify-between items-center">
          <div>
            <p><strong>ID:</strong> {u.id}</p>
            <p><strong>Email:</strong> {u.emailAddresses[0]?.emailAddress}</p>
            <p><strong>Emri:</strong> {u.firstName} {u.lastName}</p>
            <p><strong>Roli:</strong> {u.publicMetadata?.role ?? "user"}</p>
          </div>
          <button
            onClick={() => deleteUser(u.id)}
            disabled={loadingId === u.id}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loadingId === u.id ? "Duke fshirë..." : "Fshi"}
          </button>
        </li>
      ))}
    </ul>
  );
}
