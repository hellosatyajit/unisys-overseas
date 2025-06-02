import { Media } from '@/collections/Media'
import Image from 'next/image'

interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image: {
    url: string
    alt: string
  }
  socialLinks?: {
    platform: string
    url: string
  }[]
}

interface AboutTeamProps {
  title: string
  description: string
  members: TeamMember[]
}

export function AboutTeam({ title, description, members }: AboutTeamProps) {
  if (!members || members.length === 0) return null

  return (
    <section className="w-full pt-8 pb-4 md:pt-12 lg:pt-16  bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-left sm:text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
              {title}
            </h1>
            <p className="max-w-[900px] text-muted-foreground md:text-lg">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="group relative overflow-hidden rounded-lg  bg-background p-2"
            >
              <div className=" w-full overflow-hidden rounded-md">
                {member.image?.url ? (
                  <Image
                    src={member.image.url}
                    alt={member.image.alt || `${member.name}'s photo`}
                    width={400}
                    height={400}
                    className="h-[1/2] w-full object-cover rounded-3xl"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <span className="text-muted-foreground">Image not available</span>
                  </div>
                )}
              </div>
              <div className="py-4">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground">{member.position}</p>
                <p className="mt-2 line-clamp-3 text-sm">{member.bio}</p>

                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="mt-4 flex space-x-3">
                    {member.socialLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <span className="sr-only">{link.platform}</span>
                        {/* Icon would be rendered here based on platform */}
                        {link.platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
