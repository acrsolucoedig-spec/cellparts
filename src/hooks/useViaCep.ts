import { useState } from 'react';
import axios from 'axios';

export interface AddressData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface UseViaCepReturn {
  address: AddressData | null;
  loading: boolean;
  error: string | null;
  fetchAddress: (cep: string) => Promise<void>;
  clearAddress: () => void;
}

export const useViaCep = (backendUrl: string = 'http://localhost:3000'): UseViaCepReturn => {
  const [address, setAddress] = useState<AddressData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddress = async (cep: string) => {
    // Remove any non-numeric characters
    const cleanCep = cep.replace(/\D/g, '');

    // Validate CEP format
    if (cleanCep.length !== 8) {
      setError('CEP deve conter exatamente 8 dígitos');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${backendUrl}/viacep/${cleanCep}`);
      const data = response.data;

      setAddress({
        cep: data.cep,
        logradouro: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
      });
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao consultar CEP. Verifique sua conexão.');
      }
    } finally {
      setLoading(false);
    }
  };

  const clearAddress = () => {
    setAddress(null);
    setError(null);
  };

  return {
    address,
    loading,
    error,
    fetchAddress,
    clearAddress,
  };
};
