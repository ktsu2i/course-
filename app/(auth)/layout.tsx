const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="pr-56 h-full flex items-center justify-center">
      {children}
    </div>
  );
};
 
export default AuthLayout;