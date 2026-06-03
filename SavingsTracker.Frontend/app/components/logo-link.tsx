import { breakpoints } from "@/app/styles/media";
import Link from "next/link";
import { ReactNode } from "react";
import Image from "next/image";

const alt = "Savings Tracker";

type LogoLinkProps = {
  logo?: () => ReactNode;
};

// todo: hcm
export const LogoLink = ({ logo = narrow }: LogoLinkProps) => {
  return <Link href={"/"}>{logo()}</Link>;
};

export const full = () => {
  return (
    <Image alt={alt} src="/images/logo-large.svg" width={230} height={40} />
  );
};

export const narrow = () => {
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
