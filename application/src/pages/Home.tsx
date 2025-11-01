import React from 'react'
import HeroBlock from '../components/HeroBlock'

export default function Home() {
  return (
    <div>
      <HeroBlock title="Welcome" subtitle="A Vite + React mock for Sanity" />
      <div className="container mx-auto py-8">Home page content</div>
    </div>
  )
}
