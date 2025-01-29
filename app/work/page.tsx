import { Rocket, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";
import Link from "next/link";
import { projects, techStack } from "../lib/data";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 lg:px-24 py-20">
      {/* Glowing Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-48 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      </div>
      {/* Header Section */}
      <div className="relative mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Full-Stack Developer
          </span>
          <br />
          <span className="text-2xl md:text-3xl font-medium text-gray-300">
            Turning Coffee ☕ into Code
          </span>
        </h1>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl">
          Building stuff that works (most of the time) ⚡
        </p>
        <Sparkles className="absolute right-0 -top-4 md:-top-10 h-12 w-12 md:w-24 md:h-24 text-purple-400/30 animate-pulse" />
      </div>

      {/* Experience Section */}
      <section className="relative mb-20 md:mb-28">
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-purple-500 to-transparent" />
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            My Journey
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-purple-500 to-transparent" />
        </div>

        {/* Timeline Item */}
        <div className="relative pl-6 md:pl-8 ml-3 md:ml-4 border-l-2 border-gray-800/50">
          <div className="absolute w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded-full -left-[7px] md:-left-[10px] top-0 shadow-glow-purple" />

          <div className="mb-12 md:mb-16 group">
            <div className="flex flex-col items-start gap-2 md:gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs md:text-sm text-cyan-300">
                  May - Aug &apos;24
                </span>
                <Rocket className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold">
                Frontend Intern @{" "}
                <Link
                  href="http://themoondevs.com/"
                  target="_blank"
                  className="hover:text-cyan-400 transition-colors"
                >
                  MoonDev
                </Link>
              </h3>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl">
              Turned coffee ☕ into code • Shipped features faster than my WiFi
              drops 📉 • Mastered the art of{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                &quot;Wait, why is this working?&quot;
              </span>{" "}
              🤔• Learned to fix bugs 🐛 like a pro
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative mb-28">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-pink-500 to-transparent" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
            Crazy Creations
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-pink-500 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={cn(
                "group relative p-6 rounded-xl border border-gray-800/50 bg-gradient-to-b from-gray-900/30 to-gray-900/10",
                "hover:border-pink-400/30 hover:from-gray-900/50 hover:to-gray-900/30",
                "transition-all duration-500 hover:-translate-y-2",
                "animate-fade-in opacity-0"
              )}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <project.icon className="w-8 h-8 text-pink-400" />
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-sm bg-gray-800/50 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(200px_at_50%_120%,_#ec489920_0%,_transparent_80%)] opacity-0 group-hover:opacity-50 transition-opacity" />
            </div>
          ))}
        </div>
      </section>
      {/* Tech Stack Section */}
      <section className="relative">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-500 to-transparent" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
            Arsenal of Awesomeness
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-cyan-500 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, index) => (
            <div
              key={tech.name}
              className={cn(
                "group relative p-8 rounded-2xl border border-gray-800/50 bg-gradient-to-b from-gray-900/30 to-gray-900/10",
                "hover:border-cyan-400/30 hover:from-gray-900/50 hover:to-gray-900/30",
                "transition-all duration-500 hover:-translate-y-2",
                "animate-fade-in opacity-0"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(200px_at_50%_120%,_#3b82f620_0%,_transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity" />

              <tech.icon className="w-12 h-12 mb-6 text-cyan-400 animate-float" />
              <h3 className="text-2xl font-bold mb-3">{tech.name}</h3>
              <p className="text-gray-400 leading-relaxed">
                {tech.description}
              </p>
              <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

