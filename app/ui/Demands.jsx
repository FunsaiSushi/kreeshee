import Link from "next/link";

function Demands() {
  return (
    <main className="flex flex-col w-full p-4 max-w-7xl bg-quaternary rounded-xl">
      {/* subheader */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="sm:text-xl font-semibold text-primary">
            Latest Demands
          </h2>
        </div>

        <Link
          href="/demands"
          className="hidden sm:flex text-lg border-2 rounded-full bg-primary hover:bg-secondary text-quaternary py-1 px-4 font-semibold transition-colors duration-300"
        >
          Show more
        </Link>
      </div>

      {/* include 12 cards here, for mobile screens each row should have two cards, for (sm+) 3 cards, medium (md+) 4 cards and for large (lg+) screens 6 cards in a row.  */}

      <div className="flex"></div>
      <Link
        href="/Demands"
        className="flex sm:hidden bg-primary hover:bg-secondary text-quaternary justify-center border-2 rounded-full py-1 px-4 mt-4 font-semibold transition-colors duration-300"
      >
        Show more
      </Link>
    </main>
  );
}

export default Demands;
