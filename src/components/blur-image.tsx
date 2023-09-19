import React from "react";
import Image, { type ImageProps } from "next/image";
import { toBlurImageUrl, toImageUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

interface BlurBackgroundImageProps {
  imageKey: string;
}

export const BlurBackgroundImage = ({ imageKey }: BlurBackgroundImageProps) => {
  const imageBlurUrl = toBlurImageUrl(imageKey);
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${imageBlurUrl})` }}
    />
  );
};

interface BaseImageProps extends Omit<ImageProps, "src"> {
  imageKey: string;
  alt: string;
}

export const BaseImage = ({ imageKey, alt, ...rest }: BaseImageProps) => {
  const imageUrl = toImageUrl(imageKey);
  return <Image src={imageUrl} alt={alt} {...rest} />;
};

interface ResponsiveImageProps extends React.HTMLAttributes<HTMLDivElement> {
  imageKey: string;
  alt: string;
  image?: React.ReactNode;
}
export const ResponsiveImage = ({
  imageKey,
  alt,
  className,
  image = (
    <BaseImage
      imageKey={imageKey}
      alt={alt}
      fill={true}
      className="h-auto w-auto object-cover"
      unoptimized
    />
  ),
  ...rest
}: ResponsiveImageProps) => {
  const loaded = useDelayedLoad(IS_PROD);

  return (
    <div className={cn("relative h-full w-full", className)} {...rest}>
      <BlurBackgroundImage imageKey={imageKey} />
      {loaded && image}
    </div>
  );
};

interface SizedImageProps extends ResponsiveImageProps {
  width: number;
  height?: number;
  aspectRatio?: "square" | "portrait";
}

export const SizedImage = ({
  imageKey,
  alt,
  width,
  height = undefined,
  aspectRatio = "portrait",
  className,
  ...rest
}: SizedImageProps) => {
  return (
    <ResponsiveImage
      imageKey={imageKey}
      alt={alt}
      className={cn(
        aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
        className,
      )}
      style={{
        width: `${width}px`,
        height: height ? `${height}px` : undefined,
      }}
      {...rest}
    />
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
