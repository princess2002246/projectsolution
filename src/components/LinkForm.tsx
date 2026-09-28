import { useState } from "react";
import type { SavedLink } from "../types/Link";

interface LinkFormProps {
  onSave: (link: SavedLink) => void;
  onCancel: () => void;
  editingLink?: SavedLink | null;
  collections: string[];
  activeCollection: string;
}

function LinkForm({
  onSave,
  onCancel,
  editingLink,
  collections,
  activeCollection,
}: LinkFormProps) {
  const [title, setTitle] = useState(
    editingLink?.title ?? ""
  );

  const [url, setUrl] = useState(
    editingLink?.url ?? ""
  );

  const [description, setDescription] =
    useState(
      editingLink?.description ?? ""
    );

  const [tags, setTags] = useState(
    editingLink?.tags.join(", ") ?? ""
  );

  const [collection, setCollection] =
    useState(
      editingLink?.collection ??
        activeCollection ??
        ""
    );

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const updatedLink: SavedLink = {
      id: editingLink?.id ?? Date.now(),

      title: title.trim(),

      url: url.trim(),

      description: description.trim(),

      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),

      collection:
        collection.trim() === ""
          ? undefined
          : collection,
    };

    onSave(updatedLink);
  };

  return (
    <div className="form-overlay">

      <form
        className="link-form"
        onSubmit={handleSubmit}
      >

        <div className="form-header">

          <div>

            <p className="form-label">
              {editingLink
                ? "EDIT RESOURCE"
                : "NEW RESOURCE"}
            </p>

            <h2>
              {editingLink
                ? "Edit Link"
                : "Add a Link"}
            </h2>

          </div>

          <button
            type="button"
            className="close-button"
            onClick={onCancel}
          >
            ×
          </button>

        </div>

        <label>
          Title

          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="e.g. React Documentation"
            required
          />
        </label>

        <label>
          Link URL

          <input
            type="url"
            value={url}
            onChange={(event) =>
              setUrl(event.target.value)
            }
            placeholder="https://example.com"
            required
          />
        </label>

        <label>
          Description

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(
                event.target.value
              )
            }
            placeholder="What is this link about?"
            rows={4}
            required
          />
        </label>

        <label>
          Tags

          <span className="optional">
            (optional)
          </span>

          <input
            type="text"
            value={tags}
            onChange={(event) =>
              setTags(event.target.value)
            }
            placeholder="react, coding, tutorial"
          />

          <small>
            Separate multiple tags with commas.
          </small>
        </label>

        <label>
          Collection

          <select
            value={collection}
            onChange={(event) =>
              setCollection(
                event.target.value
              )
            }
          >

            <option value="">
              Unsorted
            </option>

            {collections.map(
              (collectionName) => (
                <option
                  key={collectionName}
                  value={collectionName}
                >
                  {collectionName}
                </option>
              )
            )}

          </select>

        </label>

        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-button"
          >
            {editingLink
              ? "Update Link"
              : "Save Link"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default LinkForm;