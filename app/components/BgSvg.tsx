
const BgSvg = () => {
  return (
    <div>
      {" "}
      {/* Background SVGs */}
      <svg
        className="absolute top-10 left-1/4 sm:left-32 w-24 h-24 opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 50 Q50 30, 100 50"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-10 left-1/2 sm:left-60 w-24 h-24 opacity-15"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 60 C40 80, 60 20, 100 60"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="absolute top-20 right-10 w-24 h-24 opacity-25"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 50 C50 30, 50 70, 100 50"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-60 right-1/4 sm:right-36 w-12 h-12 opacity-25"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 50 C50 30, 50 70, 100 50"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}
export default BgSvg