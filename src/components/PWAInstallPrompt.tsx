import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";
import { installPWA, hideInstallPrompt, isPWAInstalled } from "@/lib/pwa";
import acrWings from "@/assets/acr-wings.png";

const PWAInstallPrompt = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (isPWAInstalled()) {
      return;
    }

    // Show prompt after 3 seconds
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleInstall = async () => {
    await installPWA();
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
    hideInstallPrompt();
  };

  if (!show) return null;

  return (
    <div
      id="pwa-install-prompt"
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 animate-fade-in-up"
    >
      <div className="bg-card border-2 border-primary rounded-2xl shadow-2xl shadow-primary/20 p-6 max-w-sm">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          {/* Small neon icon */}
          <div
            className="rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              width: 32,
              height: 32,
              background: "radial-gradient(circle at 30% 30%, hsl(84 100% 50%), hsl(84 100% 60%))",
              boxShadow: "0 0 8px hsla(84,100%,60%,0.4)",
              border: "1px solid hsla(84,100%,60%,0.3)",
            }}
          >
            <img src={acrWings} alt="ACR Icon" className="object-contain" style={{ width: 18, height: 18 }} />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">Instalar ACR Delivery</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Instale o app para acesso rápido e notificações em tempo real
            </p>

            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Instalar
              </Button>
              <Button
                onClick={handleClose}
                size="sm"
                variant="ghost"
                className="text-muted-foreground"
              >
                Depois
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
