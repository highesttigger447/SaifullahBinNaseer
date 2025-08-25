export default function Contact() {
  return (
    <section id="contact" className="bg-orange-100 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-orange-800">Contact Me</h2>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-orange-700 font-bold mb-2">Name</label>
            <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-orange-700 font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-orange-700 font-bold mb-2">Message</label>
            <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" required></textarea>
          </div>
          <button type="submit" className="bg-orange-600 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-700 transition-colors">Send Message</button>
        </form>
      </div>
    </section>
  )
}

