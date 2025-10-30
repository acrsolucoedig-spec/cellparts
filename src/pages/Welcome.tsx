import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Bike, Settings } from "lucide-react";

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
      id: "motorista",
      title: "Motorista",
      description: "Aceite entregas, ganhe dinheiro e monitore seus ganhos",
      icon: Bike,
      path: "/motorista",
      gradient: "from-secondary/20 to-secondary/5",
    },
    {
      id: "admin",
      title: "Admin",
      description: "Gerencie todo o sistema, produtos e entregas",
      icon: Settings,
      path: "/admin",
      gradient: "from-purple-500/20 to-purple-500/5",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-black to-green-950">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(84, 100%, 59%) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, hsl(51, 100%, 50%) 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col">
        {/* Logo and Title */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full animate-glow-pulse" />
              <h1 className="relative text-6xl md:text-8xl font-bold text-primary text-glow">
                ACR
              </h1>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Delivery System
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Sistema completo de gestão para entregas e vendas
          </p>
        </div>

        {/* Profile Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
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
                    <p className="text-muted-foreground mb-8 flex-1">
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
          <p className="text-sm text-muted-foreground">
            Versão 1.0.0 • Sistema de gestão completo para entregas
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
