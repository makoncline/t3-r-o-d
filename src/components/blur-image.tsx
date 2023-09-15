import React from "react";
import Image from "next/image";
import { toBlurImageUrl, toImageUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  imageKey: string;
  alt: string;
  width: number;
  height?: number;
  aspectRatio?: "square" | "portrait";
}

export const BlurUpImage = ({
  imageKey,
  alt,
  width,
  height = undefined,
  aspectRatio = "portrait",
  className,
}: Props) => {
  const imageUrl = toImageUrl(imageKey);
  const imageBlurUrl = toBlurImageUrl(imageKey);

  const loaded = useDelayedLoad(IS_PROD);

  return (
    <div
      className={cn(
        "relative",
        aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
        className,
      )}
      style={{
        width: `${width}px`,
        height: height ? `${height}px` : undefined,
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageBlurUrl})` }}
      />
      {loaded && (
        <Image
          src={imageUrl}
          alt={alt}
          fill={true}
          className={cn("h-auto w-auto object-cover")}
          unoptimized
        />
      )}
    </div>
  );
};

const TIMEOUT_DURATION = 2000;
const IS_PROD = process.env.NODE_ENV === "production";

const useDelayedLoad = (initialState: boolean) => {
  const [loaded, setLoaded] = React.useState(initialState);
  React.useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), TIMEOUT_DURATION);
    return () => clearTimeout(timeout);
  }, []);
  return loaded;
};
