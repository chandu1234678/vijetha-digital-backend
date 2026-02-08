export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Vijetha Digital</h1>

        <nav className="space-x-6 text-sm">
          <a>Flex Banners</a>
          <a>Vinyl Prints</a>
          <a>LED Boards</a>
        </nav>

        <div className="space-x-4">
          <button>Login</button>
          <button>Cart</button>
        </div>
      </div>
    </header>
  );
}
