import { ArrowUpRight } from 'lucide-react'

type LiveProjectButtonProps = {
  label?: string
  href?: string
  disabled?: boolean
  className?: string
}

const BASE =
  'inline-flex items-center gap-2 rounded-full border px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-200'

export default function LiveProjectButton({
  label = 'Live Project',
  href,
  disabled = false,
  className = '',
}: LiveProjectButtonProps) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`${BASE} cursor-not-allowed border-[#D7E2EA]/20 text-[#D7E2EA]/35 ${className}`}
      >
        {label}
      </span>
    )
  }

  return (
    <a
      href={href ?? '#'}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className={`${BASE} group border-[#D7E2EA]/70 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 ${className}`}
    >
      {label}
      <ArrowUpRight
        size={16}
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  )
}
