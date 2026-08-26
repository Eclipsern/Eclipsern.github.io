import { profile } from '../data/profile'

export function ProfilePanel() {
  return (
    <section className="profile-panel" id="about" aria-labelledby="profile-name">
      <div className="portrait-frame">
        <img
          className="portrait"
          src={profile.avatar}
          alt={profile.avatarAlt}
          width="640"
          height="640"
        />
      </div>

      <div className="profile-copy">
        <p className="eyebrow">About / 01</p>
        <h1 id="profile-name">{profile.name}</h1>
        <p className="profile-bio">{profile.bio}</p>
        <p className="profile-intro">
          A growing record of work, ideas, and milestones.
        </p>
        <div className="profile-contact">
          <span>Email</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </div>
    </section>
  )
}

