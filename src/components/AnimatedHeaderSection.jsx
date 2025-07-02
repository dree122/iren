import React, { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor = "text-black", // default black
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);

  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : undefined,
    });

    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });

    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: 200,
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  }, []);

  return (
    <div ref={contextRef} className="overflow-hidden">
      {/* Title section */}
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-6 pt-20 px-6 sm:gap-8 sm:px-10"
        >
          {/* Subtitle */}
          {subTitle && (
            <p
              className={`text-base md:text-lg font-semibold tracking-wider uppercase ${textColor}`}
            >
              {subTitle}
            </p>
          )}

          {/* Title */}
          <h1
            className={`flex flex-col gap-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase ${textColor}`}
          >
            {titleParts.map((part, index) => (
              <span key={index}>{part}</span>
            ))}
          </h1>
        </div>
      </div>

      {/* Description */}
      <div className={`relative px-6 sm:px-10 mt-8 ${textColor}`}>
        <div className="py-10 sm:py-12 text-end">
          <AnimatedTextLines
            text={text}
            className={`font-light text-sm sm:text-base md:text-lg uppercase ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
