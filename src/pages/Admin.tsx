import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LayoutDashboard, Package, Users, Truck, Settings, BarChart3 } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      description: "Visão geral do sistema em tempo real",
      soon: false,
    },
    {
      icon: Package,
      title: "Produtos",
      description: "Gerencie catálogo, estoque e preços",
      soon: false,
    },
    {
      icon: Truck,
      title: "Pedidos",
      description: "Acompanhe e gerencie todas as entregas",
      soon: false,
    },
    {
      icon: Users,
      title: "Motoristas",
      description: "Aprove, gerencie e monitore motoristas",
      soon: false,
    },
    {
      icon: BarChart3,
      title: "Relatórios",
      description: "Analytics e insights detalhados",
      soon: false,
    },
    {
      icon: Settings,
      title: "Configurações",
      description: "Frete, promoções e políticas",
      soon: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="text-primary font-bold text-2xl">ACR</div>
        </div>

        {/* Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Painel Administrativo
          </h1>
          <p className="text-lg text-muted-foreground">
            Gerencie todo o sistema de entregas
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
          {[
            { label: "Pedidos Hoje", value: "0", icon: Package },
            { label: "Motoristas Ativos", value: "0", icon: Truck },
            { label: "Vendas Hoje", value: "R$ 0,00", icon: BarChart3 },
            { label: "Taxa Entrega", value: "0%", icon: LayoutDashboard },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-4 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
                
                <div className="relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all group-hover:scale-105 h-full">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-lg shadow-primary/30"
          >
            Acessar Dashboard Completo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
