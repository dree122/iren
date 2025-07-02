import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const text = `Featured projects that have been meticulously crafted 
  with passion to drive results and impact.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);
    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);
    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section id="achievement" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"achievement"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            id="project"
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div
              ref={(el) => (overlayRefs.current[index] = el)}
              className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
            />

            <div className="flex justify-between px-6 text-black transition-all duration-500 md:group-hover:px-8 md:group-hover:text-white">
              <h2 className="lg:text-[28px] text-[22px] leading-none">
                {project.name}
              </h2>
              <Icon icon="lucide:arrow-up-right" className="md:size-5 size-4" />
            </div>

            <div className="w-full h-0.5 bg-black/80" />

            <div className="flex px-6 text-[10px] leading-loose uppercase transition-all duration-500 md:text-xs gap-x-4 md:group-hover:px-8">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-black transition-colors duration-500 md:group-hover:text-white"
                >
                  {framework.name}
                </p>
              ))}
            </div>

            <div className="relative flex items-center justify-center px-6 md:hidden h-[240px]">
              <img
                src={project.bgImage}
                alt={`${project.name}-bg-image`}
                className="object-cover w-full h-full rounded-md brightness-50"
              />
              <img
                src={project.image}
                alt={`${project.name}-image`}
                className="absolute object-contain w-[60%] max-h-[160px] rounded-lg"
              />
            </div>

                           <div className="px-6 mt-2">
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setShowModal(true);
                    }}
                    className="relative inline-flex items-center gap-2 text-sm font-medium text-yellow-500 group"
                  >
                    <span className="relative z-10 group-hover:underline">Lihat Selengkapnya</span>
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-300 group-hover:bg-yellow-500 transition-all scale-x-0 group-hover:scale-x-100 origin-left"></span>
                    <Icon icon="lucide:eye" className="text-yellow-500 group-hover:text-yellow-600 size-4 transition-all" />
                  </button>
                </div>
          </div>
        ))}

        <div
          ref={previewRef}
          className="fixed top-10 left-10 z-50 overflow-hidden border-4 border-black pointer-events-none w-[520px] md:block hidden opacity-0 rounded-md"
        >
          {currentIndex !== null && (
            <img
              src={projects[currentIndex].image}
              alt="preview"
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {showModal && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white max-w-lg w-[90%] p-6 rounded-lg relative animate-fadeIn">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-2">
                {selectedProject.name}
              </h2>
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-auto rounded mb-4"
              />
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {selectedProject.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Works;