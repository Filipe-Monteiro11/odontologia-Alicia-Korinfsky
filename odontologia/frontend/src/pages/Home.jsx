import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import "../styles/home.css";

const WHATSAPP = "https://wa.me/5581996592005";
const INSTAGRAM = "https://instagram.com/dentista.aliciakorinfsky";

const ADDRESS = "Rua Vila Nova, 622, Loja 29, Centro, Camaragibe, PE";

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;

const SERVICES = [
  "Extrações",
  "Restaurações",
  "Aparelhos metálicos e estéticos",
  "Atendimento de crianças",
  "Tratamento de canal",
  "Próteses dentárias",
  "Clareamento dental",
  "Cirurgias odontológicas",
  "Facetas dentárias",
  "Harmonização facial (Botox)",
  "Limpeza dental",
];

const PHOTOS = Array.from({ length: 7 }, (_, index) => ({
  src: `/images-optimized/foto-${index + 1}.webp`,
  alt: `Registro fotográfico odontológico ${index + 1}`,
}));

export default function Home() {
  const [openPhoto, setOpenPhoto] = useState(null);
  const closeRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!openPhoto) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpenPhoto(null);
      }

      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [openPhoto]);

  function showPhoto(photo, event) {
    triggerRef.current = event.currentTarget;
    setOpenPhoto(photo);
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="home-header-inner">
          <div className="home-brand">
            <img
              src="/images-optimized/logo-odonto.webp"
              alt="Dra. Alícia Korinfsky"
              draggable="false"
            />
          </div>

          <nav className="home-nav" aria-label="Menu principal">
            <a href="#sobre">Sobre a dentista</a>
            <a href="#tratamentos">Tratamentos</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="inicio" className="home-hero">
          <div className="container home-hero-grid">
            <div className="home-hero-text">
              <span className="home-eyebrow">
                ODONTOLOGIA EM CAMARAGIBE
              </span>

              <h1>Atenção e cuidado para o seu sorriso.</h1>

              <p>
                Com atuação especializada em mais de sete áreas da
                odontologia e em estética facial com Botox, a clínica
                da Dra. Alícia Korinfsky reúne uma equipe
                multidisciplinar e técnicas avançadas para oferecer
                tratamentos que valorizam sua saúde, beleza e bem-estar.
              </p>

              <div className="home-actions">
                <Link
                  to="/agendar"
                  className="home-button home-button-dark"
                >
                  Conhecer procedimentos
                  <ArrowRight size={17} />
                </Link>

                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-button home-button-outline"
                >
                  <MessageCircle size={17} />
                  Falar pelo WhatsApp
                </a>
              </div>

              <div className="home-location">
                <MapPin size={17} />
                Centro, Camaragibe - PE
              </div>
            </div>

            <aside className="home-hero-panel">
              <span className="home-eyebrow">
                NOSSO ATENDIMENTO
              </span>

              <h2>Seu sorriso merece atenção.</h2>

              <p>
                Conheça os procedimentos e converse com a equipe
                para tirar dúvidas e combinar seu atendimento.
              </p>

              <div className="home-hero-info">
                <Clock3 size={20} />

                <div>
                  <strong>Horário de funcionamento</strong>
                  <span>Segunda a sexta: 09h às 17h</span>
                  <span>Sábado: 09h às 12h</span>
                </div>
              </div>

              <div className="home-hero-info">
                <Phone size={20} />

                <div>
                  <strong>Telefone / WhatsApp</strong>
                  <span>(81) 99659-2005</span>
                </div>
              </div>

              <Link to="/agendar" className="home-panel-link">
                Explorar procedimentos
                <ArrowRight size={17} />
              </Link>
            </aside>
          </div>
        </section>

        <section id="sobre" className="home-section home-about">
          <div className="container">
            <div className="home-about-heading">
              <div className="home-about-photo">
                <img
                  src="/images-optimized/dra-alicia.webp"
                  alt="Dra. Alícia Korinfsky"
                  loading="lazy"
                />
              </div>

              <div className="home-about-info">
                <span className="home-eyebrow">
                  CONHEÇA A PROFISSIONAL
                </span>

                <h2>Sobre a Dra. Alícia Korinfsky</h2>

                <p>
                  A clínica atua em mais de sete áreas da odontologia
                  e oferece procedimentos de estética facial, incluindo
                  a aplicação de toxina botulínica (Botox).
                </p>

                <p>
                  Com uma equipe multidisciplinar, a Dra. Alícia
                  Korinfsky oferece atendimento individualizado,
                  com foco na saúde, na estética e no bem-estar
                  de cada paciente.
                </p>
              </div>
            </div>

            <div className="home-work-heading">
              <div>
                <span className="home-eyebrow">
                  REGISTROS FOTOGRÁFICOS
                </span>

                <h3>Nosso trabalho</h3>
              </div>

              <p>
                Conheça alguns registros fotográficos de
                tratamentos realizados no consultório.
              </p>
            </div>

            <div className="home-photo-grid">
              {PHOTOS.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  className={`home-photo home-photo-${index + 1}`}
                  onClick={(event) => showPhoto(photo, event)}
                  aria-label={`Ampliar fotografia ${index + 1}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            <p className="home-gallery-note">
              As indicações e os resultados dos tratamentos dependem
              das características de cada paciente.
            </p>
          </div>
        </section>

        <section
          id="tratamentos"
          className="home-section home-services"
        >
          <div className="container">
            <div className="home-section-heading">
              <span className="home-eyebrow">
                NOSSOS TRATAMENTOS
              </span>

              <h2>Cuidados para a sua saúde bucal</h2>

              <p>
                Confira os procedimentos apresentados no consultório.
                A indicação depende de avaliação odontológica individual.
              </p>
            </div>

            <div className="home-services-grid">
              {SERVICES.map((service, index) => (
                <div className="home-service" key={service}>
                  <span className="home-service-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contato"
          className="home-section home-contact"
        >
          <div className="container">
            <div className="home-section-heading">
              <span className="home-eyebrow">
                CONTATO
              </span>

              <h2>Estamos à sua disposição</h2>

              <p>
                Entre em contato com a equipe ou conheça
                a localização do consultório.
              </p>
            </div>

            <div className="home-contact-grid">
              <div className="home-contact-stack">
                <div className="home-contact-card">
                  <Phone size={23} />

                  <h3>WhatsApp</h3>
                  <p>(81) 99659-2005</p>

                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enviar mensagem
                    <ArrowRight size={16} />
                  </a>
                </div>

                <div className="home-contact-card">
                  <Camera size={23} />

                  <h3>Instagram</h3>
                  <p>@dentista.aliciakorinfsky</p>

                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acessar perfil
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              <div className="home-contact-card home-contact-address">
                <MapPin size={23} />

                <h3>Onde estamos</h3>

                <p>
                  Rua Vila Nova, 622, Loja 29
                  <br />
                  Centro, Camaragibe - PE
                </p>

                <div className="home-contact-map">
                  <iframe
                    src={MAP_EMBED}
                    title="Localização do consultório da Dra. Alícia Korinfsky"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <a
                  href={MAPS}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver localização
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="home-hours">
              <div>
                <Clock3 size={21} />
                <strong>Horário de funcionamento</strong>
              </div>

              <p>
                Segunda a sexta: 09h às 17h
                <br />
                Sábado: 09h às 12h
                <br />
                Domingo: fechado
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="container home-footer-inner">
          <strong>Dra. Alícia Korinfsky</strong>
          <span>© 2026 · Camaragibe, PE</span>
        </div>
      </footer>

      {openPhoto && (
        <div
          className="home-photo-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpenPhoto(null);
            }
          }}
        >
          <div
            className="home-photo-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Fotografia ampliada"
          >
            <button
              ref={closeRef}
              type="button"
              className="home-photo-close"
              onClick={() => setOpenPhoto(null)}
              aria-label="Fechar fotografia"
            >
              <X size={22} />
            </button>

            <img src={openPhoto.src} alt={openPhoto.alt} />
          </div>
        </div>
      )}
    </div>
  );
}