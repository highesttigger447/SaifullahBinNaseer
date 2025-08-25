import { Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-orange-400 to-orange-600 text-white">
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">John Doe</h1>
          <h2 className="text-2xl mb-8">Full Stack Developer</h2>
          <p className="text-xl mb-8">Passionate about creating elegant solutions to complex problems.</p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-200">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:john@example.com" className="hover:text-orange-200">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <Image 
            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=755&q=80" 
            alt="John Doe" 
            width={400} 
            height={400} 
            className="rounded-full mx-auto"
          />
        </div>
      </div>
    </section>
  )
}

