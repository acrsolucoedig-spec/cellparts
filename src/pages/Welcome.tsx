import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Bike, Shield, Store, User } from "lucide-react";
import helmetIcon from "@/assets/icons/helmet-motoboy.svg";
import helmetIco from "@/assets/icons/capacete2.ico";
import acrLogoNew from "@/assets/acr-logo-new.jpeg";
import acrWings from "@/assets/acr-wings.png";
import { useEffect, useMemo, useState } from "react";
import "@/styles/cellparts-theme.css";

const Welcome = () => {
  const navigate = useNavigate();
  const colorCycle = useMemo(
    () => [
      { h: 84, s: 100, l: 60 },
      { h: 84, s: 100, l: 55 },
      { h: 84, s: 100, l: 50 },
      { h: 84, s: 100, l: 65 },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % colorCycle.length), 3000);
    return () => clearInterval(t);
  }, [colorCycle.length]);

  const neon = `hsl(${colorCycle[idx].h} ${colorCycle[idx].s}% ${colorCycle[idx].l}%)`;
  const neonBright = `hsl(${colorCycle[idx].h} ${colorCycle[idx].s}% ${Math.max(
    colorCycle[idx].l - 10,
    50
  )}%)`;

  const profiles = [
    {
      id: "cliente",
      title: "Cliente",
      description: "Faça seus pedidos e acompanhe entregas",
      icon: User,
      path: "/cliente",
    },
    {
      id: "lojista",
      title: "Lojista",
      description: "Gerencie seu catálogo, vendas e estoque",
      icon: Store,
      path: "/lojista",
    },
    {
      id: "motorista",
      title: "Motoboy",
      description: "Gerencie suas entregas e rotas",
      icon: Bike,
      path: "/motorista",
    },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden cp-bg cp-body"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url(${acrLogoNew})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'filter 1000ms ease-in-out',
      }}
    >
      <style>{`
        @keyframes glowPulse { 0%,100% { filter: drop-shadow(0 0 8px ${neon}) drop-shadow(0 0 14px ${neonBright}); } 50% { filter: drop-shadow(0 0 12px ${neonBright}) drop-shadow(0 0 20px ${neon}); } }
        @keyframes radialShift { 0% { background-position: 25% 25%, 75% 75%; } 50% { background-position: 30% 30%, 70% 70%; } 100% { background-position: 25% 25%, 75% 75%; }
        }
      `}</style>
      {/* Soft neon radial overlay for depth */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.08 }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(60rem 60rem at 20% 30%, ${neon} 0%, transparent 55%), radial-gradient(70rem 70rem at 80% 70%, ${neonBright} 0%, transparent 55%)`,
            animation: 'radialShift 10s ease-in-out infinite',
            transition: 'opacity 1000ms ease-in-out, background-image 1000ms ease-in-out',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10 min-h-screen flex flex-col">
        {/* Logo + Title */}
        <div className="text-center mb-6 animate-fade-in">
          {/* App Icon (1:1, up to 420px) */}
          <div
            className="mx-auto mb-2 rounded-md relative"
            style={{
              width: "clamp(120px, 30vw, 360px)",
              height: "clamp(120px, 30vw, 360px)",
            }}
          >
            <img
              src={acrWings}
              alt="ACR Wings"
              className="w-full h-full object-contain rounded-sm"
              style={{
                display: "block",
                maxWidth: "100%",
                height: "100%",
              }}
            />
          </div>

          {/* Logo central removida conforme solicitado */}

          <h2
            className="text-2xl md:text-3xl font-bold mt-3 cp-title"
            style={{
              color: neon,
              textShadow: `0 0 1px ${neon}, 0 0 4px ${neonBright}`,
              transition: "color 1000ms ease-in-out, text-shadow 1000ms ease-in-out",
            }}
          >
            CellParts
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-1 cp-text">Selecione seu perfil de acesso</p>

          {/* Install App Button */}
          <div className="mt-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("pwa:prompt"))}
              className="px-4 py-2 rounded-md text-sm font-semibold cp-button"
              style={{
                backgroundColor: neon,
                color: "hsl(0 0% 0%)",
                boxShadow: `0 0 0 1px ${neon}22, 0 6px 16px ${neon}80`,
                transition: "background-color 1000ms ease-in-out, box-shadow 1000ms ease-in-out",
              }}
            >
              Instalar App
            </button>
          </div>
        </div>

        {/* Admin quick icon separated from cards (top-right) */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => navigate('/admin')}
            aria-label="Administrador"
            className="rounded-full"
            style={{
              width: 48,
              height: 48,
              background: `radial-gradient(circle at 30% 30%, ${neonBright}, ${neon})`,
              boxShadow: `0 0 8px ${neon}33`,
              border: `1px solid ${neon}22`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 200ms ease',
            }}
            title="Administrador"
          >
            <Shield style={{ width: 22, height: 22, color: 'black' }} />
          </button>
          <span
            className="text-sm font-semibold cursor-pointer select-none cp-text"
            onClick={() => navigate('/admin')}
            style={{
              color: neon,
              textShadow: `0 0 2px ${neon}, 0 0 6px ${neonBright}`,
              transition: 'color 1000ms ease-in-out, text-shadow 1000ms ease-in-out',
            }}
          >
            Administrador
          </span>
        </div>

        {/* Profile Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;
            const isAdmin = profile.id === "admin";
            const isMotoboy = profile.id === "motorista";
            const circleSize = isMotoboy ? 84 : isAdmin ? 64 : 80; // px
            const innerImgSize = isMotoboy ? 60 : isAdmin ? 38 : 48; // px
            return (
              <div
                key={profile.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="group relative h-full" style={{ transition: "transform 1000ms ease-in-out" }}>
                  {/* Glow Effect on Hover */}
                  <div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${neon}, ${neonBright})`,
                    }}
                  />
                  
                  {/* Card Content */}
                  <div
                    className={`relative h-full bg-card/80 backdrop-blur-sm border rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 group-hover:scale-105 cp-card`}
                    style={{
                      borderColor: `${neon}33`,
                      boxShadow: `0 0 0 1px ${neon}1f, 0 0 12px ${neon}33`,
                      transition: "transform 1000ms ease-in-out, box-shadow 1000ms ease-in-out, border-color 1000ms ease-in-out",
                    }}
                  >
                    {/* Icons */}
                    {isAdmin ? (
                      <button
                        onClick={() => navigate('/admin')}
                        aria-label="Administrador"
                        className="mb-6 rounded-full"
                        style={{
                          width: 56,
                          height: 56,
                          background: `radial-gradient(circle at 30% 30%, ${neonBright}, ${neon})`,
                          boxShadow: `0 0 8px ${neon}33`,
                          border: `1px solid ${neon}22`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Shield style={{ width: 24, height: 24, color: 'black' }} />
                      </button>
                    ) : (
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 rounded-full blur-lg group-hover:blur-xl transition-all" style={{ background: `${neon}22` }} />
                        <div
                          className="relative rounded-full flex items-center justify-center overflow-hidden transition-all cp-icon-circle soft"
                          style={{
                            width: `${circleSize}px`,
                            height: `${circleSize}px`,
                            background: `radial-gradient(circle at 30% 30%, ${neonBright}, ${neon})`,
                            boxShadow: `0 0 6px ${neon}33`,
                            border: `1px solid ${neon}22`,
                          }}
                        >
                          {/* Profile icon */}
                          {isMotoboy ? (
                            <img src={helmetIco || helmetIcon} alt="Motoboy" style={{ width: innerImgSize, height: innerImgSize }} />
                          ) : (
                            <Icon style={{ width: innerImgSize, height: innerImgSize, color: 'black' }} />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Title */}
                    {!isAdmin && (
                      <h3
                        className="text-2xl font-bold mb-3 transition-colors cp-text cp-title-soft"
                        style={{
                          color: neon,
                          textShadow: `0 0 1px ${neon}, 0 0 3px ${neonBright}`,
                          transition: "color 1000ms ease-in-out, text-shadow 1000ms ease-in-out",
                        }}
                      >
                        {profile.title}
                      </h3>
                    )}

                    {/* Description */}
                    {!isAdmin && (
                      <p className="text-muted-foreground mb-4 flex-1 text-sm cp-text">
                        {profile.description}
                      </p>
                    )}

                    {/* Action Button */}
                    {!isAdmin && (
                      <Button
                        onClick={() => navigate(profile.path)}
                        className="w-full font-semibold transition-all rounded-full cp-button"
                        size="lg"
                        style={{
                          backgroundColor: neon,
                          color: "hsl(0 0% 0%)",
                          boxShadow: `0 0 0 1px ${neon}33, 0 8px 24px ${neon}80`,
                          transition: "background-color 1000ms ease-in-out, box-shadow 1000ms ease-in-out, transform 200ms ease",
                        }}
                      >
                        Acessar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <p className="text-xs md:text-sm text-muted-foreground">
            Versão 1.0.0 • Sistema de gestão completo para entregas
          </p>
          <p className="text-xs text-muted-foreground mt-2 opacity-70">
            Soluções Digitais | Marketplace | Reparos
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
