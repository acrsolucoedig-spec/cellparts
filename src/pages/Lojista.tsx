import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Store, Package, BarChart3, TrendingUp, DollarSign, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const Lojista = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Store,
      title: "Meu Catálogo",
      description: "Gerencie seus produtos e estoque",
      soon: false,
    },
    {
      icon: Package,
      title: "Pedidos",
      description: "Acompanhe vendas e entregas",
      soon: false,
    },
    {
      icon: DollarSign,
      title: "Financeiro",
      description: "Controle suas receitas e comissões",
      soon: false,
    },
    {
      icon: BarChart3,
      title: "Relatórios",
      description: "Análise de vendas e performance",
      soon: false,
    },
    {
      icon: Users,
      title: "Clientes",
      description: "Gerencie sua base de clientes",
      soon: false,
    },
    {
      icon: TrendingUp,
      title: "Promoções",
      description: "Crie ofertas e cupons de desconto",
      soon: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-yellow-950">
      <div className="container mx-auto px-4 py-8">
        <PageHeader />

        {/* Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Portal do Lojista
          </h1>
          <p className="text-lg text-muted-foreground">
            Gerencie seu negócio e maximize suas vendas
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
          {[
            { label: "Vendas Hoje", value: "R$ 0,00", color: "secondary", icon: DollarSign },
            { label: "Pedidos", value: "0", color: "primary", icon: Package },
            { label: "Produtos Ativos", value: "0", color: "blue-500", icon: Store },
            { label: "Taxa Conversão", value: "0%", color: "green-500", icon: TrendingUp },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-4 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 text-${stat.color}`} />
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <div className={`text-2xl font-bold text-${stat.color}`}>
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
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
                
                <div className="relative bg-card border border-border rounded-xl p-6 hover:border-secondary/50 transition-all group-hover:scale-105 h-full">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-1">
                      {feature.description}
                    </p>
                    {feature.soon && (
                      <span className="inline-block mt-2 text-xs text-secondary font-semibold">
                        Em breve
                      </span>
                    )}
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
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 shadow-lg shadow-secondary/30"
          >
            Começar a Vender
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Lojista;
