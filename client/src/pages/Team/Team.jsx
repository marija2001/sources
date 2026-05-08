import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import "../../styles/pageHero.css";
import "./Team.css";
import useTeamMembers from "../../hooks/useTeamMembers";

function normalizeBio(bio) {
  if (Array.isArray(bio)) return bio.filter(Boolean);
  return [];
}

function Team() {
  const { data, isLoading, isError } = useTeamMembers();
  const members = Array.isArray(data) ? data : [];

  return (
    <main className="team-page">
      <section className="page-hero">
        <div className="page-hero__inner paddings innerWidth">
          <p className="page-hero__eyebrow">Team</p>
          <h1 className="page-hero__title">Meet everyone</h1>
          <p className="page-hero__lede">
            Engineers behind Sources — bios load from the database; edit content in Mongo when it goes live.
          </p>
        </div>
      </section>

      <div className="team-page__body paddings innerWidth">
        {isLoading ? (
          <div className="team-page__loading flexCenter">
            <PuffLoader color="#4066ff" size={64} aria-label="Loading team" />
          </div>
        ) : isError ? (
          <p className="team-page__notice secondaryText" role="alert">
            Team profiles could not be loaded. Try again later.
          </p>
        ) : members.length === 0 ? (
          <p className="team-page__notice secondaryText">No team members yet.</p>
        ) : (
          members.map((member) => {
            const id = member.id ?? member._id ?? member.name;
            const paragraphs = normalizeBio(member.bio);
            return (
              <article key={id} className="team-page__member">
                <figure className="team-page__figure">
                  <img
                    className="team-page__photo"
                    src={member.photo}
                    alt={`${member.name} — portrait`}
                    width={560}
                    height={700}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <div className="team-page__bio">
                  <h2 className="team-page__name">{member.name}</h2>
                  <p className="team-page__role">{member.role}</p>
                  <div className="team-page__text">
                    {paragraphs.map((p, i) => (
                      <p key={`${id}-${i}`}>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      <div className="team-page__back-wrap paddings innerWidth">
        <Link className="team-page__back" to="/">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}

export default Team;
