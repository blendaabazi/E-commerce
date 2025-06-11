export default function NotAuthorized() {
  return (
    <div className="max-w-md mx-auto p-6 mt-20 mb-20 bg-red-100 rounded shadow text-center">
      <h1 className="text-2xl font-bold mb-6 text-red-700">Access Denied</h1>
      <p className="text-red-600">You do not have permission to view this page.</p>
    </div>
  );
}
