import DefaultLayout from "@/layout/DefaultLayout";
import Head from "next/head";
import Link from "next/link";
import JobPostingHero from "./JobPostingHero";
import { useAuth } from "@/context/AuthContext";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const { isLoggedIn, isLoadingAuth } = useAuth();
  const getStartedLink = isLoggedIn ? "/talent/home" : "/auth/register";
  return (
    <>
      <Head>
        <title>
          Guwahati-Jobs | The Free Recruiting Tool To Hire Better, Faster
        </title>
        <meta
          name="description"
          content="Attract, manage, and hire the best talent with Join. Post jobs for free, collaborate with your team, and streamline your recruiting process."
        />
      </Head>

      <DefaultLayout noSidebar>
        <main>
          <section className=" py-20 md:py-32 px-6 text-center">
            <div className="flex flex-col ">
              <h1 className="text-4xl md:text-5xl max-w-4xl mx-auto font-extrabold text-black mb-6 leading-tight">
                Recruiting software connecting job seekers and business owners
                in and around Guwahati
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Apply, interview, and find the best job for you and grow your
                confidence — one great job at a time.
              </p>
            </div>

            <Link
              href={getStartedLink}
              aria-disabled={isLoadingAuth}
              onClick={(e) => {
                if (isLoadingAuth) e.preventDefault();
              }}
              className={`inline-block bg-indigo-200 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-100 transition text-base md:text-lg ${
                isLoadingAuth ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Get started for free
            </Link>
          </section>

          {/* Feature Highlights Section */}
          <section className="py-16 md:py-24 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-16">
                Everything you need to streamline your hiring
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Attract the best talent
                  </h3>
                  <p className="text-gray-600">
                    Create stunning job ads in minutes and publish them on
                    multiple free & premium job boards with one click.
                  </p>
                </div>
                {/* Feature 2 */}
                <div className="p-6">
                  {/* Placeholder for Icon */}

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Collaborate efficiently
                  </h3>
                  <p className="text-gray-600">
                    Rate candidates, leave comments, and make better hiring
                    decisions together with your team.
                  </p>
                </div>
                {/* Feature 3 */}
                <div className="p-6">
                  <div className="text-blue-600 mb-4 text-4xl flex justify-center"></div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Hire faster
                  </h3>
                  <p className="text-gray-600">
                    Manage all your applicants in one place, automate tasks, and
                    speed up your recruitment process.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 md:py-28">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-black mb-20 md:mb-24 max-w-4xl mx-auto">
                The better solution to attract, screen, and manage talent in one
                tool
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="flex flex-col items-center">
                  <p className="text-base text-gray-600 mb-3">
                    Discover your perfect hire
                  </p>

                  <p className="text-5xl font-semibold text-black mb-1 leading-none">
                    4x
                  </p>

                  <p className="text-xl font-bold text-gray-300">faster</p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-base text-gray-600 mb-3">
                    Companies received more than
                  </p>
                  <p className="text-5xl font-semibold text-black mb-1 leading-none">
                    30M
                  </p>
                  <p className="text-xl font-bold text-gray-300">
                    applications
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center">
                  <p className="text-base text-gray-600 mb-3">
                    Streamline your process with just
                  </p>
                  <p className="text-5xl font-semibold text-black mb-1 leading-none">
                    1
                  </p>
                  <p className="text-xl font-bold text-gray-300">hiring tool</p>
                </div>
              </div>
            </div>
          </section>

          <JobPostingHero />

          <section className="py-16 md:py-24 px-6 bg-blue-50">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
                Loved by hiring teams worldwide
              </h2>
              <div className="space-y-8">
                {/* Testimonial 1 */}
                <blockquote className="p-6 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-700 italic mb-4">
                    "Join has completely transformed our hiring process. It's
                    intuitive, saves us countless hours, and the collaboration
                    features are fantastic."
                  </p>
                  <footer className="text-gray-600 font-semibold">
                    — Jane Doe, HR Manager @ Tech Startup
                  </footer>
                </blockquote>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-500 to-indigo-600 py-20 md:py-28 px-4 sm:px-6 lg:px-8">
            <div className="bg-white max-w-4xl mx-auto rounded-xl shadow-xl text-center py-16 md:py-20 px-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Start hiring
                <span className="inline-flex items-center align-middle mx-2">
                  <span className="inline-block h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full ring-2 ring-white bg-pink-200 -ml-1"></span>
                  <span className="inline-block h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full ring-2 ring-white bg-orange-200 -ml-2 md:-ml-3"></span>
                  <span className="inline-block h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full ring-2 ring-white bg-purple-200 -ml-2 md:-ml-3"></span>
                </span>
                faster.
                <br />
                And smarter.
              </h1>

              {/* Call to Action Button */}
              <div className="mt-8 mb-12">
                <Link
                  href={getStartedLink}
                  aria-disabled={isLoadingAuth} // Use context state
                  onClick={(e) => {
                    if (isLoadingAuth) e.preventDefault(); // Use context state
                  }}
                  className={`inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition text-base md:text-lg ${
                    isLoadingAuth ? "opacity-50 cursor-not-allowed" : "" // Use context state
                  }`}
                >
                  Get started for free
                </Link>
              </div>
            </div>
          </section>
        </main>
      </DefaultLayout>
      <Footer />
    </>
  );
}
