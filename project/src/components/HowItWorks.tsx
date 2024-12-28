import React from 'react';
import aiImage from './images/ai.jpg';
import exportImage from './images/export.jpg';
import inputImage from './images/input.jpg';



export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#FDF0F2] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#C094E4] mb-4">
            How QuizzWhiz Works
          </h2>
          <p className="text-xl text-[#C094E4] max-w-2xl mx-auto">
            Create effective flashcards in three simple steps
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Input Content',
                description: 'Paste text, upload files, or specify a topic for AI generation',
                image: inputImage
              },
              {
                step: '02',
                title: 'AI Processing',
                description: 'Our AI analyzes your content and creates optimized flashcards',
                image: aiImage
              },
              {
                step: '03',
                title: 'Study & Export',
                description: 'Review your flashcards and export them in your preferred format',
                image: exportImage
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="aspect-[4/3] mb-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-[#C094E4] text-[#FDF0F2] w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <h3 className="text-[#C094E4] text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-[#C094E4]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}