import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";

interface Company {
  id: number;
  user_id: number;
  company_name: string;
  description?: string;
  logo_url?: string;
  industry?: string;
  website?: string;
  location?: string;
  social_links?: Record<string, string>;
}

export default function CompaniesIndex() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/companies")
      .then((response) => {
        setCompanies(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching companies:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Companies</h1>
      </header>
      {loading ? (
        <p>Loading companies...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map((company) => (
            <div key={company.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{company.company_name}</h2>
              {company.industry && (
                <p className="text-gray-700">Industry: {company.industry}</p>
              )}
              {company.location && (
                <p className="text-gray-700">Location: {company.location}</p>
              )}
              <Link href={`/companies/${company.id}`}>
                <p className="mt-4 inline-block text-blue-600 hover:underline">
                  View Company
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
