import { container, header } from "@/app/(main)/layout.css";
import { Button } from "@/app/components/button";
import * as buttonStyles from "@/app/components/button.css";
import PlusIcon from "@/app/icons/icon-plus.svg";
import { breakpoints } from "@/app/styles/media";
import { sprinkles } from "@/app/styles/sprinkles.css";
import Link from "next/link";
import { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <header className={header}>
        <div className={container}>
          <div
            className={sprinkles({
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "space-0200",
            })}
          >
            <Link href={"/"}>
              <picture>
                <source
                  media={breakpoints.tablet}
                  srcSet="/images/logo-large.svg"
                  width={230}
                  height={40}
                />
                <img
                  alt=""
                  src={"/images/logo-small.svg"}
                  width={40}
                  height={40}
                />
              </picture>
            </Link>
            <Button className={buttonStyles.variants.primary}>
              <PlusIcon className={buttonStyles.icon} />
              New goal
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className={container}>{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
