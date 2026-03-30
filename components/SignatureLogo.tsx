interface SignatureLogoProps {
  animate?: boolean;
  light?: boolean;
  className?: string;
}

export default function SignatureLogo({
  animate = false,
  light = false,
  className = "",
}: SignatureLogoProps) {
  return (
    <div
      className={`sig ${animate ? "sig-animate" : ""} ${light ? "sig-light" : ""} ${className}`}
    >
      <span className="sig-text">Abhi</span>
      <div className="sig-line" />
    </div>
  );
}
