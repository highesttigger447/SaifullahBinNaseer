export default function Footer() {
  return (
    <footer className="bg-orange-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
      </div>
    </footer>
  )
}

