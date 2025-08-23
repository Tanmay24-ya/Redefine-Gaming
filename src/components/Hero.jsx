import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const videoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  // GSAP scroll effect for background video
  useGSAP(() => {
    gsap.fromTo(
      "#video-frame",
      { scale: 1.2 },
      {
        scale: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  const videoSrc = "videos/feature-1.mp4";

  return (
    <div className="relative h-dvh w-screen overflow-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-violet-50">
          {/* Loader */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Background Video */}
      <div id="video-frame" className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          className="h-full w-full object-cover"
          onLoadedData={handleVideoLoad}
        />
      </div>

      {/* Text Block - LEFT SIDE */}
      <div className="relative z-20 flex h-full items-center pl-10 sm:pl-20">
          <div>
              <h1 className="special-font hero-heading text-white font-bold leading-tight text-[clamp(2.5rem,6vw,5rem)]">
                  REDEFINE <br /> G<b>A</b>MING
              </h1>

              <p className="mb-6 mt-4 max-w-xl font-robert-regular text-white text-[clamp(1rem,2vw,1.75rem)] leading-relaxed">
                  Dive into the Metagame Layer, transcend the ordinary, break the
                  boundaries of play, and unlock the true potential of the Play Economy.
              </p>

          <Button 
            id="watch-trailer"
            title="Watch trailer"
            leftIcon={<TiLocationArrow />}
            containerClass="bg-yellow-300 flex-center gap-1 text-xl sm:text-2xl lg:text-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
