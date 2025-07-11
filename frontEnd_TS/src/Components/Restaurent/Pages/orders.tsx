import { useState, useEffect } from "react";
import type {
  Clock,
  CheckCircle,
  XCircle,

  Search,

  Eye,
  DollarSign,
  Users,
  TrendingUp,
 
  MapPin,

  ChefHat,
  Truck,
  Package,
  RefreshCw,
  Edit3,
  Bell,
  Star,
  LucideIcon,
} from "lucide-react";

// Type definitions
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  orderType: 'dine-in' | 'pickup' | 'delivery';
  createdAt: string;
  estimatedTime: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
}

interface StatusConfig {
  color: string;
  label: string;
  icon: LucideIcon;
}

interface OrderTypeConfig {
  color: string;
  label: string;
  icon: LucideIcon;
}

interface OrderModalProps {
  order: Order | null;
  onClose: () => void;
}

function OrdersPage() {
  // Mock data - replace with your actual data fetching
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "John Doe",
      customerPhone: "+1 234-567-8900",
      customerAddress: "123 Main St, City, State 12345",
      items: [
        { name: "Truffle Risotto", quantity: 2, price: 32.99 },
        { name: "Chocolate Soufflé", quantity: 1, price: 14.99 },
      ],
      totalAmount: 80.97,
      status: "pending",
      orderType: "delivery",
      createdAt: "2025-07-01T10:30:00Z",
      estimatedTime: 45,
      paymentStatus: "paid",
    },
    {
      id: "ORD-002",
      customerName: "Jane Smith",
      customerPhone: "+1 234-567-8901",
      customerAddress: "456 Oak Ave, City, State 12345",
      items: [
        { name: "Grilled Salmon", quantity: 1, price: 28.99 },
        { name: "Caesar Salad", quantity: 1, price: 12.99 },
      ],
      totalAmount: 41.98,
      status: "preparing",
      orderType: "pickup",
      createdAt: "2025-07-01T11:15:00Z",
      estimatedTime: 25,
      paymentStatus: "paid",
    },
    {
      id: "ORD-003",
      customerName: "Mike Johnson",
      customerPhone: "+1 234-567-8902",
      customerAddress: "789 Pine St, City, State 12345",
      items: [
        { name: "Margherita Pizza", quantity: 3, price: 18.99 },
      ],
      totalAmount: 56.97,
      status: "ready",
      orderType: "delivery",
      createdAt: "2025-07-01T09:45:00Z",
      estimatedTime: 0,
      paymentStatus: "paid",
    },
    {
      id: "ORD-004",
      customerName: "Sarah Wilson",
      customerPhone: "+1 234-567-8903",
      customerAddress: "321 Elm St, City, State 12345",
      items: [
        { name: "Beef Burger", quantity: 2, price: 15.99 },
        { name: "French Fries", quantity: 2, price: 6.99 },
      ],
      totalAmount: 45.96,
      status: "completed",
      orderType: "dine-in",
      createdAt: "2025-07-01T08:30:00Z",
      estimatedTime: 0,
      paymentStatus: "paid",
    },
  ]);

  const [activeTab, setActiveTab] = useState<string>("all-orders");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);

  // Order status configuration
  const statusConfig: Record<Order['status'], StatusConfig> = {
    pending: { color: "yellow", label: "Pending", icon: Clock },
    preparing: { color: "blue", label: "Preparing", icon: ChefHat },
    ready: { color: "green", label: "Ready", icon: CheckCircle },
    completed: { color: "gray", label: "Completed", icon: Package },
    cancelled: { color: "red", label: "Cancelled", icon: XCircle },
  };

  const orderTypeConfig: Record<Order['orderType'], OrderTypeConfig> = {
    "dine-in": { color: "purple", label: "Dine In", icon: Users },
    pickup: { color: "orange", label: "Pickup", icon: Package },
    delivery: { color: "blue", label: "Delivery", icon: Truck },
  };

  // Handle order status update
  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm);
    const matchesStatus = !filterStatus || order.status === filterStatus;
    const matchesType = !filterType || order.orderType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate statistics
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.totalAmount, 0) / orders.length : 0,
  };

  // Format time ago
  const timeAgo = (date) => {
    const now = new Date();
    const orderDate = new Date(date);
    const diffInMinutes = Math.floor((now - orderDate) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Order details modal
  const OrderModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${statusConfig[order.status]?.color}-100 text-${statusConfig[order.status]?.color}-800`}>
                    {statusConfig[order.status]?.label}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-semibold">{order.customerName}</p>
                <p className="text-sm text-gray-600">{order.customerPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Order Type</p>
                <div className="flex items-center space-x-2">
                  {React.createElement(orderTypeConfig[order.orderType].icon, { size: 16 })}
                  <span className="font-semibold">{orderTypeConfig[order.orderType]?.label}</span>
                </div>
              </div>
            </div>

            {/* Address for delivery */}
            {order.orderType === 'delivery' && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Delivery Address</p>
                <div className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                  <MapPin size={16} className="text-gray-400 mt-1" />
                  <p className="text-sm">{order.customerAddress}</p>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div>
              <p className="text-sm text-gray-500 mb-3">Order Items</p>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">Total Amount</p>
                <p className="text-2xl font-bold text-red-600">${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            {/* Status Update Buttons */}
            <div className="flex space-x-2">
              {order.status === 'pending' && (
                <button
                  onClick={() => handleStatusUpdate(order.id, 'preparing')}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Preparing
                </button>
              )}
              {order.status === 'preparing' && (
                <button
                  onClick={() => handleStatusUpdate(order.id, 'ready')}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Mark Ready
                </button>
              )}
              {order.status === 'ready' && (
                <button
                  onClick={() => handleStatusUpdate(order.id, 'completed')}
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Orders Management
              </h1>
              <p className="text-gray-600 text-lg">
                Manage and track your restaurant orders
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300">
                <RefreshCw className="text-red-600" size={20} />
                <span className="font-medium">Refresh</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            {[
              { id: "all-orders", label: "All Orders", icon: Eye },
              { id: "pending", label: "Pending", icon: Clock },
              { id: "preparing", label: "Preparing", icon: ChefHat },
              { id: "ready", label: "Ready", icon: CheckCircle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-red-600 shadow-md transform scale-105"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Orders",
              value: stats.totalOrders,
              icon: Package,
              color: "blue",
            },
            {
              label: "Pending Orders",
              value: stats.pendingOrders,
              icon: Clock,
              color: "yellow",
            },
            {
              label: "Total Revenue",
              value: `$${stats.totalRevenue.toFixed(2)}`,
              icon: DollarSign,
              color: "green",
            },
            {
              label: "Avg Order Value",
              value: `$${stats.avgOrderValue.toFixed(2)}`,
              icon: TrendingUp,
              color: "purple",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                  <stat.icon
                    className={`text-${stat.color}-600`}
                    size={24}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search orders by ID, customer name, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">All Types</option>
                <option value="dine-in">Dine In</option>
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredOrders.map((order) => {
              const StatusIcon = statusConfig[order.status]?.icon;
              const TypeIcon = orderTypeConfig[order.orderType]?.icon;
              
              return (
                <div
                  key={order.id}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowOrderModal(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-xl bg-${statusConfig[order.status]?.color}-100 flex items-center justify-center`}>
                          <StatusIcon className={`text-${statusConfig[order.status]?.color}-600`} size={24} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${statusConfig[order.status]?.color}-100 text-${statusConfig[order.status]?.color}-800`}>
                            {statusConfig[order.status]?.label}
                          </span>
                          <div className="flex items-center space-x-1">
                            <TypeIcon size={14} className="text-gray-500" />
                            <span className="text-sm text-gray-500">{orderTypeConfig[order.orderType]?.label}</span>
                          </div>
                        </div>
                        <p className="text-gray-600">{order.customerName} • {order.customerPhone}</p>
                        <p className="text-sm text-gray-500">{order.items.length} items • {timeAgo(order.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      {order.estimatedTime > 0 && (
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Est. Time</p>
                          <p className="text-lg font-bold text-orange-600">{order.estimatedTime}m</p>
                        </div>
                      )}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">${order.totalAmount.toFixed(2)}</p>
                        <p className="text-sm text-green-600">Paid</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                            setShowOrderModal(true);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Modal */}
        {showOrderModal && (
          <OrderModal
            order={selectedOrder}
            onClose={() => {
              setShowOrderModal(false);
              setSelectedOrder(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default OrdersPage;