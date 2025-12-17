import { ComponentProps, FC } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<typeof Image> & {
   src: string;
   alt: string;
};

const CurrencyLogo: FC<Props> = ({ src, alt, className, ...props }) => {
   if (!src) return null;

   return (
      <Image
         src={src}
         alt={alt}
         width={20}
         height={20}
         className={twMerge("rounded-full object-cover", className)}
         crossOrigin="anonymous"
         unoptimized
         {...props}
      />
   );
};

export default CurrencyLogo;
