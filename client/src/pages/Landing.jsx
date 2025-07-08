import React from 'react'
import LandingNav from '@/components/Landing/LandingNav'
import LandingHero from '@/components/Landing/LandingHero'
import LandingFeatures from '@/components/Landing/LandingFeatures'
import LandingCTA from '@/components/Landing/LandingCTA'
import LandingFooter from '@/components/Landing/LandingFooter'
import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router'

function Landing() {
  const { isSignedIn, isLoaded, user } = useUser();

  if(isLoaded && isSignedIn){
    if(user.publicMetadata.onboardingComplete){
      return <Navigate to="/dashboard" />
    }else{
      return <Navigate to="/onboarding" />
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-teal-50">
      <LandingNav />
      <div className='flex flex-col gap-12'>
        <LandingHero />
        <LandingFeatures/>
        <LandingCTA />
      </div>
      <LandingFooter />
    </div>
  )
}

export default Landing