import Link from "next/link";

export function Navbar() {
  // This function renders the navigation bar for the application
  return (
    <div className="nav navbar navbar-expand-lg fixed-top">
     
      <h3>Entertainment App</h3>
      <div className="navlinks">
        <Link href="/#Home" title="Home" className="navbar-brand">Home</Link>
        <Link href="/Movies" title="Movies" className="navbar-brand">Movies</Link>
        {/* <Link to="/`${id}`" title="Details" className="navbar-brand">Movies</Link> */}
        <Link href="/TV" title="TV" className="navbar-brand">TV</Link>
        <Link href="/Bookmarks" title="Bookmarks" className="navbar-brand">Bookmarks</Link>
      </div>
    </div>
  );
}
