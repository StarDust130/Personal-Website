import Image from "next/image";

export default function CoverImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
  onError,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  onError?: () => void;
}) {
  if (!src) return null;

  if (/\.svg(?:[?#]|$)/i.test(src)) {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={onError}
        className={`absolute inset-0 h-full w-full ${className ?? ""}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={onError}
      className={className}
    />
  );
}
