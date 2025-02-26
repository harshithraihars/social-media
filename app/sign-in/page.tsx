import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 z-50">
      <SignIn afterSignInUrl="/" appearance={{ layout: { socialButtonsVariant: "blockButton" } }} />
    </div>
  );  
}

