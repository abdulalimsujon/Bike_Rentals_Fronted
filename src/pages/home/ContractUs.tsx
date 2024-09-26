const ContactUs = () => {
  return (
    <div className="bg-slate-700 dark:bg-gray-100 py-16 max-w-full mx-auto px-4 sm:px-6 lg:px-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-300 dark:text-slate-800 mb-12">
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div
            className="p-6 dark:bg-white dark:text-gray-500 bg-slate-400 text-white rounded-lg shadow-lg transform transition duration-300 hover:shadow-xl"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <form action="" className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-500 transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Image */}
          <div
            className="p-6 flex justify-center items-center rounded-lg shadow-lg bg-slate-400 dark:bg-white transform transition duration-300 hover:shadow-xl"
            data-aos="zoom-out-left"
            data-aos-duration="2000"
          >
            <img
              src="https://i.ibb.co/VWGHL78/tttt.jpg"
              alt="Contact"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
