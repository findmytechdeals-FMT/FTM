import React from 'react';

interface CategoryAnimatedPictureProps {
  categoryId: string;
  categoryName?: string;
  className?: string;
}

export const CategoryAnimatedPicture: React.FC<CategoryAnimatedPictureProps> = ({
  categoryId,
  categoryName = 'Tech Category',
  className = 'w-full h-full'
}) => {
  const normId = categoryId.toLowerCase();

  return (
    <div className={`relative overflow-hidden select-none ${className}`}>
      {/* Dynamic Background Mesh Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
      
      {/* Background Subtle Tech Grid Dots */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* RENDER CATEGORY SPECIFIC ANIMATED ILLUSTRATION */}
      {normId === 'smartphones' && <SmartphonesAnimatedIllustration />}
      {normId === 'audio' && <AudioAnimatedIllustration />}
      {normId === 'speakers' && <SpeakersAnimatedIllustration />}
      {normId === 'computers' && <ComputersAnimatedIllustration />}
      {normId === 'tvs' && <TvsAnimatedIllustration />}
      {normId === 'appliances' && <AppliancesAnimatedIllustration />}
      {normId === 'wearables' && <WearablesAnimatedIllustration />}
      {normId === 'gaming' && <GamingAnimatedIllustration />}
      {normId === 'smarthome' && <SmartHomeAnimatedIllustration />}
      {normId === 'cameras' && <CamerasAnimatedIllustration />}
      {normId === 'power' && <PowerAnimatedIllustration />}
      {normId === 'accessories' && <AccessoriesAnimatedIllustration />}

      {/* Fallback for any unknown category */}
      {![
        'smartphones', 'audio', 'speakers', 'computers', 'tvs', 
        'appliances', 'wearables', 'gaming', 'smarthome', 'cameras', 
        'power', 'accessories'
      ].includes(normId) && <GenericTechAnimatedIllustration categoryName={categoryName} />}

      {/* Ambient Lens Vignette & Sheen Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-white/5 pointer-events-none" />
    </div>
  );
};

/* =========================================================================
   1. SMARTPHONES: Floating flagship phone with dynamic screen & signal bars
   ========================================================================= */
const SmartphonesAnimatedIllustration: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    {/* Ambient Glow */}
    <div className="absolute w-44 h-44 rounded-full bg-cyan-500/20 blur-2xl animate-cat-glow" />

    {/* Floating Elements Container */}
    <div className="relative w-full max-w-[240px] h-[180px] flex items-center justify-center animate-cat-float">
      
      {/* Smartphone Chassis */}
      <div className="relative w-28 h-40 bg-slate-800 rounded-3xl p-1.5 shadow-2xl border-2 border-slate-700/80 shadow-cyan-950/50 flex flex-col justify-between overflow-hidden">
        
        {/* Dynamic Island / Notch */}
        <div className="relative z-20 flex justify-center items-center pt-1">
          <div className="h-2.5 w-10 bg-slate-950 rounded-full flex items-center justify-between px-1.5 border border-slate-800">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-emerald-400" />
          </div>
        </div>

        {/* OLED Screen */}
        <div className="relative z-10 w-full flex-1 rounded-2xl bg-gradient-to-b from-slate-900 via-indigo-950/80 to-slate-900 p-2 overflow-hidden flex flex-col justify-between mt-1">
          {/* Animated Wallpaper Wave */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/25 to-purple-500/20 blur-md animate-pulse" />

          {/* Screen Content: Mini Clock & Widgets */}
          <div className="relative z-10 space-y-1">
            <div className="h-1.5 w-8 bg-cyan-400/80 rounded-full" />
            <div className="h-1 w-12 bg-slate-700 rounded-full" />
          </div>

          {/* Screen App Icons Grid */}
          <div className="relative z-10 grid grid-cols-3 gap-1 my-auto px-0.5">
            {[
              'from-cyan-400 to-blue-500', 
              'from-purple-400 to-pink-500', 
              'from-amber-400 to-orange-500', 
              'from-emerald-400 to-teal-500', 
              'from-blue-400 to-indigo-500', 
              'from-rose-400 to-red-500'
            ].map((grad, i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-md bg-gradient-to-tr ${grad} shadow-xs flex items-center justify-center transform hover:scale-110 transition-transform`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
              </div>
            ))}
          </div>

          {/* Bottom Nav Bar */}
          <div className="relative z-10 flex justify-center pb-0.5">
            <div className="w-8 h-1 bg-white/40 rounded-full" />
          </div>
        </div>

        {/* Glass reflection beam */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform -skew-x-12 translate-x-1" />
      </div>

      {/* Floating 5G Signal Badge */}
      <div className="absolute -top-1 -right-1 bg-slate-800/90 backdrop-blur-md border border-cyan-500/40 px-2 py-1 rounded-xl shadow-lg flex items-center gap-1.5 animate-cat-float-reverse">
        <div className="flex items-end gap-0.5 h-3">
          <div className="w-0.5 h-1 bg-cyan-400 rounded-full animate-pulse" />
          <div className="w-0.5 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="w-0.5 h-3 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>
        <span className="text-[10px] font-black text-cyan-300 font-mono">5G+</span>
      </div>

      {/* Floating Message Chip */}
      <div className="absolute bottom-2 -left-3 bg-slate-800/90 backdrop-blur-md border border-slate-700/80 px-2.5 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 animate-cat-float">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[9px] font-bold text-slate-200">120Hz OLED</span>
      </div>

    </div>
  </div>
);

/* =========================================================================
   2. AUDIO: Over-ear headphones, earbuds & dancing audio equalizer bars
   ========================================================================= */
const AudioAnimatedIllustration: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    {/* Sound Aura Background */}
    <div className="absolute w-44 h-44 rounded-full bg-indigo-500/20 blur-2xl animate-cat-glow" />

    {/* Expanding Acoustic Wave Rings */}
    <div className="absolute w-28 h-28 rounded-full border border-cyan-400/30 animate-cat-wave" />
    <div className="absolute w-36 h-36 rounded-full border border-purple-400/25 animate-cat-wave" style={{ animationDelay: '800ms' }} />
    <div className="absolute w-44 h-44 rounded-full border border-indigo-400/20 animate-cat-wave" style={{ animationDelay: '1600ms' }} />

    <div className="relative w-full max-w-[220px] h-[170px] flex flex-col items-center justify-center">
      
      {/* Over-ear Headphones Vector */}
      <div className="relative z-10 animate-cat-float flex flex-col items-center">
        {/* Headband Arc */}
        <div className="w-24 h-14 border-t-4 border-l-4 border-r-4 border-slate-700 rounded-t-full relative">
          <div className="absolute inset-x-2 -top-1.5 h-1.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full" />
        </div>

        {/* Ear Cups */}
        <div className="w-28 flex justify-between -mt-2">
          {/* Left Cup */}
          <div className="w-6 h-10 rounded-2xl bg-gradient-to-b from-slate-700 to-slate-900 border-2 border-cyan-500/50 shadow-lg flex items-center justify-center">
            <div className="w-2 h-6 rounded-full bg-cyan-400/40" />
          </div>
          {/* Right Cup */}
          <div className="w-6 h-10 rounded-2xl bg-gradient-to-b from-slate-700 to-slate-900 border-2 border-purple-500/50 shadow-lg flex items-center justify-center">
            <div className="w-2 h-6 rounded-full bg-purple-400/40" />
          </div>
        </div>
      </div>

      {/* Floating TWS Earbud */}
      <div className="absolute right-2 top-4 animate-cat-float-reverse z-20 bg-slate-800/90 border border-slate-700 rounded-xl p-1.5 shadow-xl flex items-center gap-1.5">
        <div className="w-3.5 h-5 rounded-full bg-gradient-to-b from-white to-slate-300 border border-slate-400 shadow-inner flex flex-col items-center justify-between py-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          <div className="w-1 h-2 rounded-full bg-slate-600" />
        </div>
        <span className="text-[9px] font-bold text-cyan-300">ANC ON</span>
      </div>

      {/* Animated Equalizer Visualizer */}
      <div className="relative z-10 flex items-end gap-1.5 h-8 mt-3 bg-slate-950/80 px-3 py-1 rounded-xl border border-slate-800 backdrop-blur-md">
        <div className="w-1.5 rounded-full bg-cyan-400" style={{ animation: 'cat-equalizer-1 1.2s ease-in-out infinite' }} />
        <div className="w-1.5 rounded-full bg-blue-400" style={{ animation: 'cat-equalizer-2 0.9s ease-in-out infinite' }} />
        <div className="w-1.5 rounded-full bg-indigo-400" style={{ animation: 'cat-equalizer-3 1.4s ease-in-out infinite' }} />
        <div className="w-1.5 rounded-full bg-purple-400" style={{ animation: 'cat-equalizer-1 0.8s ease-in-out infinite', animationDelay: '200ms' }} />
        <div className="w-1.5 rounded-full bg-pink-400" style={{ animation: 'cat-equalizer-2 1.1s ease-in-out infinite', animationDelay: '300ms' }} />
        <div className="w-1.5 rounded-full bg-cyan-400" style={{ animation: 'cat-equalizer-3 1.3s ease-in-out infinite', animationDelay: '100ms' }} />
      </div>

    </div>
  </div>
);

/* =========================================================================
   3. SPEAKERS: Smart cylindrical speaker with pulsing bass driver & LED ring
   ========================================================================= */
const SpeakersAnimatedIllustration: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute w-44 h-44 rounded-full bg-blue-500/20 blur-2xl animate-cat-glow" />

    {/* Bass Ripple Waves */}
    <div className="absolute w-32 h-32 rounded-full border border-blue-400/30 animate-cat-wave" />
    <div className="absolute w-44 h-44 rounded-full border border-cyan-400/20 animate-cat-wave" style={{ animationDelay: '1s' }} />

    <div className="relative z-10 flex flex-col items-center animate-cat-float">
      {/* Smart Speaker Cylinder */}
      <div className="relative w-24 h-32 rounded-3xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-700 shadow-2xl flex flex-col items-center justify-between p-2.5 overflow-hidden">
        
        {/* Top Interactive LED Ring */}
        <div className="w-14 h-3 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 shadow-md shadow-cyan-400/50 animate-pulse" />

        {/* Pulsing Bass Woofer Diaphragm */}
        <div className="relative my-auto flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-slate-950 border-2 border-slate-700 shadow-inner flex items-center justify-center animate-cat-pulse-scale">
            {/* Center Dust Cap */}
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/70" />
            </div>
          </div>
          {/* Acoustic Wave Ring Around Woofer */}
          <div className="absolute inset-0 rounded-full border border-cyan-400/50 animate-ping opacity-30" />
        </div>

        {/* Speaker Acoustic Mesh Texture dots */}
        <div className="w-full flex justify-center gap-1.5 opacity-60">
          <div className="w-1 h-1 rounded-full bg-slate-400" />
          <div className="w-1 h-1 rounded-full bg-slate-400" />
          <div className="w-1 h-1 rounded-full bg-slate-400" />
          <div className="w-1 h-1 rounded-full bg-slate-400" />
        </div>
      </div>

      {/* Floating Soundbar Pill */}
      <div className="mt-3 bg-slate-800/90 backdrop-blur-md border border-slate-700/80 px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[10px] font-bold text-slate-200">360° Spatial Audio</span>
      </div>
    </div>
  </div>
);

/* =========================================================================
   4. COMPUTERS: Open ultra-thin laptop, code editor, blinking cursor & chip
   ========================================================================= */
const ComputersAnimatedIllustration: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute w-44 h-44 rounded-full bg-cyan-500/20 blur-2xl animate-cat-glow" />

    <div className="relative w-full max-w-[220px] flex flex-col items-center animate-cat-float">
      
      {/* Laptop Screen Display */}
      <div className="relative w-36 h-24 bg-slate-900 rounded-t-xl border-2 border-slate-700 shadow-xl overflow-hidden p-1.5 flex flex-col justify-between">
        {/* Top Camera Notch */}
        <div className="w-full flex justify-center pb-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </div>

        {/* Screen IDE / UI Windows */}
        <div className="flex-1 bg-slate-950 rounded-md p-1.5 border border-slate-800/80 font-mono text-[8px] flex flex-col justify-between overflow-hidden">
          {/* Code Lines with Blinking Cursor */}
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <span className="text-pink-400 font-bold">const</span>
              <span className="text-cyan-300">power</span>
              <span className="text-white">=</span>
              <span className="text-amber-300">&quot;MAX&quot;</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-purple-400">benchmarks</span>
              <span className="text-emerald-400">.run()</span>
              <span className="inline-block w-1.5 h-2.5 bg-cyan-400 animate-pulse" />
            </div>
          </div>

          {/* Performance Chart / Progress Bar */}
          <div className="space-y-0.5 pt-1 border-t border-slate-800">
            <div className="flex justify-between text-[7px] text-slate-400">
              <span>M4 Silicon</span>
              <span className="text-cyan-400 font-bold">99.4%</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse w-5/6" />
            </div>
          </div>
        </div>
      </div>

      {/* Laptop Base & Trackpad */}
      <div className="relative w-44 h-3 bg-slate-700 rounded-b-xl border-t border-slate-600 shadow-2xl flex justify-center items-center">
        {/* Trackpad notch */}
        <div className="w-10 h-1 bg-slate-800 rounded-full" />
      </div>

      {/* Floating AI Chip Badge */}
      <div className="absolute -top-2 -right-1 bg-slate-800/90 border border-cyan-500/50 rounded-xl px-2 py-1 shadow-xl flex items-center gap-1.5 animate-cat-float-reverse">
        <div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-[7px] font-black text-slate-950">
          AI
        </div>
        <span className="text-[9px] font-bold text-slate-200">Neural Engine</span>
      </div>

    </div>
  </div>
);

/* =========================================================================
   5. TVS: Ultra-thin OLED TV with Ambilight backlight & remote beam
   ========================================================================= */
const TvsAnimatedIllustration: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    {/* Dynamic Ambilight Aurora Behind TV */}
    <div className="absolute w-44 h-32 bg-gradient-to-r from-purple-600/30 via-cyan-500/35 to-rose-500/30 blur-2xl rounded-full animate-pulse" />

    <div className="relative z-10 flex flex-col items-center animate-cat-float">
      
      {/* 4K OLED TV Display */}
      <div className="relative w-40 h-24 bg-slate-900 rounded-lg border border-slate-600 shadow-2xl p-1 overflow-hidden flex flex-col justify-between">
        
        {/* On-screen Vibrant HDR Visuals */}
        <div className="relative w-full h-full rounded bg-gradient-to-tr from-indigo-950 via-slate-900 to-purple-900 overflow-hidden flex items-center justify-center">
          {/* Animated Glowing Sun / Orb */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 blur-xs shadow-lg animate-cat-pulse-scale" />

          {/* HDR Badge */}
          <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-xs px-1 py-0.5 rounded text-[7px] font-black text-amber-300 border border-amber-400/30">
            4K OLED
          </div>

          {/* Cinema Sound Waves */}
          <div className="absolute bottom-1 right-1 flex items-center gap-0.5">
            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      {/* Stand Neck & Base */}
      <div className="w-3 h-2.5 bg-slate-600" />
      <div className="w-14 h-1.5 bg-slate-700 rounded-full shadow-lg" />

      {/* Floating Wireless Remote Pulse */}
      <div className="absolute -bottom-2 -left-2 bg-slate-800/90 border border-slate-700 px-2 py-1 rounded-xl shadow-lg flex items-center gap-1.5 animate-cat-float-reverse">
        <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
        <span className="text-[9px] font-bold text-slate-200">Dolby Vision</span>
      </div>

    </div>
  </div>
);

/* =========================================================================
   6. APPLIANCES: Smart Robot Vacuum with rotating LIDAR sensor & sweep path
   ========================================================================= */
const AppliancesAnimatedIllustration: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute w-44 h-44 rounded-full bg-teal-500/20 blur-2xl animate-cat-glow" />

    <div className="relative z-10 flex flex-col items-center">
      
      {/* Clean Path Rays */}
      <div className="absolute -bottom-1 w-32 h-6 bg-gradient-to-t from-teal-500/20 to-transparent blur-xs rounded-full" />

      {/* Robot Vacuum Body */}
      <div className="relative w-28 h-28 rounded-full bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-600 shadow-2xl flex items-center justify-center animate-cat-float">
        
        {/* Outer Ring Bumper Accent */}
        <div className="absolute inset-1.5 rounded-full border border-teal-500/40" />

        {/* Center LIDAR Laser Turret */}
        <div className="relative w-12 h-12 rounded-full bg-slate-950 border border-slate-700 shadow-inner flex items-center justify-center">
          {/* Rotating Laser Beam Scanner */}
          <div className="absolute inset-0 rounded-full animate-cat-radar flex items-center justify-center">
            <div className="w-full h-0.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-transparent" />
          </div>

          {/* Center Sensor Eye */}
          <div className="relative z-10 w-4 h-4 rounded-full bg-teal-400/80 shadow-md shadow-teal-400/50 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>

        {/* Dual Edge Cleaning Brushes Simulation */}
        <div className="absolute -top-1 left-3 w-3 h-3 rounded-full bg-teal-400/20 animate-ping" />
        <div className="absolute -top-1 right-3 w-3 h-3 rounded-full bg-teal-400/20 animate-ping" style={{ animationDelay: '500ms' }} />
      </div>

      {/* Floating Status Pill */}
      <div className="mt-3 bg-slate-800/90 border border-teal-500/40 px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-cat-float-reverse">
        <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
        <span className="text-[9px] font-bold text-teal-200">LiDAR Navigation</span>
      </div>

    </div>
  </div>
);

/* =========================================================================
   7. WEARABLES: Modern smartwatch with beating ECG pulse & activity rings
   ========================================================================= */
const WearablesAnimatedIllustration: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute w-44 h-44 rounded-full bg-rose-500/20 blur-2xl animate-cat-glow" />

    <div className="relative z-10 flex flex-col items-center animate-cat-float">
      
      {/* Smartwatch Top Strap */}
      <div className="w-12 h-6 bg-slate-700 rounded-t-xl border-t border-l border-r border-slate-600 shadow-md" />

      {/* Watch Case */}
      <div className="relative w-28 h-32 rounded-3xl bg-slate-900 border-2 border-slate-700 shadow-2xl p-2 flex flex-col justify-between overflow-hidden">
        
        {/* Watch Crown Dial */}
        <div className="absolute -right-1 top-6 w-1.5 h-5 rounded-r bg-slate-600 border border-slate-500" />

        {/* Watch Face Screen */}
        <div className="w-full h-full rounded-2xl bg-slate-950 p-2 flex flex-col justify-between border border-slate-800/80">
          
          {/* Top Status: Time & Battery */}
          <div className="flex justify-between items-center text-[8px] font-mono font-bold text-slate-400">
            <span className="text-slate-200">09:41</span>
            <span className="text-emerald-400">● 98%</span>
          </div>

          {/* Animated ECG Heart Wave */}
          <div className="relative my-auto flex flex-col items-center">
            <svg viewBox="0 0 100 24" className="w-full h-6 text-rose-500 overflow-visible">
              <path
                d="M 0 12 L 25 12 L 32 4 L 40 20 L 48 8 L 54 14 L 60 12 L 100 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
              />
            </svg>

            {/* Heart BPM */}
            <div className="flex items-center gap-1 mt-1">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="text-[9px] font-mono font-black text-rose-400">72 BPM</span>
            </div>
          </div>

          {/* Activity Fitness Rings */}
          <div className="flex justify-around items-center pt-1 border-t border-slate-900">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-rose-500 animate-pulse" />
            <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-400 animate-pulse" style={{ animationDelay: '200ms' }} />
            <div className="w-3.5 h-3.5 rounded-full border-2 border-cyan-400 animate-pulse" style={{ animationDelay: '400ms' }} />
          </div>

        </div>
      </div>

      {/* Smartwatch Bottom Strap */}
      <div className="w-12 h-6 bg-slate-700 rounded-b-xl border-b border-l border-r border-slate-600 shadow-md" />

    </div>
  </div>
);

/* =========================================================================
   8. GAMING: Wireless controller with glowing RGB thumbsticks & particles
   ========================================================================= */
const GamingAnimatedIllustration: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute w-44 h-44 rounded-full bg-purple-500/20 blur-2xl animate-cat-glow" />

    <div className="relative z-10 flex flex-col items-center animate-cat-float">
      
      {/* Gaming Controller Body */}
      <div className="relative w-36 h-24 rounded-3xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-600 shadow-2xl p-2.5 flex flex-col justify-between overflow-hidden">
        
        {/* Shoulder Triggers */}
        <div className="absolute -top-1 inset-x-5 flex justify-between">
          <div className="w-6 h-1.5 bg-slate-600 rounded-t" />
          <div className="w-6 h-1.5 bg-slate-600 rounded-t" />
        </div>

        {/* Top Center Touchpad & Lightbar */}
        <div className="w-full flex justify-center">
          <div className="w-12 h-2 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-md shadow-purple-500/50 animate-pulse" />
        </div>

        {/* Controls Layout */}
        <div className="flex justify-between items-center px-1 my-auto">
          {/* D-Pad */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="w-6 h-2 bg-slate-600 rounded-xs" />
            <div className="w-2 h-6 bg-slate-600 rounded-xs absolute" />
          </div>

          {/* Action Buttons (△ ○ ✕ ▢) */}
          <div className="grid grid-cols-2 gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 shadow-xs flex items-center justify-center text-[6px] font-bold text-slate-950">△</div>
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80 shadow-xs flex items-center justify-center text-[6px] font-bold text-slate-950">○</div>
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400/80 shadow-xs flex items-center justify-center text-[6px] font-bold text-slate-950">✕</div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-xs flex items-center justify-center text-[6px] font-bold text-slate-950">▢</div>
          </div>
        </div>

        {/* Dual Analog Thumbsticks with RGB Halos */}
        <div className="flex justify-around items-center pt-0.5">
          <div className="relative flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-cyan-400 shadow-md shadow-cyan-400/50 animate-pulse" />
            <div className="w-3.5 h-3.5 rounded-full bg-slate-950 absolute" />
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-purple-400 shadow-md shadow-purple-400/50 animate-pulse" style={{ animationDelay: '300ms' }} />
            <div className="w-3.5 h-3.5 rounded-full bg-slate-950 absolute" />
          </div>
        </div>
      </div>

      {/* Floating 120 FPS / Low Latency Badge */}
      <div className="mt-2.5 bg-slate-800/90 border border-purple-500/40 px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-cat-float-reverse">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
        <span className="text-[9px] font-bold text-purple-200">Zero-Lag Wireless</span>
      </div>

    </div>
  </div>
);

/* =========================================================================
   9. SMART HOME: Connected hub, radiating Wi-Fi arcs & ambient lighting
   ========================================================================= */
const SmartHomeAnimatedIllustration: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute w-44 h-44 rounded-full bg-amber-500/20 blur-2xl animate-cat-glow" />

    {/* Radiating Wi-Fi Signal Arcs */}
    <div className="absolute w-28 h-28 rounded-full border border-amber-400/30 animate-cat-wave" />
    <div className="absolute w-40 h-40 rounded-full border border-cyan-400/20 animate-cat-wave" style={{ animationDelay: '900ms' }} />

    <div className="relative z-10 flex flex-col items-center animate-cat-float">
      
      {/* Modern Smart Home House Silhouette */}
      <div className="relative w-28 h-28 flex flex-col items-center justify-end">
        {/* Gable Roof with Solar / Wireless Beacon */}
        <div className="relative w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[24px] border-b-slate-700">
          {/* Top Wi-Fi Dot */}
          <div className="absolute -top-4 -left-1.5 w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/60 animate-ping" />
        </div>

        {/* House Main Body */}
        <div className="w-24 h-16 bg-slate-800 rounded-b-xl border-2 border-t-0 border-slate-700 shadow-xl p-2 flex justify-between items-end">
          
          {/* Smart Ambient Window */}
          <div className="w-7 h-9 rounded-lg bg-gradient-to-b from-amber-300 via-amber-400 to-orange-400 shadow-lg shadow-amber-400/40 border border-amber-200/60 animate-pulse flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white" />
          </div>

          {/* Smart Door & Security Lock Indicator */}
          <div className="w-8 h-11 bg-slate-900 rounded-t-lg border border-slate-700 flex flex-col items-center justify-around py-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400 animate-pulse" />
            <div className="w-3 h-1 bg-slate-700 rounded-full" />
          </div>

        </div>
      </div>

      {/* Floating Matter Protocol Chip */}
      <div className="mt-2.5 bg-slate-800/90 border border-amber-400/40 px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-cat-float-reverse">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-[9px] font-bold text-amber-200">Matter & Thread Hub</span>
      </div>

    </div>
  </div>
);

/* =========================================================================
   10. CAMERAS: Mirrorless camera with iris aperture blades & focus reticle
   ========================================================================= */
const CamerasAnimatedIllustration: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute w-44 h-44 rounded-full bg-blue-500/20 blur-2xl animate-cat-glow" />

    <div className="relative z-10 flex flex-col items-center animate-cat-float">
      
      {/* Mirrorless Camera Body */}
      <div className="relative w-36 h-24 rounded-2xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-600 shadow-2xl p-2 flex items-center justify-center overflow-hidden">
        
        {/* Shutter Button & Dial */}
        <div className="absolute -top-1 left-4 w-4 h-2 bg-slate-500 rounded-t border border-slate-400" />
        <div className="absolute -top-1 right-6 w-5 h-2 bg-slate-600 rounded-t border border-slate-500" />

        {/* Viewfinder Hump */}
        <div className="absolute -top-1.5 inset-x-0 mx-auto w-8 h-2 bg-slate-700 rounded-t" />

        {/* Large Optical Zoom Lens Element */}
        <div className="relative w-20 h-20 rounded-full bg-slate-950 border-4 border-slate-700 shadow-2xl flex items-center justify-center">
          
          {/* Lens Glass Reflection Coating (Cyan / Magenta) */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-500/10 to-purple-500/25 animate-pulse" />

          {/* Aperture Iris Diaphragm Ring */}
          <div className="relative w-10 h-10 rounded-full border-2 border-dashed border-cyan-400/80 animate-cat-spin flex items-center justify-center">
            {/* Center Optical Pupil */}
            <div className="w-4 h-4 rounded-full bg-slate-950 border border-cyan-300 shadow-inner" />
          </div>

          {/* Autofocus Target Crosshair Reticle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 border border-emerald-400/50 rounded-md animate-ping opacity-30" />
          </div>
        </div>

        {/* Red Recording Tally Light */}
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-rose-500 shadow-md shadow-rose-500 animate-ping" />
          <span className="text-[7px] font-mono font-bold text-rose-400">REC</span>
        </div>
      </div>

      {/* Floating 4K 120p RAW Pill */}
      <div className="mt-2.5 bg-slate-800/90 border border-slate-700 px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-cat-float-reverse">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[9px] font-bold text-slate-200">Full-Frame Sensor</span>
      </div>

    </div>
  </div>
);

/* =========================================================================
   11. POWER: Fast GaN charger, pulsing lightning bolt & rising battery
   ========================================================================= */
const PowerAnimatedIllustration: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute w-44 h-44 rounded-full bg-amber-500/20 blur-2xl animate-cat-glow" />

    <div className="relative z-10 flex flex-col items-center animate-cat-float">
      
      {/* Power Bank / GaN Charging Brick */}
      <div className="relative w-28 h-32 rounded-3xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-600 shadow-2xl p-3 flex flex-col justify-between overflow-hidden">
        
        {/* Glowing Lightning Bolt Icon */}
        <div className="flex justify-center pt-1">
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-pulse" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
        </div>

        {/* 4-Level Sequential Battery Charge Blocks */}
        <div className="w-full bg-slate-950 p-1.5 rounded-xl border border-slate-800 space-y-1">
          <div className="flex justify-between text-[7px] font-mono font-bold text-amber-300">
            <span>FAST CHARGE</span>
            <span>140W</span>
          </div>
          <div className="grid grid-cols-4 gap-1 h-2">
            <div className="bg-amber-400 rounded-sm animate-pulse" />
            <div className="bg-amber-400 rounded-sm animate-pulse" style={{ animationDelay: '200ms' }} />
            <div className="bg-amber-400 rounded-sm animate-pulse" style={{ animationDelay: '400ms' }} />
            <div className="bg-amber-400 rounded-sm animate-pulse" style={{ animationDelay: '600ms' }} />
          </div>
        </div>

        {/* Dual USB-C Fast Ports */}
        <div className="flex justify-around items-center pt-1 border-t border-slate-800">
          <div className="w-5 h-1.5 rounded-full bg-cyan-400/80 shadow-xs" />
          <div className="w-5 h-1.5 rounded-full bg-amber-400/80 shadow-xs" />
        </div>
      </div>

      {/* Floating GaN Fast Tech Pill */}
      <div className="mt-2.5 bg-slate-800/90 border border-amber-400/40 px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-cat-float-reverse">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        <span className="text-[9px] font-bold text-amber-200">GaN III QuickCharge</span>
      </div>

    </div>
  </div>
);

/* =========================================================================
   12. ACCESSORIES: Mechanical keyboard with RGB wave & ergonomic mouse
   ========================================================================= */
const AccessoriesAnimatedIllustration: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute w-44 h-44 rounded-full bg-cyan-500/20 blur-2xl animate-cat-glow" />

    <div className="relative z-10 flex flex-col items-center animate-cat-float">
      
      {/* Mechanical Keyboard Deck */}
      <div className="relative w-36 h-20 rounded-xl bg-slate-900 border-2 border-slate-700 shadow-2xl p-1.5 flex flex-col justify-between overflow-hidden">
        
        {/* RGB Wave Backlight Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-cyan-500/25 to-purple-500/20 blur-sm animate-pulse" />

        {/* 3 Rows of RGB Keycaps */}
        <div className="relative z-10 space-y-1">
          {/* Row 1 */}
          <div className="grid grid-cols-7 gap-1">
            {['bg-cyan-400', 'bg-blue-400', 'bg-indigo-400', 'bg-purple-400', 'bg-pink-400', 'bg-rose-400', 'bg-amber-400'].map((col, i) => (
              <div key={i} className={`h-3 rounded-xs ${col} shadow-2xs opacity-90 hover:scale-110 transition-transform`} />
            ))}
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-7 gap-1">
            {['bg-teal-400', 'bg-cyan-400', 'bg-blue-400', 'bg-indigo-400', 'bg-purple-400', 'bg-pink-400', 'bg-rose-400'].map((col, i) => (
              <div key={i} className={`h-3 rounded-xs ${col} shadow-2xs opacity-90 hover:scale-110 transition-transform`} />
            ))}
          </div>
          {/* Row 3 (Spacebar row) */}
          <div className="flex gap-1">
            <div className="w-5 h-3 rounded-xs bg-slate-700" />
            <div className="flex-1 h-3 rounded-xs bg-gradient-to-r from-cyan-400 to-purple-500 shadow-xs" />
            <div className="w-5 h-3 rounded-xs bg-slate-700" />
          </div>
        </div>
      </div>

      {/* Floating Wireless Mouse */}
      <div className="absolute -bottom-1 -right-2 bg-slate-800/90 border border-cyan-400/40 rounded-xl px-2 py-1 shadow-xl flex items-center gap-1.5 animate-cat-float-reverse">
        <div className="w-2.5 h-4 rounded-full bg-slate-700 border border-slate-500 flex flex-col items-center justify-start pt-0.5">
          <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
        </div>
        <span className="text-[9px] font-bold text-cyan-200">Wireless Hub</span>
      </div>

    </div>
  </div>
);

/* =========================================================================
   GENERIC TECH FALLBACK: Tech core sphere with orbital gyroscope rings
   ========================================================================= */
const GenericTechAnimatedIllustration: React.FC<{ categoryName: string }> = ({ categoryName }) => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute w-44 h-44 rounded-full bg-cyan-500/20 blur-2xl animate-cat-glow" />

    <div className="relative z-10 flex flex-col items-center animate-cat-float">
      {/* Orbital Gyroscope Ring */}
      <div className="relative w-24 h-24 rounded-full border-2 border-cyan-400/60 animate-cat-spin flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-purple-400/50 animate-cat-wave" />
        {/* Core Glowing Orb */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 shadow-lg shadow-cyan-400/50 animate-pulse" />
      </div>

      <div className="mt-3 bg-slate-800/90 border border-slate-700 px-2.5 py-1 rounded-full shadow-lg">
        <span className="text-[10px] font-bold text-slate-200">{categoryName}</span>
      </div>
    </div>
  </div>
);
