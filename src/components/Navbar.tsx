import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/pantry', label: 'Pantry Helper' },
  { to: '/profile', label: 'Profile' },
]

export function Navbar() {
  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mt-2 font-serif text-4xl tracking-[0.02em] text-slate-900 sm:text-5xl">
              Ahara
            </h1>
            <p className="mt-3 max-w-2xl font-serif text-base italic tracking-[0.01em] text-emerald-800">
              Nourishment that feels personal.
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  'rounded-full border px-4 py-2 text-sm font-medium transition',
                  isActive
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
