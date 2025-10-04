import Image from 'next/image'

export type Executive = {
  name: string
  role: string
  bio: string[]
  imageSrc: string
  email: string
}

export default function ExecutiveCard({ name, role, bio, imageSrc, email }: Executive) {
  const imageStyle = (() => {
    if (name === 'Cassie Bear') {
      return { objectPosition: 'center top' as const }
    }
    if (name === 'Justin Westhead') {
      return { objectPosition: 'center 40%' as const }
    }
    return undefined
  })()

  return (
    <article className="executive-card">
      <div className="executive-image">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          priority
          style={imageStyle}
        />
      </div>
      <div className="executive-body">
        <h3>{name}</h3>
        <p className="executive-role">{role}</p>
        <div className="executive-bio">
          {bio.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
        <a href={`mailto:${email}`} className="executive-email" aria-label={`Email ${name}`}>
          <span className="executive-email-icon" aria-hidden>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.5 2.4c0-.773.627-1.4 1.4-1.4h10.2c.773 0 1.4.627 1.4 1.4v7.2c0 .773-.627 1.4-1.4 1.4H2.9c-.773 0-1.4-.627-1.4-1.4V2.4Zm1.82-.4 4.68 3.515a.6.6 0 0 0 .72 0L13.4 2l.003.004a.4.4 0 0 1 .097.108.6.6 0 0 1 .1.347v7.141L10.1 6.114l-1.958 1.47a1.8 1.8 0 0 1-2.184 0L4 6.114 1.4 9.6V2.8a.6.6 0 0 1 .1-.347.4.4 0 0 1 .097-.108L3.32 2Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span>Send email</span>
        </a>
      </div>
    </article>
  )
}
