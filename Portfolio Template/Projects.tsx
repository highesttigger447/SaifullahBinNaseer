import Image from 'next/image'

const projects = [
  { 
    id: 1, 
    title: 'E-commerce Platform', 
    description: 'A full-featured e-commerce platform built with React and Node.js. Includes user authentication, product management, shopping cart, and payment integration.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  { 
    id: 2, 
    title: 'Task Management App', 
    description: 'A collaborative task management application using Vue.js and Firebase. Features real-time updates, task assignment, and progress tracking.',
    image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80'
  },
  { 
    id: 3, 
    title: 'Weather Forecast App', 
    description: 'A mobile-responsive weather application built with React Native. Utilizes geolocation and integrates with a weather API for accurate forecasts.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
]

export default function Projects() {
  return (
    <section id="projects" className="bg-orange-100 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-orange-800">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
              <Image src={project.image} alt={project.title} width={600} height={400} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-orange-600">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

