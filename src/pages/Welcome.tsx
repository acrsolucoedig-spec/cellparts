import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Bike, Shield, Store } from "lucide-react";
import acrLogoFull from "@/assets/acr-logo-full.jpeg";
import acrWings from "@/assets/acr-wings.png";

const Welcome = () => {
  const navigate = useNavigate();

  const profiles = [
    {
      id: "cliente",
      title: "Cliente",
      description: "Compre produtos e acompanhe entregas em tempo real",
      icon: ShoppingBag,
      path: "/cliente",
      gradient: "from-primary/20 to-primary/5",
    },
    {
      id: "lojista",
      title: "Lojista",
      description: "Gerencie seu catálogo, vendas e estoque",
      icon: Store,
      path: "/lojista",
      gradient: "from-secondary/20 to-secondary/5",
    },
    {
      id: "motorista",
      title: "Motorista",
      description: "Aceite entregas, ganhe dinheiro e monitore seus ganhos",
      icon: Bike,
      path: "/motorista",
      gradient: "from-blue-500/20 to-blue-500/5",
    },
    {
      id: "admin",
      title: "Admin",
      description: "Gerencie todo o sistema, produtos e entregas",
      icon: Shield,
      path: "/admin",
      gradient: "from-purple-500/20 to-purple-500/5",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-green-950 to-black">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(84, 100%, 59%) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, hsl(51, 100%, 50%) 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating Wings Background - Decorative */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <img 
          src={acrWings} 
          alt="" 
          className="absolute top-20 left-10 w-64 h-64 object-contain animate-float"
          style={{ animationDelay: '0s' }}
        />
        <img 
          src={acrWings} 
          alt="" 
          className="absolute bottom-20 right-10 w-96 h-96 object-contain animate-float"
          style={{ animationDelay: '2s', transform: 'scaleX(-1)' }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col">
        {/* Logo Principal */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 blur-2xl opacity-60 animate-glow-pulse">
              <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-primary rounded-2xl" />
            </div>
            
            {/* Logo Image */}
            <img 
              src={acrLogoFull} 
              alt="ACR - Soluções Digitais | Marketplace | Reparos" 
              className="relative w-full max-w-2xl mx-auto h-auto drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(173, 255, 47, 0.5)) drop-shadow(0 0 60px rgba(255, 215, 0, 0.3))'
              }}
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mt-6 text-primary">
            Delivery System
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            Sistema completo de gestão para entregas e vendas
          </p>
        </div>

        {/* Profile Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;
            return (
              <div
                key={profile.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="group relative h-full">
                  {/* Glow Effect on Hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500" />
                  
                  {/* Card Content */}
                  <div className={`relative h-full bg-gradient-to-br ${profile.gradient} backdrop-blur-sm border border-border rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50`}>
                    {/* Icon */}
                    <div className="mb-6 relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                      <div className="relative w-20 h-20 rounded-full bg-card border-2 border-primary/30 group-hover:border-primary flex items-center justify-center transition-all">
                        <Icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {profile.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-8 flex-1 text-sm">
                      {profile.description}
                    </p>

                    {/* Action Button */}
                    <Button
                      onClick={() => navigate(profile.path)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all group-hover:shadow-lg group-hover:shadow-primary/50"
                      size="lg"
                    >
                      Acessar
                    </Button>
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
