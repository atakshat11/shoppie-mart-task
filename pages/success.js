import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import confetti from "canvas-confetti";
import baseUrl from "../helpers/baseUrl";
//Success Animation
const shootFireWork = () => {
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.2, 0.4), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.6, 0.8), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};

const Success = () => {
  const {
    query: { session_id },
  } = useRouter();
  console.log("ev", session_id);
  const fetcher = (url) =>
    axios.get(url).then((res) => {
      return res.data;
    });
  const { data, error } = useSWR(
    () => `${baseUrl}/api/checkout_sessions/${session_id}`,
    fetcher
  );
  console.log("success data", data);
  useEffect(() => {
    if (data) {
      console.log("success data");
      shootFireWork();
    }
  }, [data]);

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6 text-center">
      {error ? (
        <div className="p-2 rounded-md bg-rose-100 text-rose-500 max-w-md mx-auto">
          <p className="text-lg">Sorry, something went wrong!</p>
        </div>
      ) : !data ? (
        <div className="p-2 rounded-md bg-gray-100 text-gray-500 max-w-md mx-auto">
          <p className="text-lg animate-pulse">Loading...</p>
        </div>
      ) : (
        <div className="py-4 px-8 rounded-md bg-gray-100 max-w-lg mx-auto">
          <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1">
            <span>Thanks for your order!</span>
          </h2>
          <p className="text-lg mt-3">Check your inbox for the receipt.</p>
        </div>
      )}
    </div>
  );
};

export default Success;
