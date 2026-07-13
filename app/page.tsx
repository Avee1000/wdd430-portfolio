import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: 'E-Commerce Dashboard',
    description: 'A full-stack Next.js app for managing products.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com/your-username/wdd430-portfolio'
  },
  {
    title: 'Weather Application',
    description: 'A React app that fetches and displays weather data.',
    technologies: ['React', 'JavaScript', 'CSS'],
    link: 'https://github.com/your-username/project2'
  },
   {
    title: 'Car Rental Service',
    description: 'A React app for managing car rentals.',
    technologies: ['React', 'JavaScript', 'CSS'],
    link: 'https://github.com/your-username/cse340-React'
  }
];

export default function Home() { 
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
      <section className="text-center py-12">
        <h1 className="text-black text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700">
          I&apos;m a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}