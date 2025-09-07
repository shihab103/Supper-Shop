const ContactUs = () => {
  return (
    <div>
      <div>
        {/* banner section */}

        <section className="h-64 flex flex-col items-center justify-center lg:mx-20 mx-10 mt-5 secondary text-black text-center rounded-2xl shadow-md">
          <h1 className="text-5xl md:text-6xl font-bold mb-3">Contact Us</h1>
          <p className="max-w-2xl text-lg text-black/60 opacity-90">
            We’d love to hear from you! Get in touch with us for any queries,
            support, or feedback about Supper Shop.
          </p>
        </section>

        {/* form section */}
        <section className="my-10 grid md:grid-cols-2 gap-10 items-center">
          {/* Contact Form */}
          <form className="space-y-4 p-8 rounded-2xl">
            <h2 className="text-2xl text-center font-bold mb-4">Contact Us</h2>
            <div className="flex gap-4">
              <input
                className="input secondary input-bordered w-1/2 rounded-full"
                type="email"
                placeholder="Email"
              />
              <input
                className="input secondary input-bordered w-1/2 rounded-full"
                type="text"
                placeholder="Phone"
              />
            </div>
            <input
              className="input secondary input-bordered w-full rounded-full"
              type="text"
              placeholder="Name"
            />
            <textarea
              className="textarea secondary textarea-bordered w-full rounded-xl"
              placeholder="Message"
              rows="4"
            ></textarea>
            <button className="btn primary text-white w-full rounded-full">
              Submit
            </button>
          </form>

          {/* Newsletter Section */}
          <div className="primary text-primary-content p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Our Newsletter</h2>
            <p className="mb-6">
              Subscribe to our newsletter and stay updated with the latest
              offers, discounts, and product launches from Supper Shop.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full text-black rounded-full"
              />
              <button className="btn secondary text-black shadow-none font-bold rounded-full">
                Submit
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
