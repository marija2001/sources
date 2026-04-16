import "./Residencies.css";
import HomeProjectCard from "../HomeProjectCard/HomeProjectCard";
import useProjects from "../../hooks/useProjects";
import { PuffLoader } from "react-spinners";
import { Link } from "react-router-dom";

function splitForMarquee(list) {
  if (!list.length) return [[], []];
  const mid = Math.ceil(list.length / 2);
  const left = list.slice(0, mid);
  let right = list.slice(mid);
  if (right.length === 0) right = [...left];
  return [left, right];
}

const Residencies = () => {
  const { data, isError, isLoading } = useProjects();
  const items = (data ?? []).slice(0, 12);
  const [leftCol, rightCol] = splitForMarquee(items);

  const n = Math.max(leftCol.length, rightCol.length, 1);
  const marqueeDuration = Math.max(30, n * 6);

  if (isError) {
    return (
      <section
        className="home-projects-band home-projects-band--hero-bg"
        id="residencies"
      >
        <div className="home-projects-band-body paddings innerWidth">
          <span>Error while fetching data</span>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="home-projects-band" id="residencies">
        <div
          className="home-projects-band-body flexCenter paddings innerWidth"
          style={{ minHeight: "50vh" }}
        >
          <PuffLoader
            height="80"
            width="80"
            radius={1}
            color="#4066ff"
            aria-label="puff-loading"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      className="home-projects-band home-projects-band--hero-bg"
      id="residencies"
    >
      <div className="home-projects-band-body paddings innerWidth">
        <div className="home-projects-newsroom">
          <aside className="home-projects-newsroom__aside">
            <p className="home-projects-newsroom__eyebrow">Projects</p>
            <h2 className="home-projects-newsroom__heading">Sources newsroom</h2>
            <p className="home-projects-newsroom__lede">
              Catch up on the latest builds, integrations, and milestones from
              our engineering team.
            </p>
            <Link className="home-projects-newsroom__link" to="/projects">
              View all projects
            </Link>
          </aside>

          <div className="home-projects-marquee">
            <div
              className="home-projects-marquee__col home-projects-marquee__col--up"
              style={{ ["--marquee-duration"]: `${marqueeDuration}s` }}
            >
              <div className="home-projects-marquee__track home-projects-marquee__track--up">
                {leftCol.map((card, i) => (
                  <div
                    key={`lu-${card?.id ?? i}-${i}`}
                    className="home-projects-marquee__cell"
                  >
                    <HomeProjectCard card={card} />
                  </div>
                ))}
                {leftCol.map((card, i) => (
                  <div
                    key={`lu2-${card?.id ?? i}-${i}`}
                    className="home-projects-marquee__cell"
                  >
                    <HomeProjectCard card={card} />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="home-projects-marquee__col home-projects-marquee__col--down"
              style={{ ["--marquee-duration"]: `${marqueeDuration}s` }}
            >
              <div className="home-projects-marquee__track home-projects-marquee__track--down">
                {rightCol.map((card, i) => (
                  <div
                    key={`rd-${card?.id ?? i}-${i}`}
                    className="home-projects-marquee__cell"
                  >
                    <HomeProjectCard card={card} />
                  </div>
                ))}
                {rightCol.map((card, i) => (
                  <div
                    key={`rd2-${card?.id ?? i}-${i}`}
                    className="home-projects-marquee__cell"
                  >
                    <HomeProjectCard card={card} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Residencies;
