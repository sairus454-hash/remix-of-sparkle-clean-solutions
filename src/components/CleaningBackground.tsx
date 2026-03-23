const CleaningBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient — static, no animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-accent/30 to-fresh/10" />

      {/* Clean wave pattern at bottom — static SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32 sm:h-48 opacity-10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="hsl(var(--primary))"
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  );
};

export default CleaningBackground;
