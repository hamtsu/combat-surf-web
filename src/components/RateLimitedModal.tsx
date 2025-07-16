"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Button from "./Button";

const RateLimitedModal = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Cookies.get("rateLimitExceeded") === "true") {
      setVisible(true);
      Cookies.remove("rateLimitExceeded");
    }
  }, []);

  if (visible) {
    return (
      <div className="opacity-0 animate-fade-in fixed top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center z-50">
        <div className="bg-stone-800 p-6 rounded-md text-center">
          <h2 className="text-xl font-semibold text-stone-200 mb-4">
            Rate Limit Exceeded
          </h2>
          <p className="text-stone-400 mb-4">
            You have exceeded the rate limit for requests. Please try again
            in a few minutes.
          </p>

          <Button onClick={() => setVisible(false)} className="bg-stone-200 w-full flex items-center justify-center text-center font-bold hover:bg-stone-300 mt-12 p-2"><p>Dismiss</p></Button>
        </div>
      </div>
    );
  }
};

export default RateLimitedModal;
