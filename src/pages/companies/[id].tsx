import { useRouter } from "next/router";
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

export default function CompanyDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/companies/${id}`)
        .then((response) => {
          setCompany(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching company:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p className="p-8">Loading company details...</p>;
  if (!company) return <p className="p-8">Company not found.</p>;

  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-dark">
          {company.company_name}
        </h1>
      </header>
      <div className="bg-white p-6 rounded-lg shadow">
        {company.logo_url && (
          <img
            src={company.logo_url}
            alt={company.company_name}
            className="w-32 h-32 object-contain mb-4"
          />
        )}
        {company.description && (
          <p className="text-gray-700 mb-2">{company.description}</p>
        )}
        {company.industry && (
          <p className="text-gray-700 mb-2">Industry: {company.industry}</p>
        )}
        {company.location && (
          <p className="text-gray-700 mb-2">Location: {company.location}</p>
        )}
        {company.website && (
          <p className="text-gray-700 mb-2">
            Website:{" "}
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {company.website}
            </a>
          </p>
        )}
        {company.social_links && (
          <div>
            <p className="text-gray-700 mb-2">Social Links:</p>
            <ul className="list-disc list-inside">
              {Object.entries(company.social_links).map(([key, url]) => (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {key}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mt-8">
        <Link href="/companies">
          <p className="text-blue-600 hover:underline">Back to Companies</p>
        </Link>
      </div>
    </div>
  );
}
