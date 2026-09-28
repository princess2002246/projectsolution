interface HeaderProps {
  onAdd: () => void;
}

function Header({ onAdd }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="logo-icon">L</div>

        <div>
          <h1>Links Vault</h1>
          <p>Save & organise your favourite links</p>
        </div>
      </div>

      <button
        className="add-link-button"
        onClick={onAdd}
      >
        + Add Link
      </button>
    </header>
  );
}

export default Header;