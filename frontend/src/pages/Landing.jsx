// src/pages/Landing.jsx
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";
import Chat from "../components/Chat";
import { projects } from "../data/projects";
import { Building2 } from "lucide-react";
import DarkModeToggle from "../util/DarkMode";
import ModelViewer from "../components/ModelViewer";
const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Prime Estates
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 dark:text-gray-100 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <a href="#projects" className="text-gray-700 dark:text-gray-100 hover:text-blue-600 transition-colors font-medium">
                Projects
              </a>
              <a href="#contact" className="text-gray-700 dark:text-gray-100 hover:text-blue-600 transition-colors font-medium">
                Contact
              </a>
            </nav>
            <DarkModeToggle />
          </div>
        </div>
      </header>
      

      {/* Hero Section */}
      <section className="relative">
        <Carousel />
      </section>

      {/* Description Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Your Trusted Real Estate Partner
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 animate-fade-in">
            At Prime Estates, we specialize in creating exceptional residential and commercial properties 
            that enhance lifestyles and drive business growth. From luxury societies to affordable housing, 
            commercial complexes to premium plots - we build spaces that people love to call home.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quality Construction</h3>
              <p className="text-gray-600 dark:text-gray-300">Premium materials and expert craftsmanship in every project we deliver.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Prime Locations</h3>
              <p className="text-gray-600 dark:text-gray-300">Strategic locations with excellent connectivity and future growth potential.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Customer First</h3>
              <p className="text-gray-600 dark:text-gray-300">Dedicated support and transparent processes for a seamless experience.</p>
            </div>
          </div>
        </div>
      </section>
      <ModelViewer modelPath="/model5.glb" />
      {/* Projects Section */}
      <section id="projects" className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 animate-fade-in">
            Our Featured Properties
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Chat />
    </div>
  );
};

export default Landing;
