import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, MapPin } from 'lucide-react';
import { useViaCep, AddressData } from '@/hooks/useViaCep';

interface AddressFormProps {
  onAddressFound?: (address: AddressData) => void;
  initialData?: Partial<AddressData>;
  className?: string;
}

export const AddressForm = ({ onAddressFound, initialData, className }: AddressFormProps) => {
  const [cep, setCep] = useState(initialData?.cep || '');
  const [manualMode, setManualMode] = useState(false);
  const { address, loading, error, fetchAddress, clearAddress } = useViaCep();

  const [formData, setFormData] = useState<Partial<AddressData>>({
    logradouro: initialData?.logradouro || '',
    complemento: initialData?.complemento || '',
    bairro: initialData?.bairro || '',
    localidade: initialData?.localidade || '',
    uf: initialData?.uf || '',
  });

  // Update form when address is found
  useEffect(() => {
    if (address) {
      setFormData({
        logradouro: address.logradouro,
        complemento: address.complemento,
        bairro: address.bairro,
        localidade: address.localidade,
        uf: address.uf,
      });
      onAddressFound?.(address);
    }
  }, [address, onAddressFound]);

  const handleCepChange = (value: string) => {
    // Remove non-numeric characters
    const cleanValue = value.replace(/\D/g, '');
    setCep(cleanValue);

    // Auto-fetch when CEP is complete
    if (cleanValue.length === 8) {
      fetchAddress(cleanValue);
    } else {
      clearAddress();
      setFormData({
        logradouro: '',
        complemento: '',
        bairro: '',
        localidade: '',
        uf: '',
      });
    }
  };

  const handleManualToggle = () => {
    setManualMode(!manualMode);
    if (!manualMode) {
      clearAddress();
    }
  };

  const formatCep = (value: string) => {
    // Format as XXXXX-XXX
    return value.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Endereço
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleManualToggle}
        >
          {manualMode ? 'Buscar por CEP' : 'Preencher Manualmente'}
        </Button>
      </div>

      {!manualMode && (
        <div className="space-y-2">
          <Label htmlFor="cep">CEP</Label>
          <div className="relative">
            <Input
              id="cep"
              placeholder="00000-000"
              value={formatCep(cep)}
              onChange={(e) => handleCepChange(e.target.value)}
              maxLength={9}
              className="pr-10"
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-primary" />
            )}
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="logradouro">Logradouro</Label>
          <Input
            id="logradouro"
            placeholder="Rua, Avenida, etc."
            value={formData.logradouro || ''}
            onChange={(e) => setFormData({ ...formData, logradouro: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="numero">Número</Label>
          <Input
            id="numero"
            placeholder="123"
            type="text"
          />
        </div>

        <div>
          <Label htmlFor="complemento">Complemento</Label>
          <Input
            id="complemento"
            placeholder="Apto, Sala, etc."
            value={formData.complemento || ''}
            onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="bairro">Bairro</Label>
          <Input
            id="bairro"
            placeholder="Centro"
            value={formData.bairro || ''}
            onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="cidade">Cidade</Label>
          <Input
            id="cidade"
            placeholder="São Paulo"
            value={formData.localidade || ''}
            onChange={(e) => setFormData({ ...formData, localidade: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="estado">Estado</Label>
          <Input
            id="estado"
            placeholder="SP"
            maxLength={2}
            value={formData.uf || ''}
            onChange={(e) => setFormData({ ...formData, uf: e.target.value.toUpperCase() })}
          />
        </div>
      </div>
    </div>
  );
};
