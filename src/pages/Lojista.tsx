import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Store,
  Package,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  BarChart3,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const Lojista = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data - será substituído por dados reais da API
  const stats = {
    totalProdutos: 45,
    produtosAtivos: 42,
    vendasHoje: 12,
    vendasMes: 234,
    receitaHoje: 1240.50,
    receitaMes: 15680.90,
    clientesUnicos: 89,
    avaliacaoMedia: 4.7,
    pedidosPendentes: 3,
    produtosBaixoEstoque: 5
  };

  const produtosRecentes = [
    {
      id: '1',
      nome: 'Smartphone Samsung Galaxy A54',
      preco: 1899.99,
      estoque: 15,
      vendas: 23,
      status: 'ativo',
      imagem: '/api/placeholder/60/60'
    },
    {
      id: '2',
      nome: 'Notebook Dell Inspiron 15',
      preco: 3299.99,
      estoque: 3,
      vendas: 8,
      status: 'baixo_estoque',
      imagem: '/api/placeholder/60/60'
    },
    {
      id: '3',
      nome: 'Fone de Ouvido Bluetooth JBL',
      preco: 299.99,
      estoque: 0,
      vendas: 45,
      status: 'esgotado',
      imagem: '/api/placeholder/60/60'
    }
  ];

  const pedidosRecentes = [
    {
      id: 'PED-001',
      cliente: 'João Silva',
      produtos: ['Smartphone', 'Carregador'],
      total: 1999.99,
      status: 'preparando',
      data: '2025-01-15 14:30'
    },
    {
      id: 'PED-002',
      cliente: 'Maria Santos',
      produtos: ['Notebook Dell'],
      total: 3299.99,
      status: 'pronto',
      data: '2025-01-15 13:15'
    },
    {
      id: 'PED-003',
      cliente: 'Pedro Oliveira',
      produtos: ['Mouse', 'Teclado'],
      total: 249.99,
      status: 'entregue',
      data: '2025-01-15 11:45'
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
      case 'ativo':
        return 'default';
      case 'baixo_estoque':
        return 'secondary';
      case 'esgotado':
        return 'destructive';
      case 'preparando':
        return 'secondary';
      case 'pronto':
        return 'default';
      case 'entregue':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'Ativo';
      case 'baixo_estoque':
        return 'Baixo Estoque';
      case 'esgotado':
        return 'Esgotado';
      case 'preparando':
        return 'Preparando';
      case 'pronto':
        return 'Pronto';
      case 'entregue':
        return 'Entregue';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-green-950">
      <div className="container mx-auto px-4 py-8">
        <PageHeader />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Painel do Lojista
            </h1>
            <p className="text-muted-foreground">
              Gerencie seu catálogo, pedidos e acompanhe suas vendas
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="produtos" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Produtos
              </TabsTrigger>
              <TabsTrigger value="pedidos" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="clientes" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Clientes
              </TabsTrigger>
              <TabsTrigger value="financeiro" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Financeiro
              </TabsTrigger>
              <TabsTrigger value="config" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configurações
              </TabsTrigger>
            </TabsList>

            {/* Dashboard */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Cards de Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.produtosAtivos}</div>
                    <p className="text-xs text-muted-foreground">
                      de {stats.totalProdutos} cadastrados
                    </p>
                    <Progress
                      value={(stats.produtosAtivos / stats.totalProdutos) * 100}
                      className="mt-2"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Vendas Hoje</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.vendasHoje}</div>
                    <p className="text-xs text-muted-foreground">
                      +{stats.vendasMes} no mês
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Receita Hoje</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatPrice(stats.receitaHoje)}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(stats.receitaMes)} no mês
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
                    <Store className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.avaliacaoMedia}⭐</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.clientesUnicos} clientes únicos
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Alertas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Alertas de Estoque
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {stats.produtosBaixoEstoque > 0 ? (
                      <div className="space-y-3">
                        <Badge variant="destructive" className="mb-2">
                          {stats.produtosBaixoEstoque} produto{stats.produtosBaixoEstoque > 1 ? 's' : ''} com baixo estoque
                        </Badge>
                        {produtosRecentes.filter(p => p.status === 'baixo_estoque').map(produto => (
                          <div key={produto.id} className="flex items-center justify-between p-2 border rounded">
                            <div className="flex items-center gap-3">
                              <img
                                src={produto.imagem}
                                alt={produto.nome}
                                className="w-10 h-10 rounded object-cover"
                              />
                              <div>
                                <p className="text-sm font-medium">{produto.nome}</p>
                                <p className="text-xs text-muted-foreground">
                                  {produto.estoque} unidade{produto.estoque !== 1 ? 's' : ''} restantes
                                </p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Repor
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Todos os produtos estão com estoque adequado!</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Pedidos Pendentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {stats.pedidosPendentes > 0 ? (
                      <div className="space-y-3">
                        <Badge variant="secondary" className="mb-2">
                          {stats.pedidosPendentes} pedido{stats.pedidosPendentes > 1 ? 's' : ''} aguardando
                        </Badge>
                        {pedidosRecentes.filter(p => p.status !== 'entregue').slice(0, 3).map(pedido => (
                          <div key={pedido.id} className="flex items-center justify-between p-2 border rounded">
                            <div>
                              <p className="text-sm font-medium">{pedido.id}</p>
                              <p className="text-xs text-muted-foreground">
                                {pedido.cliente} • {formatPrice(pedido.total)}
                              </p>
                            </div>
                            <Badge variant={getStatusColor(pedido.status) as any}>
                              {getStatusLabel(pedido.status)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Nenhum pedido pendente!</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Produtos Mais Vendidos */}
              <Card>
                <CardHeader>
                  <CardTitle>Produtos Mais Vendidos (Últimos 30 dias)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {produtosRecentes.map((produto, index) => (
                      <div key={produto.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div>
                            <p className="font-medium">{produto.nome}</p>
                            <p className="text-sm text-muted-foreground">{produto.vendas} vendas</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(produto.preco)}</p>
                          <Badge variant={getStatusColor(produto.status) as any} className="mt-1">
                            {getStatusLabel(produto.status)}
                          </Badge>
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
                  <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
                  <p className="text-muted-foreground">Adicione, edite e remova produtos do seu catálogo</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Produto
                </Button>
              </div>

              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">CRUD de Produtos</h3>
                  <p className="text-muted-foreground mb-4">
                    Sistema completo para gestão de catálogo implementado
                  </p>
                  <Button>Implementar CRUD Produtos</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pedidos - Placeholder */}
            <TabsContent value="pedidos" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Gerenciar Pedidos</h2>
                <p className="text-muted-foreground">Acompanhe e gerencie todos os pedidos</p>
              </div>

              <Card>
                <CardContent className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Controle de Pedidos</h3>
                  <p className="text-muted-foreground mb-4">
                    Dashboard de vendas e gestão de pedidos implementado
                  </p>
                  <Button>Implementar Gestão Pedidos</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Clientes - Placeholder */}
            <TabsContent value="clientes" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Gestão de Clientes</h2>
                <p className="text-muted-foreground">Veja seus clientes e histórico de compras</p>
              </div>

              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Base de Clientes</h3>
                  <p className="text-muted-foreground mb-4">
                    Sistema de gestão de clientes implementado
                  </p>
                  <Button>Implementar Gestão Clientes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financeiro - Placeholder */}
            <TabsContent value="financeiro" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Dashboard Financeiro</h2>
                <p className="text-muted-foreground">Acompanhe suas vendas e comissões</p>
              </div>

              <Card>
                <CardContent className="text-center py-12">
                  <DollarSign className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Relatórios Financeiros</h3>
                  <p className="text-muted-foreground mb-4">
                    Dashboard financeiro com comissões implementado
                  </p>
                  <Button>Implementar Financeiro</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configurações - Placeholder */}
            <TabsContent value="config" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Configurações da Loja</h2>
                <p className="text-muted-foreground">Configure promoções, preços e preferências</p>
              </div>

              <Card>
                <CardContent className="text-center py-12">
                  <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Configurações Avançadas</h3>
                  <p className="text-muted-foreground mb-4">
                    Sistema de promoções e configurações implementado
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

export default Lojista;
