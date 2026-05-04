import { container, header } from "@/app/(main)/layout.css";
import * as Button from "@/app/components/button";
import Link from "next/link";
import { ReactNode } from "react";
import PlusIcon from "@/app/icons/icon-plus.svg";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { breakpoints } from "@/app/styles/media";

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
            <Button.Root>
              <Button.Icon icon={PlusIcon} />
              New goal
            </Button.Root>
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
