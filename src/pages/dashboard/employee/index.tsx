import Link from "next/link";

export default function EmployeeDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Employee Dashboard</h1>
      </header>
      <section>
        <p className="mb-4">
          Welcome to your dashboard! Use the navigation below to access
          different sections:
        </p>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard/employee/profile">
              <p className="text-blue-600 hover:underline">My Profile</p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/employee/saved-jobs">
              <p className="text-blue-600 hover:underline">Saved Jobs</p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/employee/applications">
              <p className="text-blue-600 hover:underline">My Applications</p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/employee/alerts">
              <p className="text-blue-600 hover:underline">Job Alerts</p>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
