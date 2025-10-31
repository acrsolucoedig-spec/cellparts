import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import acrWings from "@/assets/acr-wings.png";
import { MiniCart } from "./MiniCart";

interface PageHeaderProps {
  showBackButton?: boolean;
}

const PageHeader = ({ showBackButton = true }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      {showBackButton ? (
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      ) : (
        <div />
      )}
      
      <div className="flex items-center gap-4">
        <MiniCart onViewFullCart={() => navigate('/cart')} />
        <div className="flex items-center gap-2">
          <img 
            src={acrWings} 
            alt="ACR" 
            className="w-8 h-8 object-contain opacity-90"
          />
          <span className="text-primary font-bold text-2xl">ACR</span>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
