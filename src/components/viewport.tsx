export const Viewport = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="viewport w-full flex flex-col items-center overflow-y-auto overflow-x-hidden">
      <div className={"craftjs-renderer flex-1 h-full w-full max-w-[600px]"}>
        {children}
      </div>
    </div>
  );
};
