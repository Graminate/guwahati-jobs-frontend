import React from "react";
import Link from "next/link";
import Image from "next/image";

const logos = [
  { src: "/icons/indeed.png", alt: "Indeed" },
  { src: "/icons/linkedin.png", alt: "linkedin" },
  { src: "/icons/monster.png", alt: "Monster" },
  { src: "/icons/naukri.jpg", alt: "Naukri" },
  { src: "/icons/glassdoor.webp", alt: "Glassdoor" },
  { src: "/icons/quickrjobs.png", alt: "QuickrJobs" },
  { src: "/icons/telegram.webp", alt: "Telegram" },
  { src: "/icons/upwork.svg", alt: "Upwork" },
  { src: "/icons/facebook.png", alt: "Facebook" },
  { src: "/icons/kleinanzeigen.svg", alt: "Kleinanzeigen" },
  { src: "/icons/omr.svg", alt: "OMR Jobs" },
  { src: "/icons/talent.svg", alt: "Talent.com" },
  { src: "/icons/github.svg", alt: "GitHub Jobs" },
  { src: "/icons/happy.svg", alt: "Happy Agency" },
  { src: "/icons/jobware.svg", alt: "Jobware" },
  { src: "/icons/gs.svg", alt: "GS Platform" },
  { src: "/icons/stepstone.svg", alt: "Stepstone" },
  { src: "/icons/socialbee.svg", alt: "SocialBee" },
  { src: "/icons/baito.svg", alt: "Baito" },
  { src: "/icons/goodjobs.svg", alt: "Good Jobs" },
  { src: "/icons/omr2.svg", alt: "OMR Jobs variant" },
  { src: "/icons/jobsde.svg", alt: "Jobs.de" },
  { src: "/icons/workeer.svg", alt: "Workeer" },
  { src: "/icons/be.svg", alt: "Be Platform" },
];

const PlaceholderJobCard = () => (
  <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-auto border border-gray-500">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 rounded-full bg-pink-200 mr-3 flex items-center justify-center text-sm font-semibold text-pink-700">
        Acme
      </div>
      <span className="text-sm font-medium text-gray-700">Acme Inc.</span>
    </div>
    <div className="flex flex-col items-start">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Senior Project Manager (m/f/d)
      </h3>
      <p className="text-sm text-black mb-5">Berlin, Germany</p>
    </div>
    <div className="mb-5">
      <h4 className="flex flex-row items-start text-xs font-semibold text-black uppercase mb-2">
        About
      </h4>
      <div className="space-y-1.5">
        <div className="h-3 bg-gray-400 rounded w-full"></div>
        <div className="h-3 bg-gray-400 rounded w-5/6"></div>
        <div className="h-3 bg-gray-400 rounded w-3/4"></div>
      </div>
    </div>
    <div className="mb-5">
      <h4 className="flex flex-row items-start text-xs font-semibold text-black uppercase mb-2">
        Tasks
      </h4>
      <div className="space-y-1.5">
        <div className="h-3 bg-gray-400 rounded w-full"></div>
        <div className="h-3 bg-gray-400 rounded w-full"></div>
        <div className="h-3 bg-gray-400 rounded w-4/6"></div>
      </div>
    </div>
    <div className="mb-5">
      <h4 className="flex flex-row items-start text-xs font-semibold text-black uppercase mb-2">
        Requirements
      </h4>
      <div className="space-y-1.5">
        <div className="h-3 bg-gray-400 rounded w-full"></div>
        <div className="h-3 bg-gray-400 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);

export default function JobPostingHero() {
  return (
    <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(255, 214, 138, 0.15) 0%, transparent 30%), radial-gradient(circle at bottom right, rgba(135, 206, 250, 0.15) 0%, transparent 30%), #FAF8F7",
        }}
      ></div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24 lg:mb-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-5 leading-tight max-w-4xl mx-auto">
            Post your job ad to hundreds of job boards. With a single click.
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-xl mx-auto">
            Spend less time publishing job ads and more time hiring great
            people.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link href="/post-job" legacyBehavior>
              <a className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-200 text-base md:text-lg shadow-md">
                Post job ad
              </a>
            </Link>
            <Link href="/features/multipoisting" legacyBehavior>
              <a className="text-gray-800 hover:text-gray-900 font-medium underline underline-offset-2 transition duration-200 text-base">
                How multiposting works
              </a>
            </Link>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-center gap-8">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-5 lg:gap-6 w-[40%]">
              {logos
                .slice(0, Math.ceil(logos.length / 2))
                .map((logo, index) => (
                  <div
                    key={`logo-left-${index}`}
                    className="bg-white p-2 rounded-lg shadow-md flex items-center justify-center transition-transform hover:scale-105 w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px]"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={200}
                      height={200}
                      className=" object-contain"
                    />
                  </div>
                ))}
            </div>
            <PlaceholderJobCard />
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-5 lg:gap-6 w-[40%]">
              {logos.slice(Math.ceil(logos.length / 2)).map((logo, index) => (
                <div
                  key={`logo-right-${index}`}
                  className="bg-white p-2 sm:p-3 rounded-lg shadow-md flex items-center justify-center transition-transform hover:scale-105 w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px]"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-w-full max-h-[70%] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Mobile Layout */}
          <div className="md:hidden flex flex-wrap justify-center items-center gap-4 md:gap-5 lg:gap-6">
            {logos.map((logo, index) => (
              <div
                key={`logo-mobile-${index}`} // Use more specific keys if possible
                className="bg-white p-2 sm:p-3 rounded-lg shadow-md flex items-center justify-center transition-transform hover:scale-105 w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px]"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-w-full max-h-[70%] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
