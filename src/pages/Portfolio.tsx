import { formatDate } from '../utils/formatDate';
import { Mail, MapPin, Calendar, ExternalLink, LinkedinIcon, MicIcon } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { SEO } from '../components/SEO';
export function Portfolio() {
  // Always use default user ID '1' since we no longer have authentication
  const userId = '1';
  const {
    profile,
    isLoading,
    error
  } = useProfile(userId);
  if (isLoading) {
    return <div className="max-w-7xl mx-auto text-center py-10" role="status" aria-live="polite">
        <p className="text-gray-500">Loading profile information...</p>
      </div>;
  }
  if (error) {
    return <div className="max-w-7xl mx-auto py-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert" aria-live="assertive">
          <p>{error}</p>
        </div>
      </div>;
  }
  if (!profile) {
    return <div className="max-w-7xl mx-auto text-center py-10" role="status" aria-live="polite">
        <p className="text-gray-500">Profile information not available.</p>
      </div>;
  }
  const {
    skills,
    workExperience,
    projects,
    certificates
  } = profile;
  const programmingLanguages = skills.filter(skill => skill.category === 'language');
  const frameworksAndtoolss = skills.filter(skill => skill.category === 'framework' || skill.category === 'tools');
  
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://viktorvansteenweghen.com/#viktor",
        "name": profile.name,
        "jobTitle": profile.title,
        "email": profile.email,
        "url": "https://viktorvansteenweghen.com/",
        "image": {
          "@type": "ImageObject",
          "url": profile.avatar
        },
        "description": profile.about,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": profile.location
        },
        "sameAs": [
          "https://www.linkedin.com/in/viktorvansteenweghen/"
        ],
        "alumniOf": certificates.map(cert => ({
          "@type": "EducationalOrganization",
          "name": cert.issuer
        })),
        "knowsAbout": skills.map(skill => skill.name)
      },
      {
        "@type": "WebSite",
        "@id": "https://viktorvansteenweghen.com/#website",
        "url": "https://viktorvansteenweghen.com/",
        "name": "Viktor Van Steenweghen",
        "description": "Portfolio and blog of Viktor Van Steenweghen, Full Stack Developer",
        "publisher": {
          "@id": "https://viktorvansteenweghen.com/#viktor"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "WebPage",
        "@id": "https://viktorvansteenweghen.com/#webpage",
        "url": "https://viktorvansteenweghen.com/",
        "name": "Portfolio",
        "isPartOf": {
          "@id": "https://viktorvansteenweghen.com/#website"
        },
        "about": {
          "@id": "https://viktorvansteenweghen.com/#viktor"
        },
        "mainEntity": {
          "@id": "https://viktorvansteenweghen.com/#viktor"
        },
        "inLanguage": "en-US"
      }
    ]
  };
  
  return (
    <>
      <SEO
        title="Portfolio"
        description={`${profile.title} - ${profile.about}`}
        canonicalUrl="https://viktorvansteenweghen.com/"
        ogType="profile"
        structuredData={structuredData}
        ogImage={profile.avatar}
      />
      <div className="max-w-7xl mx-auto">
      {/* Header/Personal Info Section */}
      <section aria-labelledby="personal-info-heading" className="section-card mb-16">
        <h2 id="personal-info-heading" className="text-2xl font-bold mb-4 sr-only">
          Personal Information
        </h2>
        <div className="flex flex-col md:flex-row md:gap-10 relative z-10">
          <div className="flex justify-center md:justify-start shrink-0">
            <div className="relative group">
              <div className="relative w-44 h-44 rounded-full overflow-hidden mb-6 md:mb-0 ring-2 ring-border/50 shadow-elevated">
                <img src={profile.avatar} alt={`${profile.name}`} width={384} height={384} fetchPriority="high" className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient-subtle tracking-tight">
              {profile.name}
            </h1>
            <p className="text-lg text-primary font-medium mb-6">{profile.title}</p>
            <dl className="flex flex-col space-y-3 mb-6">
              <div className="flex items-center text-muted-foreground">
                <dt className="sr-only">Date of Birth</dt>
                <Calendar className="h-4 w-4 mr-3 text-primary/70" aria-hidden="true" />
                <dd className="text-sm">{profile.birthDate ? formatDate(new Date(profile.birthDate)) : ''}</dd>
              </div>
              <div className="flex items-center text-muted-foreground">
                <dt className="sr-only">Email</dt>
                <Mail className="h-4 w-4 mr-3 text-primary/70" aria-hidden="true" />
                <dd className="text-sm">{profile.email}</dd>
              </div>
              <div className="flex items-center text-muted-foreground">
                <dt className="sr-only">Location</dt>
                <MapPin className="h-4 w-4 mr-3 text-primary/70" aria-hidden="true" />
                <dd className="text-sm">{profile.location}</dd>
              </div>
              <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200">
                <dt className="sr-only">LinkedIn</dt>
                <LinkedinIcon className="h-4 w-4 mr-3 text-primary/70" aria-hidden="true" />
                <dd>
                  <a href="https://www.linkedin.com/in/viktorvansteenweghen/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm">
                    LinkedIn Profile
                  </a>
                </dd>
              </div>
              <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200">
                <dt className="sr-only">Podcast</dt>
                <MicIcon className="h-4 w-4 mr-3 text-primary/70" aria-hidden="true" />
                <dd>
                  <a href="https://jcast.dev/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm">
                    JCast Podcast
                  </a>
                </dd>
              </div>
            </dl>
            <div className="border-t border-border/50 pt-5 mt-5">
              <h2 className="text-lg font-semibold text-foreground mb-3 tracking-tight">
                About Me
              </h2>
              <p className="text-muted-foreground leading-relaxed">{profile.about}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Employment Section */}
      <section aria-labelledby="employment-heading" className="section-card mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 id="employment-heading" className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Employment History
          </h2>
          <div className="accent-line" />
        </div>
        <div className="space-y-8">
          {workExperience.map((job, index) => <article key={job.id} className="relative pl-6 border-l-2 border-primary/20 hover:border-primary/50 transition-colors duration-300">
              <div className="absolute left-0 top-1 w-3 h-3 -translate-x-[7px] rounded-full bg-primary/80 ring-4 ring-background" />
              <header className="mb-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-4 mb-2">
                  <h3 className="text-lg font-semibold text-foreground tracking-tight">
                    {job.title}
                  </h3>
                  <span className="text-sm text-muted-foreground font-medium">
                    <time dateTime={new Date(job.startDate).toISOString().split('T')[0]}>
                      {formatDate(new Date(job.startDate))}
                    </time>
                    {' - '}
                    {job.endDate ? <time dateTime={new Date(job.endDate).toISOString().split('T')[0]}>
                      {formatDate(new Date(job.endDate))}
                    </time> : <span className="text-primary font-semibold">Present</span>}
                  </span>
                </div>
                {job.companyUrl ? (
                  <a href={job.companyUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 inline-flex items-center gap-1">
                    {job.company}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <h4 className="text-primary font-medium">{job.company}</h4>
                )}
              </header>
              <p className="text-muted-foreground text-sm leading-relaxed">{job.description}</p>
            </article>)}
        </div>
      </section>

      {/* Skills Section */}
      <section aria-labelledby="skills-heading" className="section-card mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 id="skills-heading" className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Technical Skills
          </h2>
          <div className="accent-line" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="text-base font-semibold text-foreground mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Programming Languages
            </h3>
            <div className="space-y-5">
              {programmingLanguages.map(skill => <div key={skill.name} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground" id={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {skill.name}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">{skill.level}%</span>
                  </div>
                  <div className="skill-bar" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-labelledby={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="skill-bar-fill" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>)}
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Frameworks and Tools
            </h3>
            <div className="space-y-5">
              {frameworksAndtoolss.map(skill => <div key={skill.name} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground" id={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {skill.name}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">{skill.level}%</span>
                  </div>
                  <div className="skill-bar" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-labelledby={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="skill-bar-fill-alt" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section aria-labelledby="projects-heading" className="section-card mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 id="projects-heading" className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Notable Projects
          </h2>
          <div className="accent-line" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => <article key={project.id} className="group bg-background/50 rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-300">
              <div className="h-44 bg-muted overflow-hidden">
                {project.image && <img src={project.image} alt={`Screenshot of ${project.title} project`} width={640} height={384} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4" aria-label="Technologies used">
                  {project.technologies.map(tech => <span key={tech} className="tag text-[10px]">
                      {tech}
                    </span>)}
                </div>
                {project.url && <a href={project.url} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm group/link" aria-label={`View ${project.title} project (opens in a new window)`} target="_blank" rel="noopener noreferrer">
                    <span>View Project</span>
                    <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
                  </a>}
              </div>
            </article>)}
        </div>
      </section>

      {/* Certificates Section */}
      <section aria-labelledby="certificates-heading" className="section-card mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 id="certificates-heading" className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Certificates
          </h2>
          <div className="accent-line" />
        </div>
        <dl className="space-y-5">
          {certificates.map((cert, index) => <div key={cert.id} className="flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-background/50 border border-border/30 hover:border-primary/30 hover:bg-background/80 transition-all duration-200">
              <dt className="md:w-1/5 shrink-0">
                {cert.date && !isNaN(Date.parse(cert.date)) ? (
                  <time dateTime={new Date(cert.date).toISOString().split('T')[0]} className="text-sm font-medium text-primary">
                    {formatDate(new Date(cert.date))}
                  </time>
                ) : (
                  <span className="text-sm text-muted-foreground">No date</span>
                )}
              </dt>
              <dd className="md:w-4/5">
                <h3 className="text-base font-semibold text-foreground mb-1 tracking-tight">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </dd>
            </div>)}
        </dl>
      </section>
    </div>
    </>
  );
}