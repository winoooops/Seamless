import { ComponentProps, FC } from "react";
import Image from "next/image";

type Props = ComponentProps<typeof Image> & {
   src: string;
   alt: string;
};

const CurrencyLogo: FC<Props> = ({ src, alt, onError }) => {
   if (!src) return null;

   return (
      <Image
         src={src}
         alt={alt}
         width={20}
         height={20}
         className="rounded-full"
         onError={onError}
         crossOrigin="anonymous"
         unoptimized
      />
   );
};

export default CurrencyLogo;
