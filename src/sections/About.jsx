import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `I secure digital systems,
protect data from cyber threats,
and build trust through safe technology.`;

  const aboutText = `Nama saya Iren Febikana Br Bangun, mahasiswa dengan fokus besar pada Cyber Security.

Saya percaya bahwa keamanan digital bukan hanya soal teknologi, tapi juga tanggung jawab menjaga privasi dan kepercayaan pengguna.

Saya tertarik pada bagaimana sistem dapat diserang dan dilindungi, bagaimana serangan bisa dicegah, dan bagaimana membangun sistem yang kuat dari awal.

Saat ini saya aktif mempelajari:
🛡️ Analisis kerentanan & penetration testing
🔐 Enkripsi dan manajemen akses
🌐 Keamanan web & aplikasi
📚 Edukasi keamanan digital untuk pengguna umum

Setiap baris kode yang saya pelajari hari ini, saya dedikasikan untuk dunia digital yang lebih aman.`;

  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });

    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });

  return (
    <section id="about" className="min-h-screen bg-black rounded-b-3xl">
      <AnimatedHeaderSection
        subTitle={"Cyber Security for a Safer Web"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-10 pb-16 text-white/80">
        <div className="w-full lg:w-1/2">
          <p className="text-base md:text-xl font-light tracking-wide leading-relaxed whitespace-pre-line text-justify">
            {aboutText}
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            ref={imgRef}
            src="/assets/backgrounds/iren.jpg"
            alt="Iren"
            className="max-w-md w-full aspect-[4/3] object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
