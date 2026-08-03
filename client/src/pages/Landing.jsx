import React from 'react'
import LandingNav from '@/components/Landing/LandingNav'
import LandingHero from '@/components/Landing/LandingHero'
import LandingFeatures from '@/components/Landing/LandingFeatures'
import LandingHowItWorks from '@/components/Landing/LandingHowItWorks'
import LandingPricing from '@/components/Landing/LandingPricing'
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
    <div className="min-h-screen bg-gray-50">
      <LandingNav />
      <LandingHero />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingPricing />
      <LandingFooter />
    </div>
  )
}

export default Landing