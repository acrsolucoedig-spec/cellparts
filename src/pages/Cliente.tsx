import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Package, User, History } from "lucide-react";

const Cliente = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShoppingCart,
      title: "Catálogo de Produtos",
      description: "Navegue por nosso catálogo completo",
      soon: false,
    },
    {
      icon: Package,
      title: "Meus Pedidos",
      description: "Acompanhe suas entregas em tempo real",
      soon: false,
    },
    {
      icon: History,
      title: "Histórico",
      description: "Veja todas as suas compras anteriores",
      soon: false,
    },
    {
      icon: User,
      title: "Meu Perfil",
      description: "Gerencie seus dados e endereços",
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
            Portal do Cliente
          </h1>
          <p className="text-lg text-muted-foreground">
            Bem-vindo! Faça seu pedido e acompanhe sua entrega
          </p>
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
                      {feature.soon && (
                        <span className="inline-block mt-2 text-xs text-secondary font-semibold">
                          Em breve
                        </span>
                      )}
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
            Começar a Comprar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cliente;
