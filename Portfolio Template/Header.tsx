import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-orange-600 shadow-sm">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex justify-end space-x-4">
          <li><Link href="#projects" className="text-white hover:text-orange-200">Projects</Link></li>
          <li><Link href="#skills" className="text-white hover:text-orange-200">Skills</Link></li>
          <li><Link href="#contact" className="text-white hover:text-orange-200">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}

