import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  LayoutDashboard,
  Package,
  Users,
  Truck,
  Settings,
  BarChart3,
  Shield,
  TrendingUp,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data - será substituído por dados reais da API
  const stats = {
    pedidosHoje: 145,
    motoristasAtivos: 23,
    vendasHoje: 12890.50,
    taxaEntrega: 94.2,
    pedidosPendentes: 12,
    motoristasOffline: 7,
    produtosAtivos: 234,
    usuariosAtivos: 1567,
    receitaMes: 234567.89,
    crescimentoMes: 12.5
  };

  const pedidosRecentes = [
    {
      id: 'PED-001',
      cliente: 'João Silva',
      motorista: 'Carlos Santos',
      valor: 45.90,
      status: 'entregue',
      tempoEstimado: '25 min',
      tempoReal: '22 min',
      data: '2025-01-15 14:30'
    },
    {
      id: 'PED-002',
      cliente: 'Maria Santos',
      motorista: 'Ana Costa',
      valor: 32.50,
      status: 'a_caminho',
      tempoEstimado: '18 min',
      tempoReal: null,
      data: '2025-01-15 14:25'
    },
    {
      id: 'PED-003',
      cliente: 'Pedro Oliveira',
      motorista: null,
      valor: 28.75,
      status: 'pendente',
      tempoEstimado: '30 min',
      tempoReal: null,
      data: '2025-01-15 14:20'
    }
  ];

  const motoristasAtivos = [
    {
      id: 'M001',
      nome: 'Carlos Santos',
      status: 'ativo',
      entregasHoje: 8,
      avaliacao: 4.8,
      localizacao: 'Centro, São Paulo'
    },
    {
      id: 'M002',
      nome: 'Ana Costa',
      status: 'ativo',
      entregasHoje: 6,
      avaliacao: 4.9,
      localizacao: 'Jardins, São Paulo'
    },
    {
      id: 'M003',
      nome: 'Roberto Lima',
      status: 'offline',
      entregasHoje: 0,
      avaliacao: 4.6,
      localizacao: 'Desconhecida'
    }
  ];

  const alertasSistema = [
    {
      tipo: 'erro',
      titulo: 'Motorista sem localização',
      mensagem: 'Roberto Lima está offline há mais de 1 hora',
      severidade: 'alta',
      data: '2025-01-15 13:45'
    },
    {
      tipo: 'aviso',
      titulo: 'Produto com estoque baixo',
      mensagem: 'Smartphone Samsung A54 tem apenas 3 unidades',
      severidade: 'media',
      data: '2025-01-15 12:30'
    },
    {
      tipo: 'info',
      titulo: 'Novo motorista aprovado',
      mensagem: 'Fernanda Silva foi aprovada no sistema',
      severidade: 'baixa',
      data: '2025-01-15 11:15'
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
      case 'entregue':
        return 'default';
      case 'a_caminho':
        return 'secondary';
      case 'pendente':
        return 'destructive';
      case 'ativo':
        return 'default';
      case 'offline':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'entregue':
        return 'Entregue';
      case 'a_caminho':
        return 'A Caminho';
      case 'pendente':
        return 'Pendente';
      case 'ativo':
        return 'Ativo';
      case 'offline':
        return 'Offline';
      default:
        return status;
    }
  };

  const getSeveridadeColor = (severidade: string) => {
    switch (severidade) {
      case 'alta':
        return 'destructive';
      case 'media':
        return 'secondary';
      case 'baixa':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getSeveridadeIcon = (severidade: string) => {
    switch (severidade) {
      case 'alta':
        return <XCircle className="h-4 w-4" />;
      case 'media':
        return <AlertTriangle className="h-4 w-4" />;
      case 'baixa':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950">
      <div className="container mx-auto px-4 py-8">
        <PageHeader />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground">
              Gerencie todo o sistema ACR Delivery em tempo real
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="produtos" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Produtos
              </TabsTrigger>
              <TabsTrigger value="pedidos" className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="motoristas" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Motoristas
              </TabsTrigger>
              <TabsTrigger value="relatorios" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Relatórios
              </TabsTrigger>
              <TabsTrigger value="config" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configurações
              </TabsTrigger>
            </TabsList>

            {/* Dashboard */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Cards de Estatísticas Principais */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pedidos Hoje</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.pedidosHoje}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.pedidosPendentes} pendentes
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Motoristas Ativos</CardTitle>
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.motoristasAtivos}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.motoristasOffline} offline
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Vendas Hoje</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatPrice(stats.vendasHoje)}</div>
                    <p className="text-xs text-muted-foreground">
                      +{stats.crescimentoMes}% este mês
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Taxa de Entrega</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.taxaEntrega}%</div>
                    <Progress value={stats.taxaEntrega} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              {/* Alertas do Sistema */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Alertas do Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alertasSistema.map((alerta, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className={`p-2 rounded-full ${getSeveridadeColor(alerta.severidade) === 'destructive' ? 'bg-destructive/10' : 'bg-muted'}`}>
                          {getSeveridadeIcon(alerta.severidade)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{alerta.titulo}</h4>
                          <p className="text-sm text-muted-foreground">{alerta.mensagem}</p>
                          <p className="text-xs text-muted-foreground mt-1">{alerta.data}</p>
                        </div>
                        <Badge variant={getSeveridadeColor(alerta.severidade) as any}>
                          {alerta.severidade}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pedidos Recentes */}
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pedidosRecentes.map((pedido) => (
                      <div key={pedido.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Package className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{pedido.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {pedido.cliente} • {pedido.motorista || 'Sem motorista'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(pedido.valor)}</p>
                          <Badge variant={getStatusColor(pedido.status) as any} className="mt-1">
                            {getStatusLabel(pedido.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Motoristas Ativos */}
              <Card>
                <CardHeader>
                  <CardTitle>Status dos Motoristas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {motoristasAtivos.map((motorista) => (
                      <div key={motorista.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${motorista.status === 'ativo' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <div>
                            <p className="font-medium">{motorista.nome}</p>
                            <p className="text-sm text-muted-foreground">
                              {motorista.entregasHoje} entregas hoje • ⭐ {motorista.avaliacao}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={getStatusColor(motorista.status) as any}>
                            {getStatusLabel(motorista.status)}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {motorista.localizacao}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Produtos - Placeholder */}
            <TabsContent value="produtos" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Gerenciamento de Produtos</h2>
                  <p className="text-muted-foreground">Controle completo do catálogo e estoque</p>
                </div>
                <Button>
                  <Package className="h-4 w-4 mr-2" />
                  Gerenciar Produtos
                </Button>
              </div>

              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Sistema de Gestão de Produtos</h3>
                  <p className="text-muted-foreground mb-4">
                    CRUD completo, controle de estoque e preços implementado
                  </p>
                  <Button>Implementar Gestão Produtos</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pedidos - Placeholder */}
            <TabsContent value="pedidos" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Controle de Pedidos</h2>
                <p className="text-muted-foreground">Monitoramento completo de todas as entregas</p>
              </div>

              <Card>
                <CardContent className="text-center py-12">
                  <Truck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Sistema de Controle de Pedidos</h3>
                  <p className="text-muted-foreground mb-4">
                    Dashboard de monitoramento e gestão de entregas implementado
                  </p>
                  <Button>Implementar Controle Pedidos</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Motoristas - Placeholder */}
            <TabsContent value="motoristas" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Gestão de Motoristas</h2>
                <p className="text-muted-foreground">Aprovação, monitoramento e controle de motoristas</p>
              </div>

              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Sistema de Gestão de Motoristas</h3>
                  <p className="text-muted-foreground mb-4">
                    Aprovação, rankings e controle de performance implementado
                  </p>
                  <Button>Implementar Gestão Motoristas</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Relatórios - Placeholder */}
            <TabsContent value="relatorios" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Relatórios e Analytics</h2>
                <p className="text-muted-foreground">Insights detalhados e métricas de performance</p>
              </div>

              <Card>
                <CardContent className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Sistema de Relatórios</h3>
                  <p className="text-muted-foreground mb-4">
                    Analytics completo, dashboards e exportação implementado
                  </p>
                  <Button>Implementar Relatórios</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configurações - Placeholder */}
            <TabsContent value="config" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Configurações do Sistema</h2>
                <p className="text-muted-foreground">Frete, promoções, políticas e configurações gerais</p>
              </div>

              <Card>
                <CardContent className="text-center py-12">
                  <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Configurações Avançadas</h3>
                  <p className="text-muted-foreground mb-4">
                    Sistema de frete, promoções e políticas LGPD implementado
                  </p>
                  <Button>Implementar Configurações</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
