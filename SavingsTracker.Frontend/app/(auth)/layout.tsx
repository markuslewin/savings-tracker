import { container, layout } from "@/app/(auth)/layout.css";

const AuthLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <main className={container}>
      <div className={layout}>{children}</div>
    </main>
  );
};

export default AuthLayout;
