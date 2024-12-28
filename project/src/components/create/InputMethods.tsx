import React, { useState } from 'react';
import TextInput from './TextInput';
import FileUpload from './FileUpload';
import TopicInput from './TopicInput';
import { FileText, Upload, Wand2 } from 'lucide-react';
import '../../index.css';

type InputMethod = 'text' | 'file' | 'topic';

export default function InputMethods() {
  const [activeMethod, setActiveMethod] = useState<InputMethod>('text');

  const methods = [
    {
      id: 'text' as InputMethod,
      icon: FileText,
      title: 'Paste Text',
      description: 'Paste your study material directly'
    },
    {
      id: 'file' as InputMethod,
      icon: Upload,
      title: 'Upload File',
      description: 'Upload PDF or TXT files'
    },
    {
      id: 'topic' as InputMethod,
      icon: Wand2,
      title: 'AI Generation',
      description: 'Generate from a topic'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => setActiveMethod(method.id)}
            className={`
              pixel-corners p-4 text-left transition-all duration-200 
              hover:shadow-lg hover:scale-102
              ${
                activeMethod === method.id
                  ? 'bg-[#C094E4] text-white shadow-md'
                  : 'bg-[#FDF0F2] hover:bg-[#FFDBE9]'
              }
            `}
          >
            <div className="flex flex-col gap-2">
              <method.icon 
                className={`w-6 h-6 ${
                  activeMethod === method.id 
                    ? 'text-white' 
                    : 'text-[#C094E4]'
                }`} 
              />
              <h3 className="font-semibold text-lg text-[#FBADD1]">{method.title}</h3>
              <p className={`text-sm ${
                activeMethod === method.id 
                  ? 'text-white/90' 
                  : 'text-[#C094E4]/80'
              }`}>
                {method.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-6 bg-[#FDF0F2] pixel-corners">
        {activeMethod === 'text' && <TextInput />}
        {activeMethod === 'file' && <FileUpload />}
        {activeMethod === 'topic' && <TopicInput />}
      </div>
    </div>
  );
}