import { useUserRole } from "@/context/UserRoleContext";

export default function AdminBanner() {
  const { isAdmin } = useUserRole();

  if (!isAdmin) return null;

  return <div className="bg-yellow-100 p-4">Welcome, admin!</div>;
}
