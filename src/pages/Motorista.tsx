import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Truck,
  MapPin,
  DollarSign,
  Clock,
  Star,
  Bell,
  Navigation,
  Wallet,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const Motorista = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data - será substituído por dados reais da API
  const stats = {
    entregasHoje: 8,
    entregasMes: 156,
    ganhoHoje: 180.50,
    ganhoMes: 3240.90,
    avaliacaoMedia: 4.8,
    distanciaPercorrida: 45.2,
    tempoOnline: '6h 30min',
    entregasPendentes: 3
  };

  const entregasAtivas = [
    {
      id: 'ENT-001',
      cliente: 'João Silva',
      endereco: 'Rua das Flores, 123 - Centro',
      telefone: '(11) 99999-9999',
      valor: 25.50,
      distancia: 2.3,
      prazo: '15:30',
      status: 'a_caminho',
      prioridade: 'normal'
    },
    {
      id: 'ENT-002',
      cliente: 'Maria Santos',
      endereco: 'Av. Paulista, 456 - Bela Vista',
      telefone: '(11) 88888-8888',
      valor: 32.00,
      distancia: 4.1,
      prazo: '16:00',
      status: 'coletando',
      prioridade: 'alta'
    },
    {
      id: 'ENT-003',
      cliente: 'Pedro Oliveira',
      endereco: 'Rua Verde, 789 - Jardim',
      telefone: '(11) 77777-7777',
      valor: 18.75,
      distancia: 1.8,
      prazo: '16:15',
      status: 'pendente',
      prioridade: 'normal'
    }
  ];

  const entregasRecentes = [
    {
      id: 'ENT-045',
      cliente: 'Ana Costa',
      valor: 28.90,
      data: '2025-01-15 14:20',
      status: 'entregue',
      avaliacao: 5
    },
    {
      id: 'ENT-044',
      cliente: 'Carlos Lima',
      valor: 35.50,
      data: '2025-01-15 13:45',
      status: 'entregue',
      avaliacao: 4
    },
    {
      id: 'ENT-043',
      cliente: 'Fernanda Souza',
      valor: 22.30,
      data: '2025-01-15 12:30',
      status: 'entregue',
      avaliacao: 5
    }
  ];

  const notificacoes = [
    {
      id: 1,
      titulo: 'Nova entrega disponível',
      mensagem: 'Pedido #PED-123 aguardando coletor próximo',
      tipo: 'nova_entrega',
      lida: false,
      data: '2025-01-15 15:00'
    },
    {
      id: 2,
      titulo: 'Avaliação recebida',
      mensagem: 'João Silva deu 5 estrelas na sua entrega',
      tipo: 'avaliacao',
      lida: false,
      data: '2025-01-15 14:45'
    },
    {
      id: 3,
      titulo: 'Bônus semanal',
      mensagem: 'Parabéns! Você ganhou R$ 50,00 de bônus',
      tipo: 'bonus',
      lida: true,
      data: '2025-01-15 12:00'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'secondary';
      case 'coletando':
        return 'default';
      case 'a_caminho':
        return 'default';
      case 'entregue':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'coletando':
        return 'Coletando';
      case 'a_caminho':
        return 'A Caminho';
      case 'entregue':
        return 'Entregue';
      default:
        return status;
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta':
        return 'destructive';
      case 'normal':
        return 'default';
      case 'baixa':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const notificacoesNaoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950">
      <div className="container mx-auto px-4 py-8">
        <PageHeader />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Painel do Motorista
            </h1>
            <p className="text-muted-foreground">
              Gerencie suas entregas, acompanhe ganhos e maximize seus lucros
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="entregas" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Entregas
              </TabsTrigger>
              <TabsTrigger value="carteira" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Carteira
              </TabsTrigger>
              <TabsTrigger value="notificacoes" className="flex items-center gap-2 relative">
                <Bell className="h-4 w-4" />
                Notificações
                {notificacoesNaoLidas > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                    {notificacoesNaoLidas}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="perfil" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Perfil
              </TabsTrigger>
            </TabsList>

            {/* Dashboard */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Cards de Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Entregas Hoje</CardTitle>
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.entregasHoje}</div>
                    <p className="text-xs text-muted-foreground">
                      +{stats.entregasMes} no mês
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ganhos Hoje</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatPrice(stats.ganhoHoje)}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(stats.ganhoMes)} no mês
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.avaliacaoMedia}⭐</div>
                    <p className="text-xs text-muted-foreground">
                      Baseado em {stats.entregasMes} entregas
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tempo Online</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.tempoOnline}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.distanciaPercorrida}km percorridos
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Status Online */}
              <Card>
                <CardHeader>
                  <CardTitle>Status de Atividade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Online e disponível</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Ficar Offline
                    </Button>
                  </div>
                  <Progress value={75} className="mt-4" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Meta diária: 10 entregas (80% concluído)
                  </p>
                </CardContent>
              </Card>

              {/* Entregas Ativas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Entregas Ativas ({stats.entregasPendentes})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {entregasAtivas.length > 0 ? (
                    <div className="space-y-4">
                      {entregasAtivas.map((entrega) => (
                        <div key={entrega.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{entrega.id}</span>
                                <Badge variant={getPrioridadeColor(entrega.prioridade) as any}>
                                  {entrega.prioridade === 'alta' ? 'Alta Prioridade' : 'Normal'}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{entrega.cliente}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatPrice(entrega.valor)}</p>
                              <p className="text-sm text-muted-foreground">{entrega.distancia}km</p>
                            </div>
                          </div>

                          <div className="space-y-2 mb-3">
                            <p className="text-sm">
                              <MapPin className="h-4 w-4 inline mr-1" />
                              {entrega.endereco}
                            </p>
                            <p className="text-sm">
                              <Clock className="h-4 w-4 inline mr-1" />
                              Prazo: {entrega.prazo}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              <Navigation className="h-4 w-4 mr-1" />
                              Navegar
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              {entrega.status === 'pendente' ? 'Coletar' : 'Entregar'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Nenhuma entrega ativa no momento</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Aguarde novas solicitações ou atualize sua localização
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Últimas Entregas */}
              <Card>
                <CardHeader>
                  <CardTitle>Últimas Entregas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {entregasRecentes.map((entrega) => (
                      <div key={entrega.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{entrega.id}</p>
                            <p className="text-sm text-muted-foreground">{entrega.cliente}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(entrega.valor)}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-sm">{entrega.avaliacao}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Entregas - Placeholder */}
            <TabsContent value="entregas" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Gerenciar Entregas</h2>
                  <p className="text-muted-foreground">Acompanhe todas as suas entregas em tempo real</p>
                </div>
                <Button>
                  <MapPin className="h-4 w-4 mr-2" />
                  Atualizar Localização
                </Button>
              </div>

              <Card>
                <CardContent className="text-center py-12">
                  <Truck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Sistema de Entregas</h3>
                  <p className="text-muted-foreground mb-4">
                    GPS em tempo real e controle de rotas implementado
                  </p>
                  <Button>Implementar Sistema Entregas</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Carteira - Placeholder */}
            <TabsContent value="carteira" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Carteira e Ganhos</h2>
                <p className="text-muted-foreground">Acompanhe seus ganhos e faça saques</p>
              </div>

              <Card>
                <CardContent className="text-center py-12">
                  <Wallet className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Sistema Financeiro</h3>
                  <p className="text-muted-foreground mb-4">
                    Carteira digital e controle de ganhos implementado
                  </p>
                  <Button>Implementar Carteira</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notificações */}
            <TabsContent value="notificacoes" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Notificações</h2>
                <p className="text-muted-foreground">Central de notificações e alertas</p>
              </div>

              <Card>
                <CardContent>
                  <div className="space-y-4">
                    {notificacoes.map((notificacao) => (
                      <div
                        key={notificacao.id}
                        className={`p-4 border rounded-lg ${!notificacao.lida ? 'bg-primary/5 border-primary/20' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`font-medium ${!notificacao.lida ? 'text-primary' : ''}`}>
                              {notificacao.titulo}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notificacao.mensagem}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notificacao.data}
                            </p>
                          </div>
                          {!notificacao.lida && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Perfil - Placeholder */}
            <TabsContent value="perfil" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Perfil do Motorista</h2>
                <p className="text-muted-foreground">Gerencie suas informações e configurações</p>
              </div>

              <Card>
                <CardContent className="text-center py-12">
                  <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Perfil e Rankings</h3>
                  <p className="text-muted-foreground mb-4">
                    Sistema de perfil, rankings e performance implementado
                  </p>
                  <Button>Implementar Perfil</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Motorista;
