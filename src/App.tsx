import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import LinkForm from "./components/LinkForm";
import LinkCard from "./components/LinkCard";
import SearchBar from "./components/SearchBar";

import type { SavedLink } from "./types/Link";

function App() {
  const [activeSection, setActiveSection] =
    useState("all");

  const [showForm, setShowForm] =
    useState(false);

  const [editingLink, setEditingLink] =
    useState<SavedLink | null>(null);

  // Load saved links from LocalStorage
  const [links, setLinks] = useState<SavedLink[]>(() => {
    const savedLinks =
      localStorage.getItem("saved-links");

    if (savedLinks) {
      return JSON.parse(savedLinks);
    }

    return [];
  });

  // Save links whenever they change
  useEffect(() => {
    localStorage.setItem(
      "saved-links",
      JSON.stringify(links)
    );
  }, [links]);

  // Load collections from LocalStorage
  const [collections, setCollections] =
    useState<string[]>(() => {
      const savedCollections =
        localStorage.getItem("collections");

      if (savedCollections) {
        return JSON.parse(savedCollections);
      }

      return [];
    });

  // Save collections whenever they change
  useEffect(() => {
    localStorage.setItem(
      "collections",
      JSON.stringify(collections)
    );
  }, [collections]);

  const [searchTerm, setSearchTerm] =
    useState("");

  // Find the currently selected collection
  const activeCollection =
    collections.find(
      (collection) =>
        collection === activeSection
    );

  // Open the form for adding a new link
  const handleAdd = () => {
    setEditingLink(null);
    setShowForm(true);
  };

  // Open the form for editing an existing link
  const handleEdit = (link: SavedLink) => {
    setEditingLink(link);
    setShowForm(true);
  };

  // Save a new link or update an existing link
  const handleSave = (savedLink: SavedLink) => {

    const isEditing = links.some(
      (link) => link.id === savedLink.id
    );

    const confirmed = window.confirm(
      isEditing
        ? "Are you sure you want to save these changes?"
        : "Are you sure you want to save this bookmark?"
    );

    // Stop if the user clicks Cancel
    if (!confirmed) {
      return;
    }

    setLinks((currentLinks) => {
      const existingLink = currentLinks.find(
        (link) => link.id === savedLink.id
      );

      // UPDATE existing bookmark
      if (existingLink) {
        return currentLinks.map((link) =>
          link.id === savedLink.id
            ? {
                ...link,
                ...savedLink,
              }
            : link
        );
      }

      // CREATE new bookmark
      return [...currentLinks, savedLink];
    });

    setShowForm(false);
    setEditingLink(null);
  };

  // Close the form
  const handleCancel = () => {
    setShowForm(false);
    setEditingLink(null);
  };

  // DELETE bookmark
  const handleDelete = (id: number) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this bookmark?"
    );

    // Stop if the user clicks Cancel
    if (!confirmed) {
      return;
    }

    setLinks((currentLinks) =>
      currentLinks.filter(
        (link) => link.id !== id
      )
    );

    // If the deleted bookmark was being edited,
    // close the form as well.
    if (editingLink?.id === id) {
      setEditingLink(null);
      setShowForm(false);
    }
  };

  // Search and collection filtering
  const filteredLinks = links.filter((link) => {
    const search = searchTerm
      .toLowerCase()
      .trim();

    const matchesSearch =
      link.title
        .toLowerCase()
        .includes(search) ||
      link.url
        .toLowerCase()
        .includes(search) ||
      link.description
        .toLowerCase()
        .includes(search) ||
      link.tags.some((tag) =>
        tag
          .toLowerCase()
          .includes(search)
      );

    let matchesSection = true;

    // All bookmarks
    if (activeSection === "all") {
      matchesSection = true;
    }

    // Unsorted bookmarks
    else if (activeSection === "unsorted") {
      matchesSection =
        !link.collection ||
        link.collection === "General";
    }

    // Bookmarks with tags
    else if (activeSection === "tags") {
      matchesSection =
        link.tags.length > 0;
    }

    // Specific user-created collection
    else {
      matchesSection =
        link.collection === activeSection;
    }

    return matchesSearch && matchesSection;
  });

  return (
    <div className="app">

      <Header onAdd={handleAdd} />

      <div className="app-layout">

        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          collections={collections}
          setCollections={setCollections}
        />

        <main className="main-content">

          <div className="page-heading">

            <p className="page-label">
              {activeCollection
                ? "COLLECTION"
                : activeSection === "tags"
                ? "FILTER"
                : "YOUR COLLECTION"}
            </p>

            <h2>
              {activeCollection ??
                (activeSection === "unsorted"
                  ? "Unsorted"
                  : activeSection === "tags"
                  ? "Tags"
                  : "My Links")}
            </h2>

            <p>
              {activeCollection
                ? "Bookmarks saved in this collection."
                : activeSection === "tags"
                ? "Bookmarks that have tags."
                : "Save and organise your favourite websites in one place."}
            </p>

          </div>

          <div className="link-count">
            {filteredLinks.length}{" "}
            {filteredLinks.length === 1
              ? "bookmark"
              : "bookmarks"}
          </div>

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <div className="links-grid">

            {/* Empty user-created collection */}
            {activeCollection &&
            filteredLinks.length === 0 ? (

              <div className="empty-state">

                <h3>No bookmarks</h3>

                <p>
                  This collection doesn't have
                  any bookmarks yet.
                </p>

                <button
                  type="button"
                  className="save-button"
                  onClick={handleAdd}
                >
                  + Add Link
                </button>

              </div>

            ) : links.length === 0 ? (

              <div className="empty-state">

                <h3>No links saved yet</h3>

                <p>
                  Click "Add Link" to save your
                  first favourite website.
                </p>

                <button
                  type="button"
                  className="save-button"
                  onClick={handleAdd}
                >
                  + Add Link
                </button>

              </div>

            ) : filteredLinks.length === 0 ? (

              <div className="empty-state">

                <h3>
                  {activeSection === "tags"
                    ? "No tagged bookmarks"
                    : "No links found"}
                </h3>

                <p>
                  {activeSection === "tags"
                    ? "You don't have any bookmarks with tags yet."
                    : `We couldn't find a link matching "${searchTerm}".`}
                </p>

              </div>

            ) : (

              filteredLinks.map((link) => (

                <LinkCard
                  key={link.id}
                  link={link}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />

              ))

            )}

          </div>

        </main>

      </div>

      {showForm && (
        <LinkForm
          onSave={handleSave}
          onCancel={handleCancel}
          editingLink={editingLink}
          collections={collections}
          activeCollection={
            activeCollection ?? ""
          }
        />
      )}

    </div>
  );
}

export default App;