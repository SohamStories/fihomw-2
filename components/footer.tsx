"use client";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Finance Dashboard</h3>
            <p className="mb-4 max-w-md text-gray-400">
              Helping you take control of your finances with powerful tracking, budgeting, and forecasting tools.
            </p>
            <p className="text-sm text-gray-500">
              © {currentYear} Finance Dashboard. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              {["Blog", "Help Center", "Guides", "API Documentation"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Careers", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
