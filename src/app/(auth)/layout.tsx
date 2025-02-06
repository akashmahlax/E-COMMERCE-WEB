import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from '@clerk/themes'

export default function Layout({ children } : { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{
        baseTheme: neobrutalism,
      }} >
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
        <div className="container mx-auto flex h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
      {children}  {/* Renders <SignIn /> or <SignUp /> */}
      </div>
     </div>
     </div>
    </ClerkProvider>
  );
}