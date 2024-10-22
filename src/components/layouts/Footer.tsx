import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-20  bg-slate-600 dark:bg-slate-200 footer text-green-300 dark:text-base-content p-10 flex flex-col md:flex-row justify-between items-start">
      {/* Company Info */}
      <aside className="flex items-start mb-6 md:mb-0">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current"
        >
          <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
        </svg>
        <p className="ml-4">
          Sk bike Rentals
          <br />
          Providing you a safe riders for your journey{" "}
        </p>
      </aside>

      <div className="grid">
        {/* Services */}
        <nav className="mb-6 md:mb-0 ">
          <h6 className="footer-title ">Services</h6>
          <a className="link link-hover pr-2">Rent Bike</a>
          <a className="link link-hover pr-2">Safe journey</a>
          <a className="link link-hover pr-2">Discount</a>
          <a className="link link-hover pr-2">Affordable</a>
        </nav>

        {/* Company */}
        <nav className="mb-6 md:mb-0">
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover pr-2">About us</a>
          <a className="link link-hover pr-2">Contact</a>
          <a className="link link-hover pr-2">All bike</a>
          <a className="link link-hover pr-2">My Rentals</a>
        </nav>

        {/* Legal */}
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover pr-2">Terms of use</a>
          <a className="link link-hover pr-2">Privacy policy</a>
          <a className="link link-hover pr-2">Cookie policy</a>
        </nav>
      </div>

      {/* Social Media Links */}
      <div className="mt-6 md:mt-0">
        <h6 className="footer-title">Follow Us</h6>
        <div className="flex space-x-4 mt-2">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700"
          >
            <FaLinkedinIn size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
