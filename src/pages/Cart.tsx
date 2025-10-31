import PageHeader from "@/components/PageHeader";
import { Cart } from "@/components/Cart";

const CartPage = () => {
  const handleCheckout = () => {
    // TODO: Implementar checkout
    alert('Funcionalidade de checkout será implementada em breve!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950">
      <div className="container mx-auto px-4 py-8">
        <PageHeader />
        <Cart onCheckout={handleCheckout} />
      </div>
    </div>
  );
};

export default CartPage;
