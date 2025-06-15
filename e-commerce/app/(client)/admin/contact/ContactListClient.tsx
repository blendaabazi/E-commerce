"use client";

import React, { useEffect, useState } from "react";

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
}

export default function ContactListClient() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error("Gabim gjatë marrjes së kontakteve");
      const data = await res.json();
      if (Array.isArray(data)) {
        setContacts(data);
      } else if (Array.isArray(data.contacts)) {
        setContacts(data.contacts);
      } else {
        setContacts([]);
      }
    } catch (error) {
      alert("Gabim në ngarkimin e kontakteve");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) return <p>Po ngarkohen kontaktet...</p>;

  if (contacts.length === 0) return <p>Nuk ka kontakte për t’u shfaqur.</p>;

  return (
    <ul className="space-y-4">
      {contacts.map((contact) => (
        <li key={contact.id} className="p-4 border rounded shadow">
          <p><strong>Emri:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Mesazhi:</strong> {contact.message}</p>
        </li>
      ))}
    </ul>
  );
}
