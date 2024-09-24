interface Testimonial {
  name: string;
  role: string;
  review: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Johnson",
    role: "Frequent Rider",
    review:
      "The best bike rental experience! Bikes are always in great condition and customer service is top-notch.",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Emily Davis",
    role: "Tourist",
    review:
      "Rented a bike for a day and had a blast exploring the city. Smooth and easy process!",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Chris Lee",
    role: "Adventure Enthusiast",
    review:
      "Fantastic selection of bikes for all terrains. Loved the off-road bike I rented for my weekend trip.",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className="dark:bg-gray-100 py-16 bg-slate-700">
      <div className="container mx-auto ">
        <h2 className="text-4xl font-bold text-center dark:text-slate-800 mb-12 text-green-300">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="dark:bg-white  dark:text-green-500 text-white shadow-lg rounded-lg p-6 text-center transform transition duration-300 hover:shadow-xl bg-slate-400"
            >
              <img
                src={testimonial.avatar}
                alt={`${testimonial.name}'s avatar`}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1 dark:text-gray-500 text-white">
                {testimonial.name}
              </h3>
              <p className="italic mb-3 dark:text-gray-500 text-white">
                {testimonial.role}
              </p>
              <p className=" dark:text-gray-500 text-white">
                "{testimonial.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
