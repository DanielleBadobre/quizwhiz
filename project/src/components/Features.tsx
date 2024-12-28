import React, { useRef } from 'react';
import { Zap, FileType, Download, Edit3 } from 'lucide-react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax relative overflow-hidden">
      <motion.div 
        className="scroller whitespace-nowrap flex" 
        style={{ x }}
      >
        <span className="mr-4">{children} </span>
        <span className="mr-4">{children} </span>
        <span className="mr-4">{children} </span>
        <span className="mr-4">{children} </span>
      </motion.div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="bg-[#FFDBE9] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <ParallaxText baseVelocity={-2}>
            Powerful Features for Effective Learning
          </ParallaxText>
          <p className="text-xl text-[#C094E4] max-w-2xl mx-auto mt-8">
            Everything you need to create, manage, and study with AI-generated flashcards
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-[#FDF0F2] hover:bg-[#FFC1CC] transition-colors pixel-corners p-6 shadow-sm">
            <Zap className="h-10 w-10 text-[#FCAAB6] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#8668A0]">Instant Generation</h3>
            <p className="text-[#8668A0]">
              Get AI-powered flashcards in seconds, no matter the content length
            </p>
          </div>

          <div className="p-6 bg-[#FDF0F2] hover:bg-[#FFC1CC] transition-colors pixel-corners shadow-sm">
            <FileType className="h-10 w-10 text-[#FCAAB6] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#8668A0]">Multiple Formats</h3>
            <p className="text-[#8668A0]">
              Support for PDF, TXT, and direct text input with smart parsing
            </p>
          </div>

          <div className="bg-[#FDF0F2] hover:bg-[#FFC1CC] transition-colors pixel-corners p-6 shadow-sm">
            <Edit3 className="h-10 w-10 text-[#FCAAB6] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#8668A0]">Easy Editing</h3>
            <p className="text-[#8668A0]">
              Customize and edit your flashcards with our intuitive interface
            </p>
          </div>

          <div className="bg-[#FDF0F2] hover:bg-[#FFC1CC] transition-colors pixel-corners p-6 shadow-sm">
            <Download className="h-10 w-10 text-[#FCAAB6] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#8668A0]">Export Options</h3>
            <p className="text-[#8668A0]">
              Export to CSV format for use in other flashcards apps
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}