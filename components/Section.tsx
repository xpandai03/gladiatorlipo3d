interface SectionProps {
  children: React.ReactNode
  id?: string
  className?: string
  ariaLabel?: string
}

export default function Section({ 
  children, 
  id, 
  className = '', 
  ariaLabel 
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full ${className}`}
      aria-label={ariaLabel || id}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}