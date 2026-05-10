interface LightBulbProps {
  isOn: boolean
  onClick: () => void
}

export function LightBulb({ isOn, onClick }: LightBulbProps) {
  return (
    <button
      onClick={onClick}
      className="transition-all duration-300 hover:opacity-80 flex items-center justify-center"
      aria-label="Переключить тему"
      title={isOn ? 'Светлая тема' : 'Темная тема'}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-300"
      >
        {/* Круглая лампочка */}
        <circle
          cx="12"
          cy="10"
          r="6"
          fill={isOn ? '#FCD34D' : 'none'}
          stroke={isOn ? '#FBBF24' : '#FFFFFF'}
          strokeWidth="1.5"
        />

        {/* Цоколь */}
        <rect
          x="10"
          y="16"
          width="4"
          height="2"
          rx="0.5"
          fill={isOn ? '#FBBF24' : '#FFFFFF'}
          stroke={isOn ? '#FBBF24' : '#FFFFFF'}
          strokeWidth="1"
        />

        {/* Резьба цоколя */}
        <line
          x1="9.5"
          y1="18"
          x2="14.5"
          y2="18"
          stroke={isOn ? '#FBBF24' : '#FFFFFF'}
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Контакт */}
        <circle
          cx="12"
          cy="20"
          r="0.8"
          fill={isOn ? '#FBBF24' : '#FFFFFF'}
        />

        {/* Свечение, когда включена */}
        {isOn && (
          <>
            <circle
              cx="12"
              cy="10"
              r="7.5"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="0.3"
              opacity="0.4"
              className="animate-pulse"
            />
            <circle
              cx="12"
              cy="10"
              r="9"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="0.2"
              opacity="0.2"
              className="animate-pulse"
              style={{ animationDelay: '0.1s' }}
            />
          </>
        )}
      </svg>
    </button>
  )
}
