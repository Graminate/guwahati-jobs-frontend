import Link from "next/link";

export default function EmployerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Employer Dashboard</h1>
      </header>
      <section>
        <p className="mb-4">
          Welcome to your dashboard! Use the navigation below to manage your
          postings and view applications:
        </p>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard/employer/post-job">
              <p className="text-blue-600 hover:underline">Post a New Job</p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/employer/applications">
              <p className="text-blue-600 hover:underline">View Applications</p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/employer/interviews">
              <p className="text-blue-600 hover:underline">Manage Interviews</p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/employer/reviews">
              <p className="text-blue-600 hover:underline">Company Reviews</p>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
