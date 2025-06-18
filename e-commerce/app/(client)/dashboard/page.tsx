// import Link from 'next/link';
// import ProfilePage from '../profile/page';
// import OrdersPage from '../orders/page';

// type Props = {
//   searchParams: { tab?: string };
// };

// export default function Dashboard({ searchParams }: Props) {
//   const tab = searchParams.tab || 'profile';

//   const renderContent = () => {
//     switch (tab) {
//       case 'orders':
//         return <OrdersPage />;
//       case 'profile':
//       default:
//         return <ProfilePage />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-100 p-6 shadow-lg">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">My Dashboard</h2>
//         <ul className="space-y-4">
//           <li>
//             <Link
//               href="/dashboard?tab=profile"
//               className={`block px-4 py-2 rounded-lg ${
//                 tab === 'profile' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-200'
//               }`}
//             >
//               👤 Profile
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/dashboard?tab=orders"
//               className={`block px-4 py-2 rounded-lg ${
//                 tab === 'orders' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-200'
//               }`}
//             >
//               📦 My Orders
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           {tab === 'orders' ? '📦 Orders' : '👤 Profile'}
//         </h1>
//         <div className="bg-white shadow-md rounded-2xl p-6">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// }
import Link from 'next/link';
import ProfilePage from '../profile/page';
import OrdersPage from '../orders/page';
import CartPage from '../cart/page';

type Props = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function Dashboard({ searchParams }: Props) {
  const params = await searchParams;
  const tab = params.tab || 'profile';

  const renderContent = () => {
    switch (tab) {
      case 'orders':
        return <OrdersPage />;
      case 'cart':
        return <CartPage />;
      case 'profile':
      default:
        return <ProfilePage />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link
              href="/dashboard?tab=profile"
              className={`block px-4 py-2 rounded-lg ${
                tab === 'profile' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-200'
              }`}
            >
              👤 Profile
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard?tab=orders"
              className={`block px-4 py-2 rounded-lg ${
                tab === 'orders' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-200'
              }`}
            >
              📦 My Orders
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard?tab=cart"
              className={`block px-4 py-2 rounded-lg ${
                tab === 'cart' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-200'
              }`}
            >
              🛒 Cart
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {tab === 'orders' ? '📦 Orders' : tab === 'cart' ? '🛒 Cart' : '👤 Profile'}
        </h1>
        <div className="bg-white shadow-md rounded-2xl p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
