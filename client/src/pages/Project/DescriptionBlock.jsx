import {
  parseHeadingBlock,
  parseHeadingSection,
  renderInline,
} from "../../utils/projectDescription";

function InlineText({ text }) {
  return renderInline(text).map((part) =>
    part.type === "strong" ? (
      <strong key={part.key}>{part.text}</strong>
    ) : (
      <span key={part.key}>{part.text}</span>
    )
  );
}

function DescriptionBlock({ block }) {
  const heading = parseHeadingBlock(block);

  if (heading) {
    const { title, items, body } = parseHeadingSection(heading.rest);
    const HeadingTag = heading.level === 2 ? "h2" : "h3";
    const headingClass =
      heading.level === 2
        ? "project-page__subheading primaryText"
        : "project-page__minor-heading primaryText";

    return (
      <div className="project-page__section">
        <HeadingTag className={headingClass}>
          <InlineText text={title} />
        </HeadingTag>
        {items.length > 0 ? (
          <ul className="project-page__list secondaryText">
            {items.map((item) => (
              <li key={item}>
                <InlineText text={item} />
              </li>
            ))}
          </ul>
        ) : null}
        {body ? (
          <p className="project-page__prose secondaryText">
            <InlineText text={body} />
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <p className="project-page__prose secondaryText">
      <InlineText text={block} />
    </p>
  );
}

export default DescriptionBlock;
