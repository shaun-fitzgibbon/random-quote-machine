import LoadingSpinner from "@/components/loading-spinner";
import { type NextPage } from "next";
import Head from "next/head";
import { title } from "process";
import { useEffect, useState } from "react";
import { FaQuoteLeft, FaTwitter } from "react-icons/fa";

type Quote = {
  quote: string;
  author: string;
};

const Home: NextPage = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setLoading] = useState(false);

  const fetchQuote = () => {
    setLoading(true);
    fetch("/api/quote")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data as Quote);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (!quote || quote === null) return <p>No Quote to display</p>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="max-sm: container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white">
          Random <span className="text-[hsl(280,100%,70%)]">Quote</span> Machine
        </h1>
        <div
          id="quote-box"
          className="h-full w-[640px] max-w-screen-sm rounded-md bg-[#2e026d]/80 p-11 text-white"
        >
          {!isLoading ? (
            <figure>
              <blockquote className="flex flex-row gap-3">
                <i className="top-0 text-5xl leading-3 text-[hsl(280,100%,70%)]">
                  <FaQuoteLeft />
                </i>
                <p id="text" className="text-3xl">
                  {quote.quote}
                </p>
              </blockquote>

              <figcaption className="p-2 text-right font-thin">
                - <span id="author">{quote.author}</span>
              </figcaption>
            </figure>
          ) : (
            <div className="flex flex-col items-center justify-center p-5">
              <LoadingSpinner size={40} />
            </div>
          )}

          <div className="flex flex-row justify-between">
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?text="${quote.quote}" - ${quote.author}`}
              className="flex items-center justify-center rounded-sm bg-[hsl(280,100%,70%)] px-3 py-2 align-middle text-white hover:bg-[hsl(280,73%,72%)]"
              target="_blank"
            >
              <FaTwitter />
            </a>
            <div>
              <button
                id="new-quote"
                className="flex flex-row rounded-sm bg-[hsl(280,100%,70%)] px-3 py-2 text-white hover:bg-[hsl(280,73%,72%)]"
                onClick={() => fetchQuote()}
                disabled={isLoading}
              >
                {!isLoading ? (
                  <p>Get Quote</p>
                ) : (
                  <div className="flex flex-row items-center justify-center">
                    <LoadingSpinner color="fill-white" />
                    <p>Get Quote</p>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
