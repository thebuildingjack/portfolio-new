import StarBackground from '@/components/StarBackground'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Tools from '@/components/Tools'
import WorkExperience from '@/components/WorkExperience'
import GitHubGraph from '@/components/GitHubGraph'
import Projects from '@/components/Projects'
import Thoughts from '@/components/Thoughts'
import Connect from '@/components/Connect'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="flex items-center justify-center relative min-h-screen w-full">
      {/* Background stars */}
      <StarBackground />

      {/* Navbar */}
      <Navbar />

      {/* Sections */}
      <div className="flex flex-col items-center justify-center gap-10 w-full relative z-10 pad max-w-3xl">
        <Hero />
        <Tools />
        <WorkExperience />
        <GitHubGraph />
        <Projects />
        <Thoughts />
        <Connect />
        <Footer />
      </div>
    </main>
  )
}
