import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Bell, MapPin, Wallet, TrendingUp } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const Motorista = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bell,
      title: "Entregas Disponíveis",
      description: "Veja todas as entregas próximas a você",
      soon: false,
    },
    {
      icon: MapPin,
      title: "Entregas Ativas",
      description: "Acompanhe suas entregas em andamento",
      soon: false,
    },
    {
      icon: Wallet,
      title: "Minha Carteira",
      description: "Veja seus ganhos e histórico de pagamentos",
      soon: false,
    },
    {
      icon: TrendingUp,
      title: "Performance",
      description: "Acompanhe suas estatísticas e ranking",
      soon: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950">
      <div className="container mx-auto px-4 py-8">
        <PageHeader />

        {/* Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Portal do Motorista
          </h1>
          <p className="text-lg text-muted-foreground">
            Aceite entregas e maximize seus ganhos
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {[
            { label: "Entregas Hoje", value: "0", color: "primary" },
            { label: "Ganhos Hoje", value: "R$ 0,00", color: "secondary" },
            { label: "Taxa Aceitação", value: "0%", color: "green-500" },
            { label: "Avaliação", value: "5.0", color: "yellow-500" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-4 text-center animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`text-2xl font-bold text-${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
                
                <div className="relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group-hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-lg shadow-primary/30"
          >
            Ver Entregas Disponíveis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Motorista;
