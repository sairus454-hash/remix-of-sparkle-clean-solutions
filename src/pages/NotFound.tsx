import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Home, Sparkles, Car, HandMetal, Phone, Star } from "lucide-react";

const popularLinks = [
  { to: "/", label: "Strona główna", icon: Home },
  { to: "/services", label: "Usługi", icon: Sparkles },
  { to: "/prices", label: "Cennik", icon: Star },
  { to: "/auto", label: "Czyszczenie aut", icon: Car },
  { to: "/handyman", label: "Złota rączka", icon: HandMetal },
  { to: "/contacts", label: "Kontakt", icon: Phone },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 — Strona nie znaleziona | MasterClean</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-muted px-4">
        <div className="w-full max-w-lg text-center">
          <h1 className="text-7xl font-bold text-primary mb-2">404</h1>
          <p className="text-xl text-foreground font-medium mb-2">Strona nie znaleziona</p>
          <p className="text-sm text-muted-foreground mb-8">
            Strona <span className="font-mono text-xs bg-card px-1.5 py-0.5 rounded border border-border">{location.pathname}</span> nie istnieje lub została przeniesiona.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {popularLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md group"
              >
                <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {label}
                </span>
              </Link>
            ))}
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
