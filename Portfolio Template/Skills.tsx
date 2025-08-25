const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker']

export default function Skills() {
  return (
    <section id="skills" className="bg-orange-200 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-orange-800">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill) => (
            <span key={skill} className="bg-orange-600 text-white rounded-full px-4 py-2 text-sm font-semibold">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

