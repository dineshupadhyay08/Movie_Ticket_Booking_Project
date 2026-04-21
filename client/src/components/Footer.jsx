import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 md:px-16 lg:px-24">
        <div>
          <h2 className="text-lg font-semibold">Movie Ticket Counter</h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-400">
            Book tickets, explore movies, and manage your favorites from one
            place.
          </p>
        </div>
        <p className="text-xs text-gray-500">
          © 2026 Movie Ticket Counter. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
