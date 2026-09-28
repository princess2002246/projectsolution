import { useState } from "react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collections: string[];
  setCollections: React.Dispatch<
    React.SetStateAction<string[]>
  >;
}

function Sidebar({
  activeSection,
  onSectionChange,
  collections,
  setCollections,
}: SidebarProps) {
  const [showCollectionForm, setShowCollectionForm] =
    useState(false);

  const [collectionName, setCollectionName] =
    useState("");

  const [collectionError, setCollectionError] =
    useState("");

  const handleCreateCollection = () => {
    const trimmedName = collectionName.trim();

    if (trimmedName === "") {
      setCollectionError(
        "Please enter a collection name."
      );
      return;
    }

    const collectionExists = collections.some(
      (collection) =>
        collection.toLowerCase() ===
        trimmedName.toLowerCase()
    );

    if (collectionExists) {
      setCollectionError(
        "A collection with this name already exists."
      );
      return;
    }

    setCollections((currentCollections) => [
      ...currentCollections,
      trimmedName,
    ]);

    setCollectionName("");
    setCollectionError("");
    setShowCollectionForm(false);

    onSectionChange(trimmedName);
  };

  const handleCancelCollection = () => {
    setCollectionName("");
    setCollectionError("");
    setShowCollectionForm(false);
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-section">

        <p className="sidebar-title">
          Collections
        </p>

        <button
          className={
            activeSection === "all"
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() =>
            onSectionChange("all")
          }
        >
          <span className="sidebar-icon">
            ◉
          </span>

          <span>All Bookmarks</span>
        </button>

        <button
          className={
            activeSection === "unsorted"
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() =>
            onSectionChange("unsorted")
          }
        >
          <span className="sidebar-icon">
            ▱
          </span>

          <span>Unsorted</span>
        </button>

        {collections.map((collection) => (
          <button
            key={collection}
            className={
              activeSection === collection
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              onSectionChange(collection)
            }
          >
            <span className="sidebar-icon">
              ▰
            </span>

            <span>{collection}</span>
          </button>
        ))}

        {!showCollectionForm && (
          <button
            className="sidebar-item"
            onClick={() =>
              setShowCollectionForm(true)
            }
          >
            <span className="sidebar-icon">
              +
            </span>

            <span>New Collection</span>
          </button>
        )}

        {showCollectionForm && (
          <div className="new-collection-form">

            <input
              type="text"
              value={collectionName}
              onChange={(event) => {
                setCollectionName(
                  event.target.value
                );
                setCollectionError("");
              }}
              placeholder="Collection name"
              autoFocus
            />

            {collectionError && (
              <p className="collection-error">
                {collectionError}
              </p>
            )}

            <div className="collection-actions">

              <button
                type="button"
                onClick={
                  handleCreateCollection
                }
              >
                Create
              </button>

              <button
                type="button"
                onClick={
                  handleCancelCollection
                }
              >
                Cancel 
              </button>

            </div>

          </div>
        )}

      </div>

      <div className="sidebar-section">

        <p className="sidebar-title">
          Filters
        </p>

        <button
          className={
            activeSection === "tags"
              ? "sidebar-item active"
              : "sidebar-item"
          }
          onClick={() =>
            onSectionChange("tags")
          }
        >
          <span className="sidebar-icon">
            #
          </span>

          <span>Tags</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;