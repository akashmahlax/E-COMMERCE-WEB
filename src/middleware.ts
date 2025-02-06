import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])



export default clerkMiddleware(async (auth, req) => {
  interface SessionClaims {
    metadata?: {
      role?: string;
    };
  }
  
  
  // Only protect admin routes based on role
  // go to clerk dashboard , then click on configure then in session metadata add the following code 
  // {
 // "metadata": "{{user.public_metadata}}"
//   }

// then this code will work

//func to check if the user is admin or not
  if (isAdminRoute(req) && ((await auth()).sessionClaims as SessionClaims)?.metadata?.role !== 'admin') {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}