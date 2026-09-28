import type { SavedLink } from "../types/Link";

interface LinkCardProps {
  link: SavedLink;
  onEdit: (link: SavedLink) => void;
  onDelete: (id: number) => void;
}

function LinkCard({
  link,
  onEdit,
  onDelete,
}: LinkCardProps) {
  return (
    <article className="link-card">

      <div className="link-card-header">

        <div className="link-icon">
          🔗
        </div>

        <div className="card-buttons">

          <button
            type="button"
            className="edit-button"
            onClick={() => onEdit(link)}
          >
            Edit
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(link.id)}
          >
            Delete
          </button>

        </div>

      </div>

      <div className="link-card-content">

        <h3>{link.title}</h3>

        <p className="link-description">
          {link.description}
        </p>

        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-url"
        >
          {link.url}
        </a>

        {link.tags.length > 0 && (
          <div className="link-tags">

            {link.tags.map((tag) => (
              <span
                className="tag"
                key={tag}
              >
                #{tag}
              </span>
            ))}

          </div>
        )}

        {link.collection && (
          <div className="link-collection">
            {link.collection}
          </div>
        )}

      </div>

    </article>
  );
}

export default LinkCard;