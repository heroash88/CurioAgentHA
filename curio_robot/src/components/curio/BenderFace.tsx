import React, { useState, useEffect, useMemo } from 'react';

export type CurioState = 'idle' | 'warmup' | 'listening' | 'speaking' | 'thinking' | 'error' | 'capturing' | 'dancing' | 'disconnected';

interface BenderFaceProps {
  state: CurioState;
  modelTranscript?: string | null;
  className?: string;
}

const BenderFace: React.FC<BenderFaceProps> = ({ state, modelTranscript, className }) => {
  const [animationId, setAnimationId] = useState<number>(0);

  // Logic to rotate through 30 "fun" idle/speaking/listening animations
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationId(Math.floor(Math.random() * 30) + 1);
    }, 4000 + Math.random() * 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Animation Preview Handler
  useEffect(() => {
    const handlePreview = (e: Event) => {
      const customEvent = e as CustomEvent;
      const action = customEvent.detail?.action;
      const id = customEvent.detail?.id;
      
      if (action === 'special' && typeof id === 'number') {
        setAnimationId(id);
      } else if (action === 'nod') {
        // Just shift up/down
        setAnimationId(28); // anim-28 is translateY(-40px)
        setTimeout(() => setAnimationId(0), 1000);
      } else if (action === 'bob') {
        setAnimationId(26); // anim-26 is scale(1.15)
        setTimeout(() => setAnimationId(0), 1000);
      } else if (action === 'blink') {
        setAnimationId(29); // anim-29 is opacity: 0.2 (kinda like blinking)
        setTimeout(() => setAnimationId(0), 400);
      }
    };

    window.addEventListener('curio:preview-animation', handlePreview);
    return () => window.removeEventListener('curio:preview-animation', handlePreview);
  }, []);


  const benderStateClass = useMemo(() => {
    switch (state) {
      case 'speaking': return 'speaking';
      case 'listening': return 'listening';
      case 'thinking': return 'thinking';
      case 'warmup': return 'warmup';
      case 'dancing': return 'dancing';
      case 'error': return 'error';
      default: return 'idle';
    }
  }, [state]);

  const currentAnimationClass = `anim-${animationId}`;

  return (
    <div className={`Bender ${benderStateClass} ${currentAnimationClass} ${className ?? ''}`}>
      <style>{`
        .Bender {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background: #a6b4c4;
          background-image: radial-gradient(#a6b4c4, #59798e);
          overflow: hidden;
          margin: 0;
          padding: 0;
        }

        .Bender__eyes {
          width: 640px;
          height: 240px;
          border: 6px solid black;
          border-radius: 200px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.3s ease;
        }

        .Bender__socket {
          width: 600px;
          height: 200px;
          border: 6px solid black;
          border-radius: 200px;
          background: black;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }

        .Bender__eye {
          height: 180px;
          width: 200px;
          background: #fefbb8;
          border-radius: 40px;
          margin: 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 4px solid rgba(0,0,0,0.1);
        }

        .Bender__eye::before {
          content: '';
          position: absolute;
          width: 240px;
          height: 120px;
          top: -120px;
          background: black;
          animation: 5s ease-in-out 1s infinite topEyelid;
          z-index: 2;
        }

        .Bender__eye::after {
          content: '';
          position: absolute;
          width: 240px;
          height: 120px;
          bottom: -120px;
          background: black;
          animation: 5s ease-in-out 1s infinite bottomEyelid;
          z-index: 2;
        }

        .Bender__pupil {
          width: 35px;
          height: 35px;
          background: #1a1a1a;
          border-radius: 4px;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
          transition: all 0.2s ease;
        }

        .Bender__mouth {
          width: 500px;
          height: 180px;
          background: #fefbb8;
          margin-top: 100px;
          border-radius: 90px;
          border: 8px solid black;
          display: flex;
          align-items: center;
          justify-content: space-around;
          overflow: hidden;
          position: relative;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .Bender__tooth {
          height: 180px;
          width: 8px;
          background: black;
          opacity: 0.8;
        }

        .Bender__lip {
          position: absolute;
          width: 500px;
          height: 8px;
          background: black;
          top: calc(33% - 4px);
          opacity: 0.8;
        }
        .Bender__lip:last-of-type {
          top: calc(66% - 4px);
        }

        /* KEYFRAMES */
        @keyframes topEyelid {
          0%, 100% { transform: translateY(-100%); }
          5%, 15% { transform: translateY(0); }
        }

        @keyframes bottomEyelid {
          0%, 100% { transform: translateY(100%); }
          5%, 15% { transform: translateY(0); }
        }

        /* STATE ANIMATIONS */
        .Bender.speaking .Bender__mouth {
          animation: benderChatter 0.1s infinite alternate;
        }

        .Bender.speaking .Bender__tooth {
          animation: toothJitter 0.15s infinite;
        }

        .Bender.speaking .Bender__lip {
          animation: lipJitter 0.1s infinite alternate;
        }

        @keyframes benderChatter {
          0% { transform: scaleY(1) translateY(0); }
          100% { transform: scaleY(1.05) translateY(-2px); }
        }

        @keyframes toothJitter {
          0%, 100% { transform: scaleX(1); opacity: 0.8; }
          50% { transform: scaleX(1.3); opacity: 1; }
        }

        @keyframes lipJitter {
          0% { transform: translateX(-1px); }
          100% { transform: translateX(1px); }
        }

        .Bender.listening .Bender__eyes {
           box-shadow: 0 0 60px rgba(255, 255, 0, 0.5);
        }

        .Bender.dancing {
          animation: benderDance 0.5s infinite alternate ease-in-out;
        }

        .Bender.idle .Bender__mouth {
          animation: idleMouthPulse 4s infinite ease-in-out;
        }

        @keyframes idleMouthPulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; transform: scale(1.01); }
        }
        @keyframes benderDance {
          from { transform: rotate(-5deg); }
          to { transform: rotate(5deg); }
        }
        @keyframes pupilTwitch {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(2px, -2px); }
          50% { transform: translate(-2px, 2px); }
          75% { transform: translate(2px, 2px); }
        }

        /* 30 RANDOM FUN ANIMATIONS */
        .anim-1 .Bender__eyes { transform: rotate(15deg); }
        .anim-2 .Bender__eye { transform: skewX(10deg); }
        .anim-3 .Bender__eye { transform: scaleX(0.8); }
        .anim-4 .Bender__socket { background: #330000; }
        .anim-5 .Bender__eye { background: #ffcccc; }
        .anim-6 .Bender__mouth { transform: translateY(-10px); }
        .anim-7 .Bender__mouth { background: #ffd700; }
        .anim-8 .Bender__eyes { filter: grayscale(1); }
        .anim-9 .Bender__eye { background: #ccffcc; }
        .anim-10 .Bender__pupil { transform: scale(2); }
        .anim-11 .Bender__eyes { transform: scale(1.1); }
        .anim-12 .Bender__mouth { transform: rotate(-5deg); }
        .anim-13 .Bender__tooth { width: 8px; }
        .anim-14 .Bender__pupil { border-radius: 50%; width: 30px; height: 30px; }
        .anim-15 .Bender__mouth { transform: scaleX(0.9); }
        .anim-16 .Bender { filter: sepia(0.5); }
        .anim-17 .Bender__eye { transform: scaleY(0.6); }
        .anim-18 .Bender__eye { border: 2px solid red; }
        .anim-19 .Bender__pupil { background: red; box-shadow: 0 0 10px red; }
        .anim-20 .Bender__mouth { border-radius: 10px; }
        .anim-21 .Bender__lip { background: #555; }
        .anim-22 .Bender__eyes { border-width: 8px; }
        .anim-23 .Bender { filter: hue-rotate(90deg); }
        .anim-24 .Bender__eye { background: #ffd700; box-shadow: inset 0 0 20px rgba(0,0,0,0.2); }
        .anim-25 .Bender__pupil { transform: translateY(-20px); }
        .anim-26 .Bender__eye { transform: scale(1.15); }
        .anim-27 .Bender__mouth { margin-top: 40px; }
        .anim-28 .Bender__eyes { transform: translateY(-40px); }
        .anim-29 .Bender__eye { opacity: 0.2; }
        .anim-30 .Bender__pupil { animation: pupilTwitch 0.1s infinite; }

      `}</style>

      <div className="Bender__eyes">
        <div className="Bender__socket">
          <div className="Bender__eye">
            <div className="Bender__pupil"></div>
          </div>
          <div className="Bender__eye">
            <div className="Bender__pupil"></div>
          </div>
        </div>
      </div>

      <div className="Bender__mouth">
        <div className="Bender__tooth"></div>
        <div className="Bender__tooth"></div>
        <div className="Bender__tooth"></div>
        <div className="Bender__tooth"></div>
        <div className="Bender__tooth"></div>
        <div className="Bender__lip"></div>
        <div className="Bender__lip"></div>
      </div>
    </div>
  );
};

export default BenderFace;
