import ClientAdminContacts from "./ClientAdminContacts";

// Ky fetch përdor `cache: "no-store"` për të detyruar fetch pa cache, pra **SSR**
async function getContacts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`, {
    cache: "no-store",  // <-- kjo bën që fetch të bëhet gjithmonë në server, pa cache
  });
  if (!res.ok) {
    throw new Error("Failed to fetch contacts");
  }
  return res.json();
}

export default async function AdminContactsPage() {
     // Këtu bëhet **SSR fetch** për kontaktet
  const data = await getContacts();
  return <ClientAdminContacts contacts={data.contacts || []} />;
}
