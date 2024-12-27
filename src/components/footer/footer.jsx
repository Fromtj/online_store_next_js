import logo from '@/assets/images/logo.png';
import Image from 'next/image';

export default function Footer() {
  return (
    <section className="w-full bg-[#1C2536] text-white">
      <footer className="max-w-6xl mx-auto flex justify-between px-4 py-10 xs:grid xs:grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <Image className="w-24 mb-4" src={logo} alt="Company Logo" />
          <p className="text-sm text-gray-400">
            Your trusted partner in [business/services]. Delivering quality since [year].
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">About Us</a></li>
            <li><a href="#" className="hover:text-gray-300">Services</a></li>
            <li><a href="#" className="hover:text-gray-300">Products</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li>Email: <a href="mailto:info@company.com" className="hover:text-gray-300">info@company.com</a></li>
            <li>Phone: <a href="tel:+123456789" className="hover:text-gray-300">+1 234 567 89</a></li>
            <li>Address: 123 Business Street, City, Country</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.833.656-2.828.775a4.932 4.932 0 002.165-2.724 9.863 9.863 0 01-3.127 1.196A4.917 4.917 0 0016.616 3c-2.72 0-4.924 2.204-4.924 4.924 0 .386.044.762.13 1.124A13.978 13.978 0 011.67 3.149a4.905 4.905 0 001.523 6.56 4.902 4.902 0 01-2.23-.616v.062a4.924 4.924 0 003.946 4.83 4.924 4.924 0 01-2.224.085 4.924 4.924 0 004.6 3.417 9.876 9.876 0 01-6.1 2.102c-.398 0-.79-.023-1.175-.068A13.935 13.935 0 007.548 21c9.044 0 13.999-7.498 13.999-13.998 0-.214-.005-.426-.014-.637A9.936 9.936 0 0024 4.557z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.197 21H4.803C2.16 21 0 18.84 0 16.197V7.803C0 5.16 2.16 3 4.803 3h4.394v4.197H6.15C5.134 7.197 4.3 8.031 4.3 9.05v5.9c0 1.018.834 1.852 1.85 1.852h3.047V21zm6.354-8.882a3.103 3.103 0 01-3.097-3.104c0-1.71 1.387-3.104 3.097-3.104a3.103 3.103 0 013.103 3.104c0 1.717-1.387 3.104-3.103 3.104zm3.595 8.882h-2.987V12.9c0-.967-.799-1.75-1.778-1.75-.979 0-1.778.783-1.778 1.75v8.2h-2.987V8.802h2.987v1.564h.034c.419-.7 1.38-1.32 2.688-1.32 2.013 0 3.586 1.49 3.586 3.496V21z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </footer>

      <div className="bg-[#17202A] text-center py-4 text-sm text-gray-400">
        © 2024 Your Company Name. All Rights Reserved.
      </div>
    </section>
  );
}
