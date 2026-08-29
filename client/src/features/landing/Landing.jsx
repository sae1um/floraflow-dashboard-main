import React from 'react'
import LandingNav from '@/features/landing/LandingNav'
import LandingHero from '@/features/landing/LandingHero'
import LandingFeatures from '@/features/landing/LandingFeatures'
import LandingHowItWorks from '@/features/landing/LandingHowItWorks'
import LandingPricing from '@/features/landing/LandingPricing'
import LandingFooter from '@/features/landing/LandingFooter'
import { useUser } from '@clerk/clerk-react'
import { Navigate, useLocation,  } from 'react-router'

function Landing() {
  const { isSignedIn, isLoaded, user } = useUser();
  const path = useLocation()["pathname"]

  if(isLoaded && isSignedIn){
    if(path == "/landing"){
      return <LandingPage />
    }
    else if(user.publicMetadata.onboardingComplete){
      return <Navigate to="/dashboard" />
    }else{
      return <Navigate to="/onboarding" />
    }
  }

  return(
    <LandingPage />
  )
}

function LandingPage(){
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