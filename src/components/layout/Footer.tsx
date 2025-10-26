// src/components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="border-t bg-muted/50 py-8 mt-16">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Hiking Gallery. All images are
          publicly licensed or original.
        </p>
      </div>
    </footer>
  );
}
