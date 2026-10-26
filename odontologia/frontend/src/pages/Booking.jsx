import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  X,
} from "lucide-react";
import "../styles/booking.css";

const PROCEDURES = [
  {
    name: "Extrações",
    image: "/images/extracoes.png",
    description: "Remoção de dentes quando indicada após avaliação clínica.",
    details:
      "A extração dentária consiste na remoção de um dente quando sua manutenção não é indicada. Pode ser necessária em casos de danos extensos, alterações de posicionamento ou outras condições. A decisão e os cuidados antes e depois do procedimento dependem de avaliação profissional.",
  },
  {
    name: "Restaurações",
    image: "/images/restauracoes.png",
    description: "Recuperação da estrutura e da função dos dentes.",
    details:
      "As restaurações recuperam partes dos dentes afetadas por cáries, fraturas ou desgaste. Materiais como a resina composta podem ser utilizados para reconstruir a região, preservando a estrutura dental e auxiliando na mastigação.",
  },
  {
    name: "Aparelhos metálicos e estéticos",
    image: "/images/aparelho-ortodontico.png",
    description: "Tratamentos para correção do alinhamento dental e da mordida.",
    details:
      "Os aparelhos ortodônticos movimentam gradualmente os dentes para corrigir alterações de alinhamento e mordida. Existem opções metálicas e estéticas. A escolha depende das necessidades do paciente e do planejamento profissional.",
  },
  {
    name: "Atendimento de crianças",
    image: "/images/atendimento-de-criancas.png",
    description: "Cuidados odontológicos voltados à saúde bucal infantil.",
    details:
      "O atendimento infantil acompanha o desenvolvimento dos dentes e ajuda a prevenir problemas bucais. Inclui avaliações, orientações de higiene e cuidados adaptados à idade e às necessidades de cada criança.",
  },
  {
    name: "Tratamento de canal",
    image: "/images/tratamento-de-canal.png",
    description: "Tratamento da parte interna do dente.",
    details:
      "O tratamento de canal é indicado quando a polpa, tecido localizado no interior do dente, apresenta inflamação ou infecção. O procedimento trata e preenche os canais internos, buscando preservar o dente quando possível.",
  },
  {
    name: "Próteses dentárias",
    image: "/images-optimized/proteses.webp",
    description:
      "Próteses parciais removíveis, flexíveis e totais para substituir dentes ausentes e recuperar a mastigação.",
    details:
      "Recupere seu sorriso, a mastigação e a confiança com nossas opções de próteses dentárias.\n\n" +
      "• PPR: substitui alguns dentes ausentes.\n" +
      "• FLEX: prótese removível, flexível e discreta.\n" +
      "• PT: substitui todos os dentes de uma arcada.\n\n" +
      "Nossa equipe ajuda você a escolher a opção ideal após uma avaliação.",
  },
  {
    name: "Clareamento dental",
    image: "/images/clareamento-dental.png",
    description: "Tratamento estético para clarear os dentes.",
    details:
      "O clareamento dental utiliza técnicas específicas para reduzir determinadas pigmentações e tornar os dentes mais claros. A técnica e os resultados possíveis dependem das características de cada paciente e de avaliação profissional.",
  },
  {
    name: "Cirurgias odontológicas",
    image: "/images/cirurgias-odontologicas.png",
    description: "Procedimentos cirúrgicos realizados conforme indicação clínica.",
    details:
      "As cirurgias odontológicas abrangem diferentes intervenções nos dentes e tecidos da boca. A necessidade, a técnica utilizada e os cuidados posteriores são definidos de acordo com cada situação clínica.",
  },
  {
    name: "Facetas dentárias",
    image: "/images/facetas-dentarias.png",
    description: "Tratamentos estéticos para modificar a aparência dos dentes.",
    details:
      "As facetas são revestimentos aplicados à superfície dos dentes para modificar aspectos como formato e aparência. Podem ser confeccionadas em diferentes materiais, conforme a avaliação e o planejamento estético.",
  },
  {
    name: "Harmonização facial (Botox)",
    image: "/images/harmonizacao-facial-botox.png",
    description: "Procedimentos estéticos realizados após avaliação individual.",
    details:
      "A toxina botulínica pode ser utilizada para suavizar determinadas linhas de expressão por meio da redução temporária da atividade muscular. A indicação, os pontos de aplicação e os cuidados necessários dependem de avaliação profissional.",
  },
  {
    name: "Limpeza dental",
    image: "/images/limpeza-dental.png",
    description: "Remoção profissional de placa e tártaro para cuidar da saúde bucal.",
    details:
      "A limpeza profissional auxilia na remoção de placa bacteriana e tártaro. Conforme a avaliação, pode envolver raspagem e polimento, além de orientações para manter uma boa higiene bucal.",
  },
];

const WHATSAPP_NUMBER = "5581996592005";

function getWhatsAppUrl(procedure) {
  const message = `Olá! Gostaria de saber mais sobre ${procedure} e conversar sobre um possível agendamento.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function ProcedureDetails({ procedure, onClose, onSelect }) {
  const modalRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const elements = modalRef.current?.querySelectorAll(
        "button:not(:disabled), a[href]"
      );

      if (!elements?.length) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="procedure-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={modalRef}
        className="procedure-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="procedure-modal-title"
        aria-describedby="procedure-modal-description"
      >
        <header className="procedure-modal-header">
          <div>
            <span>CONHEÇA O PROCEDIMENTO</span>
            <h2 id="procedure-modal-title">{procedure.name}</h2>
          </div>

          <button
            ref={closeRef}
            type="button"
            className="procedure-modal-close"
            onClick={onClose}
            aria-label="Fechar informações"
          >
            <X size={21} />
          </button>
        </header>

        {procedure.image && (
          <div className="procedure-modal-image">
            <img
              src={procedure.image}
              alt={`Imagem ilustrativa de ${procedure.name}`}
            />
          </div>
        )}

        <div className="procedure-modal-content">
          <h3>Sobre o tratamento</h3>

          <p id="procedure-modal-description">{procedure.details}</p>

          <small>
            A indicação e o planejamento dependem de avaliação
            odontológica individualizada.
          </small>
        </div>

        <footer className="procedure-modal-footer">
          <button
            type="button"
            className="procedure-modal-back"
            onClick={onClose}
          >
            Voltar aos procedimentos
          </button>

          <button
            type="button"
            className="procedure-modal-select"
            onClick={() => onSelect(procedure)}
          >
            <Check size={17} />
            Escolher tratamento
          </button>
        </footer>
      </section>
    </div>
  );
}

export default function Booking() {
  const [selected, setSelected] = useState(null);
  const [opened, setOpened] = useState(null);
  const footerRef = useRef(null);
  const scrollPendingRef = useRef(false);

  useEffect(() => {
    if (opened || !scrollPendingRef.current) return;

    scrollPendingRef.current = false;

    const frame = requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      footerRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "instant" : "smooth",
        block: "center",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [selected, opened]);

  function closeModal() {
    setOpened(null);
  }

  function selectProcedure(procedure) {
    scrollPendingRef.current = true;
    setSelected(procedure);
    setOpened(null);
  }

  return (
    <div className="procedure-page">
      <header className="procedure-header">
        <div className="procedure-header-inner">
          <div className="procedure-brand">
            <img
              src="/images-optimized/logo-odonto.webp"
              alt="Alícia Korinfsky"
            />
          </div>

          <Link to="/" className="procedure-back">
            <ArrowLeft size={17} />
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="container procedure-main">
        <div className="procedure-intro">
          <span>TRATAMENTOS ODONTOLÓGICOS</span>

          <h1>Encontre o cuidado que você procura</h1>

          <p>
            Conheça os procedimentos oferecidos pela Dra. Alícia Korinfsky.
            Clique em um tratamento para saber mais e converse com nossa
            equipe pelo WhatsApp.
          </p>
        </div>

        <div className="procedure-grid">
          {PROCEDURES.map((procedure) => {
            const isSelected = selected?.name === procedure.name;

            return (
              <button
                key={procedure.name}
                type="button"
                className={`procedure-card${isSelected ? " is-selected" : ""}`}
                onClick={() => setOpened(procedure)}
                aria-label={`Saiba mais sobre ${procedure.name}`}
              >
                {procedure.image ? (
                  <img
                    src={procedure.image}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <span
                    className="procedure-placeholder"
                    aria-hidden="true"
                  />
                )}

                <span className="procedure-card-body">
                  <span className="procedure-card-title">
                    <strong>{procedure.name}</strong>
                    {isSelected && <Check size={19} />}
                  </span>

                  <span className="procedure-description">
                    {procedure.description}
                  </span>

                  <span className="procedure-select">
                    {isSelected
                      ? "Selecionado · Ver detalhes"
                      : "Saiba mais"}
                    <ArrowRight size={15} />
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <section ref={footerRef} className="procedure-footer">
          <div>
            <span className="procedure-footer-label">
              TRATAMENTO ESCOLHIDO
            </span>

            <h2>{selected?.name || "Selecione um procedimento"}</h2>

            <p>
              A data e o horário serão combinados diretamente com nossa equipe.
            </p>
          </div>

          {selected ? (
            <a
              href={getWhatsAppUrl(selected.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="procedure-cta"
            >
              <MessageCircle size={19} />
              Continuar pelo WhatsApp
              <ArrowRight size={17} />
            </a>
          ) : (
            <span className="procedure-cta is-disabled">
              <MessageCircle size={19} />
              Selecione um tratamento
            </span>
          )}
        </section>
      </main>

      {opened && (
        <ProcedureDetails
          procedure={opened}
          onClose={closeModal}
          onSelect={selectProcedure}
        />
      )}
    </div>
  );
}