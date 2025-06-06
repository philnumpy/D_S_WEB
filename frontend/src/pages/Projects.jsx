import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";

import PdfViewer from "../components/PdfViewer";

import {
  Building2,
  ArrowLeft,
  Calendar,
  ExternalLink,
  MapPin,
} from "lucide-react";
import Footer from "../components/Footer";
import Map from "../components/Map";
import DarkModeToggle from "../util/DarkMode";

const Projects = () => {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [formErrors, setFormErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // For image popup
  function convertToEmbedUrl(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null; // or return original if needed
  }
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Property Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    )
      errors.email = "Invalid email address";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phone.trim()))
      errors.phone = "Invalid phone number";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsModalOpen(false);

    const brochureUrl = project.BrochureUrl || "../../public/RESUME_MS.pdf";
    const link = document.createElement("a");
    link.href = brochureUrl;
    link.download = `${project.title}-Brochure.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-md flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Prime Estates
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Trusted Properties in Prime Locations
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <DarkModeToggle />
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition shadow"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Brochure at Top */}
          <div className="relative w-full mb-12">
            <img
              src={
                project.image ||
                "https://via.placeholder.com/1920x600?text=Brochure+Image"
              }
              alt="Brochure Preview"
              className="w-full h-[400px] object-cover sm:h-[500px] md:h-[600px]"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-lg text-base font-medium"
            >
              Download Brochure
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl shadow-xl">
              <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
                {project.title}
              </h1>
              <p className="text-lg opacity-90 mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-6 text-sm sm:text-base">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 opacity-80" />
                  <span className="font-medium">
                    Duration: {project.duration}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ExternalLink className="w-5 h-5 opacity-80" />
                  <span className="font-medium">Type: {project.category}</span>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Property Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {["interior", "exterior", "layout", "locality"].map((cat) => (
                  <Link
                    key={cat}
                    to={`/project/${project.id}/gallery/${cat}`}
                    className="group block relative rounded-lg overflow-hidden shadow-lg"
                  >
                    <img
                      src={project.galleryCovers[cat]}
                      alt={`${cat} cover`}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 w-full bg-black/60 text-white py-2 text-center font-semibold capitalize">
                      {cat}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="rounded-lg overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800 mb-8">
                <div className="aspect-video w-full">
                  <iframe
                    src={convertToEmbedUrl(project.video)}
                    title="Virtual Property Tour"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  ></iframe>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-600">
                <h3 className="text-xl font-bold mb-4">View Brochure</h3>
                <PdfViewer url="https://drive.google.com/file/d/1FJQyWJAAg7FO5C9Lzh5zq4g5M_R1ykBD/view?usp=sharing" />
              </div>

              <h3 className="text-xl font-bold mb-4">Property Location</h3>
              <Map projectTitle={project.title} />

              <div className="grid md:grid-cols-2 gap-8 mt-10">
                <div>
                  <h3 className="text-xl font-bold mb-4">Overview</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Imagine valleys draped in emerald forests, peaks crowned
                    with snow reaching into the blue sky, and rivers sparkling
                    as they weave through charming villages – Uttarakhand is
                    nature’s masterpiece.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Whether it’s Nainital’s lakes, Rishikesh’s spiritual vibes
                    or Auli’s snowy landscapes, each part tells a story that
                    beckons travelers to explore.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Key Features</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    {project.Advantages.map((adv, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-600">
                <h3 className="text-xl font-bold mb-4">Amenities</h3>
                <div className="flex flex-wrap gap-3">
                  {project.features.map((f, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-600">
                <h3 className="text-xl font-bold mb-4">Location & Contact</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Prime Location</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        Excellent connectivity to highways, metro stations,
                        commercial centers, schools, and hospitals.
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-x-4">
                    <span>• 5 min to Metro Station</span>
                    <span>• 10 min to IT Hub</span>
                    <span>• 15 min to Airport</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Brochure Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full p-6 relative">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xl font-bold"
                  aria-label="Close modal"
                >
                  ×
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Download Brochure
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {["name", "email", "phone"].map((field) => (
                    <div key={field}>
                      <label
                        htmlFor={`modal-${field}`}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize"
                      >
                        {field} *
                      </label>
                      <input
                        id={`modal-${field}`}
                        name={field}
                        type={field === "email" ? "email" : "text"}
                        value={formData[field]}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors[field]
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
                        autoComplete="off"
                      />
                      {formErrors[field] && (
                        <p className="text-red-600 text-sm mt-1">
                          {formErrors[field]}
                        </p>
                      )}
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition shadow"
                  >
                    Get Brochure
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Projects;
