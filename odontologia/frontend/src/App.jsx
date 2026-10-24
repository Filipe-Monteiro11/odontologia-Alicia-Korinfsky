import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Booking from "./pages/Booking.jsx";
import "./styles/consent.css";

const MEASUREMENT_ID = "G-REDK26PJXZ";
const STORAGE_KEY = "analytics-consent";

function getConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function AnalyticsConsent() {
  const [consent, setConsent] = useState(getConsent);
  const [ready, setReady] = useState(false);
  const [showBanner, setShowBanner] = useState(consent === null);
  const location = useLocation();

  useEffect(() => {
    if (consent !== "accepted") return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, {
      send_page_view: false,
    });

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    script.async = true;
    script.onload = () => setReady(true);
    document.head.appendChild(script);

    return () => {
      script.remove();
      setReady(false);
    };
  }, [consent]);

  useEffect(() => {
    if (!ready || consent !== "accepted") return;

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}`,
    });
  }, [ready, consent, location.pathname, location.search]);

  function saveConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // A escolha vale apenas durante a sessão atual.
    }

    if (consent === "accepted" && value === "rejected") {
      window.gtag?.("consent", "update", {
        analytics_storage: "denied",
      });

      document.cookie.split(";").forEach((entry) => {
        const name = entry.split("=")[0].trim();
        if (name === "_ga" || name.startsWith("_ga_")) {
          document.cookie = `${name}=; Max-Age=0; Path=/`;
        }
      });

      window.location.reload();
      return;
    }

    setConsent(value);
    setShowBanner(false);
  }

  return (
    <>
      {showBanner && (
        <div className="consent-banner" role="region" aria-label="Privacidade">
          <div className="consent-text">
            <strong>Sua privacidade importa</strong>
            <p>
              Utilizamos o Google Analytics, com sua autorização, para
              entender as visitas ao site e melhorar sua experiência.
              Você pode recusar sem prejudicar sua navegação.
            </p>
          </div>

          <div className="consent-actions">
            <button
              type="button"
              className="consent-reject"
              onClick={() => saveConsent("rejected")}
            >
              Recusar
            </button>

            <button
              type="button"
              className="consent-accept"
              onClick={() => saveConsent("accepted")}
            >
              Aceitar
            </button>
          </div>
        </div>
      )}

      {consent !== null && !showBanner && (
        <button
          type="button"
          className="consent-manage"
          onClick={() => setShowBanner(true)}
        >
          Privacidade
        </button>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agendar" element={<Booking />} />
      </Routes>

      <AnalyticsConsent />
    </BrowserRouter>
  );
}