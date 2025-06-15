
"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientAdminContacts({ contacts }: { contacts: any[] }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) router.push("/sign-in");
    else if (user.publicMetadata?.role !== "admin") router.push("/not-authorized");
  }, [isLoaded, user, router]);

  if (!isLoaded || !user) return <div>Loading user info...</div>;

  if (user.publicMetadata?.role !== "admin") return <div>Nuk ke akses në këtë faqe.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Kontaktet e Administratës</h1>
      {contacts.length === 0 && <p>Nuk ka mesazhe kontakti.</p>}
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id} className="mb-4 p-4 border rounded">
            <p><strong>Emri:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Mesazhi:</strong> {contact.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
