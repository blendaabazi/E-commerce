"use client"; // nëse je në app directory dhe kjo është komponent client-side

import { useState } from "react";

interface Props {
  userId: string;
  currentRole: string;
  onRoleChanged: (newRole: string) => void;
}

export default function ChangeRoleButton({ userId, currentRole, onRoleChanged }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function makeAdmin() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: "admin" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update role");
      } else {
        onRoleChanged("admin");
      }
    } catch (err) {
      setError("Error updating role");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p>Current role: {currentRole}</p>
      <button onClick={makeAdmin} disabled={loading || currentRole === "admin"}>
        {loading ? "Updating..." : "Make Admin"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
