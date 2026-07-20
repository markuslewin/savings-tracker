import { Link } from "@/app/components/navigation";
import { breakpoints } from "@/app/styles/media";
import Image from "next/image";
import { ReactNode } from "react";

type LogoLinkProps = {
  logo?: LogoRenderProp;
};

type LogoRenderProp = (props: { alt: string }) => ReactNode;

// todo: hcm
export const LogoLink = ({ logo = narrow }: LogoLinkProps) => {
  return <Link href={"/"}>{logo({ alt: "Savings Tracker" })}</Link>;
};

export const full: LogoRenderProp = ({ alt }) => {
  return (
    <Image alt={alt} src="/images/logo-large.svg" width={230} height={40} />
  );
};

export const narrow: LogoRenderProp = ({ alt }) => {
  return (
    <picture>
      <source
        media={breakpoints.tablet}
        srcSet="/images/logo-large.svg"
        width={230}
        height={40}
      />
      <img alt={alt} src={"/images/logo-small.svg"} width={40} height={40} />
    </picture>
  );
};
