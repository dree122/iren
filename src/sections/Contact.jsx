import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";

const Contact = () => {
  const text = `Hubungi aku, dan mari kita mulai cerita baru bersama!`;
  const items = [
    "just imagine, I code",
    "just imagine, I code",
    "just imagine, I code",
    "just imagine, I code",
    "just imagine, I code",
  ];

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section id="contact" className="min-h-screen bg-black flex flex-col justify-between">
      {/* Header */}
      <AnimatedHeaderSection
        subTitle="Iren Febikana Br Bangun"
        title="Contact"
        text={text}
        textColor="text-white"
        withScrollTrigger={true}
      />

      {/* Info */}
      <div className="flex flex-col gap-12 px-6 sm:px-10 pb-16 text-white font-light uppercase text-[22px] sm:text-[26px]">
        <div className="social-link space-y-3">
          <h2 className="text-lg tracking-widest">Email</h2>
          <div className="h-px bg-white/30" />
          <p className="text-base sm:text-lg lowercase">febikana0902@gmail.com</p>
        </div>

        <div className="social-link space-y-3">
          <h2 className="text-lg tracking-widest">Phone</h2>
          <div className="h-px bg-white/30" />
          <a
            href="https://wa.me/6285361080404?text=Halo%20Iren%2C%20saya%20tertarik%20untuk%20berkolaborasi!"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base sm:text-lg lowercase hover:text-white/80 transition-colors duration-200"
          >
            +62 853-6108-0404
          </a>
        </div>

        <div className="social-link space-y-3">
          <h2 className="text-lg tracking-widest">Social Media</h2>
          <div className="h-px bg-white/30" />
          <div className="flex flex-wrap gap-4">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base tracking-wider hover:text-white/80 transition-colors duration-200"
              >
                {"{ "}
                {social.name}
                {" }"}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
