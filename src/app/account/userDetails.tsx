// components/account/UserDetails.tsx

import { IUser } from "@/types/models.eshop";

type UserDetailsProps = {
  user: IUser | null;
  loading: boolean;
  onCreateAccount: () => void;
  onLogout: () => void;
  statusMessage: string;
};

export function UserDetails({ user, loading, onCreateAccount, onLogout, statusMessage }: UserDetailsProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">👤 Account Details</h1>

      {user ? (
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Name:</strong> {user.email || user.email || "—"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      <div className="space-y-2">
        <button
          onClick={onCreateAccount}
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Initialize User Account"}
        </button>
        <button onClick={onLogout} className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition">
          Logout
        </button>
      </div>

      {statusMessage && <p className={`text-sm text-center ${statusMessage.includes("❌") ? "text-red-600" : "text-gray-700"}`}>{statusMessage}</p>}
    </div>
  );
}
