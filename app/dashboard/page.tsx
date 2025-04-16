'use client';

import { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
// Remove problematic chart imports

interface Order {
  batchNumber: string;
  farmName: string;
  location: string;
  product: string;
  quantity: number;
  status: string;
  expectedArrival: string;
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState<'all' | 'blueberries' | 'raspberries' | 'blackberries'>('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  
  // Current date for status calculations
  const today = new Date();
  
  // Enhanced example data
  const orders: Order[] = [
    {
      batchNumber: 'BT001',
      farmName: 'Blue Ridge Farm',
      location: 'Oregon',
      product: 'Blueberries',
      quantity: 500,
      status: 'In Transit',
      expectedArrival: '2024-03-20',
    },
    {
      batchNumber: 'BT002',
      farmName: 'Sunny Valley',
      location: 'California',
      product: 'Raspberries',
      quantity: 300,
      status: 'Delayed',
      expectedArrival: '2024-03-15',
    },
    {
      batchNumber: 'BT003',
      farmName: 'Mountain Berry Co',
      location: 'Washington',
      product: 'Blackberries',
      quantity: 450,
      status: 'In Transit',
      expectedArrival: '2024-04-11',
    },
    {
      batchNumber: 'BT004',
      farmName: 'Coastal Farms',
      location: 'Oregon',
      product: 'Blueberries',
      quantity: 800,
      status: 'Delivered',
      expectedArrival: '2024-03-18',
    },
    {
      batchNumber: 'BT005',
      farmName: 'Berry Hills',
      location: 'Oregon',
      product: 'Blueberries',
      quantity: 250,
      status: 'Delivered',
      expectedArrival: '2024-03-10',
    },
    {
      batchNumber: 'BT006',
      farmName: 'Fresh Fields',
      location: 'California',
      product: 'Blackberries',
      quantity: 180,
      status: 'Delivered',
      expectedArrival: '2024-03-05',
    },
    {
      batchNumber: 'BT007',
      farmName: 'Valley View',
      location: 'Washington',
      product: 'Raspberries',
      quantity: 420,
      status: 'In Transit',
      expectedArrival: '2024-03-25',
    },
    {
      batchNumber: 'BT008',
      farmName: 'Organic Berries',
      location: 'Oregon',
      product: 'Blueberries',
      quantity: 120,
      status: 'Delivered',
      expectedArrival: '2024-03-12',
    },
    {
      batchNumber: 'BT009',
      farmName: 'West Coast Farms',
      location: 'California',
      product: 'Raspberries',
      quantity: 350,
      status: 'Delayed',
      expectedArrival: '2024-03-17',
    },
    {
      batchNumber: 'BT010',
      farmName: 'Mountain View',
      location: 'Washington',
      product: 'Blackberries',
      quantity: 90,
      status: 'Delivered',
      expectedArrival: '2024-03-08',
    },
    {
      batchNumber: 'BT011',
      farmName: 'Pacific Growers',
      location: 'Oregon',
      product: 'Blueberries',
      quantity: 680,
      status: 'In Transit',
      expectedArrival: '2024-03-24',
    },
    {
      batchNumber: 'BT012',
      farmName: 'Fruit Valley',
      location: 'California',
      product: 'Raspberries',
      quantity: 220,
      status: 'Delivered',
      expectedArrival: '2024-03-14',
    },
  ];
  
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);

  // Enhanced alerts with batch numbers
  const alertDetails = orders.reduce((acc, order) => {
    const arrivalDate = new Date(order.expectedArrival);
    const diffDays = Math.ceil((arrivalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1 && diffDays >= 0) {
      acc.arrivingToday.push({ batchNumber: order.batchNumber, farmName: order.farmName });
    }
    if (diffDays < 0) {
      acc.delayed.push({ batchNumber: order.batchNumber, farmName: order.farmName });
    }
    if (diffDays > 1 && diffDays <= 2) {
      acc.arrivingSoon.push({ batchNumber: order.batchNumber, farmName: order.farmName });
    }
    
    return acc;
  }, { 
    arrivingToday: [] as Array<{batchNumber: string, farmName: string}>,
    delayed: [] as Array<{batchNumber: string, farmName: string}>,
    arrivingSoon: [] as Array<{batchNumber: string, farmName: string}>
  });
  
  // Additional alerts for various scenarios
  const additionalAlerts = [
    {
      type: 'info',
      title: '📊 Quality Report Ready',
      detail: 'New quality report for Farm West is now available to review',
    },
    {
      type: 'update',
      title: '🔄 System Update',
      detail: 'New tracking features will be available tomorrow',
    },
    {
      type: 'warning',
      title: '⚠️ Weather Alert',
      detail: 'Heavy rain forecast may affect deliveries in Oregon',
    }
  ]
  
  // Add state for alert expansion
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  
  // Function to toggle alert details
  const toggleAlertDetails = (alertType: string) => {
    if (expandedAlert === alertType) {
      setExpandedAlert(null);
    } else {
      setExpandedAlert(alertType);
    }
  };

  // Add an extra arriving today alert for demonstration
  alertDetails.arrivingToday.push({ batchNumber: 'BT013', farmName: 'Pacific Farms' });
  
  // Product-specific analytics
  const productAnalytics = {
    all: {
      totalBatches: 156,
      deliveredBatches: 142,
      onTimeDeliveryRate: 96.5,
      averageQualityRating: 4.8,
      totalQuantity: 18500
    },
    blueberries: {
      totalBatches: 84,
      deliveredBatches: 76,
      onTimeDeliveryRate: 98.2,
      averageQualityRating: 4.9,
      totalQuantity: 9800
    },
    raspberries: {
      totalBatches: 42,
      deliveredBatches: 38,
      onTimeDeliveryRate: 94.8,
      averageQualityRating: 4.7,
      totalQuantity: 5400
    },
    blackberries: {
      totalBatches: 30,
      deliveredBatches: 28,
      onTimeDeliveryRate: 95.5,
      averageQualityRating: 4.6,
      totalQuantity: 3300
    }
  };

  const currentAnalytics = productAnalytics[productFilter] || productAnalytics.all;

  // Update useEffect to handle product filter changes
  useEffect(() => {
    let filtered = [...orders];
    
    // Apply product filter
    if (productFilter !== 'all') {
      filtered = filtered.filter(order => 
        order.product.toLowerCase() === productFilter.toLowerCase()
      );
    }

    // Apply status filter if active
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => 
        order.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply date range filter if active
    if (dateRange.start || dateRange.end) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.expectedArrival);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;
        
        // If only start date is specified
        if (startDate && !endDate) {
          return orderDate >= startDate;
        }
        
        // If only end date is specified
        if (!startDate && endDate) {
          return orderDate <= endDate;
        }
        
        // If both dates are specified
        if (startDate && endDate) {
          return orderDate >= startDate && orderDate <= endDate;
        }
        
        return true;
      });
    }

    setFilteredOrders(filtered);
  }, [productFilter, statusFilter, dateRange]); // Updated dependencies for useEffect

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let filtered = [...orders];
    
    // Apply existing filters before search
    if (productFilter !== 'all') {
      filtered = filtered.filter(order => 
        order.product.toLowerCase() === productFilter.toLowerCase()
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => 
        order.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    // Apply date range filter
    if (dateRange.start || dateRange.end) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.expectedArrival);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;
        
        if (startDate && !endDate) {
          return orderDate >= startDate;
        }
        
        if (!startDate && endDate) {
          return orderDate <= endDate;
        }
        
        if (startDate && endDate) {
          return orderDate >= startDate && orderDate <= endDate;
        }
        
        return true;
      });
    }

    // Then apply search if there's a search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(order => 
        order.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  // Add state for new order form
  const [newOrder, setNewOrder] = useState({
    product: 'blueberries',
    quantity: 0,
    deliveryDate: '',
    location: ''
  });

  // Handle new order input changes
  const handleNewOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle new order submission
  const handleNewOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the new order to your backend
    alert(`New order placed: ${newOrder.quantity}kg of ${newOrder.product} for delivery on ${newOrder.deliveryDate} to ${newOrder.location}`);
    
    // Reset the form
    setNewOrder({
      product: 'blueberries',
      quantity: 0,
      deliveryDate: '',
      location: ''
    });
  };

  // Calculate order status breakdown for charts based on filter
  const filteredOrdersForStatus = productFilter !== 'all' 
    ? orders.filter(order => order.product.toLowerCase() === productFilter.toLowerCase())
    : orders;

  const deliveredCount = filteredOrdersForStatus.filter(order => order.status === 'Delivered').length;
  const inTransitCount = filteredOrdersForStatus.filter(order => order.status === 'In Transit').length;
  const delayedCount = filteredOrdersForStatus.filter(order => order.status === 'Delayed').length;
  const totalOrders = deliveredCount + inTransitCount + delayedCount;

  const deliveredPercentage = totalOrders > 0 ? Math.round((deliveredCount / totalOrders) * 100) : 0;
  const inTransitPercentage = totalOrders > 0 ? Math.round((inTransitCount / totalOrders) * 100) : 0;
  const delayedPercentage = totalOrders > 0 ? Math.round((delayedCount / totalOrders) * 100) : 0;

  // Calculate order quantity ranges for the bar chart
  const quantityRanges = [
    { label: '0-100', min: 0, max: 100 },
    { label: '101-300', min: 101, max: 300 },
    { label: '301-500', min: 301, max: 500 },
    { label: '501-700', min: 501, max: 700 },
    { label: '701+', min: 701, max: Infinity },
  ];

  const quantityCounts = quantityRanges.map(range => 
    orders.filter(o => o.quantity >= range.min && o.quantity <= range.max).length
  );

  const maxQuantityCount = Math.max(...quantityCounts);

  // Calculate product distribution for bar chart
  const productCounts = {
    blueberries: orders.filter(o => o.product === 'Blueberries').length,
    raspberries: orders.filter(o => o.product === 'Raspberries').length,
    blackberries: orders.filter(o => o.product === 'Blackberries').length
  };

  // Get filtered product counts based on selected product filter
  const getFilteredProductCounts = () => {
    if (productFilter === 'all') {
      return [
        { label: 'Blueberries', count: productCounts.blueberries },
        { label: 'Raspberries', count: productCounts.raspberries },
        { label: 'Blackberries', count: productCounts.blackberries }
      ];
    } else {
      // When a specific product is selected, show only that product
      return [{
        label: productFilter.charAt(0).toUpperCase() + productFilter.slice(1),
        count: productCounts[productFilter]
      }];
    }
  };

  const filteredProducts = getFilteredProductCounts();
  const maxProductCount = Math.max(...filteredProducts.map(p => p.count));

  // Update monthly order data to be product-specific
  const getFilteredMonthlyData = () => {
    const allData = [
      { month: 'Jan', blueberries: 12, raspberries: 8, blackberries: 4 },
      { month: 'Feb', blueberries: 10, raspberries: 5, blackberries: 3 },
      { month: 'Mar', blueberries: 15, raspberries: 10, blackberries: 7 },
      { month: 'Apr', blueberries: 20, raspberries: 12, blackberries: 4 },
      { month: 'May', blueberries: 15, raspberries: 9, blackberries: 4 },
      { month: 'Jun', blueberries: 22, raspberries: 12, blackberries: 8 }
    ];

    return allData.map(data => {
      if (productFilter === 'all') {
        return {
          month: data.month,
          orders: data.blueberries + data.raspberries + data.blackberries
        };
      } else {
        return {
          month: data.month,
          orders: data[productFilter]
        };
      }
    });
  };

  const monthlyOrderData = getFilteredMonthlyData();
  const maxMonthlyOrders = Math.max(...monthlyOrderData.map(d => d.orders));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <a href="/" className={styles.backButton}>
              ← Back
            </a>
            <h1>
              <span className={styles.agro}>AGRO</span>
              <span className={styles.vision}>VISION</span>
            </h1>
          </div>
          <div className={styles.headerRight}>
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value as 'all' | 'blueberries' | 'raspberries' | 'blackberries')}
              className={`${styles.headerProductFilter} ${productFilter !== 'all' ? styles.activeFilter : ''}`}
            >
              <option value="all">All Products</option>
              <option value="blueberries">Blueberries</option>
              <option value="raspberries">Raspberries</option>
              <option value="blackberries">Blackberries</option>
            </select>
          </div>
        </div>
      </header>

      <div className={styles.topBar}>
        <div className={styles.analyticsSection}>
          <div className={styles.analyticsCard}>
            <div className={styles.analyticsTitle}>
              Total Batches
              {productFilter !== 'all' && ` (${productFilter})`}
            </div>
            <div className={styles.analyticsValue}>{currentAnalytics.totalBatches}</div>
            <div className={styles.analyticsSubtext}>
              {currentAnalytics.deliveredBatches} Delivered
            </div>
          </div>
          <div className={styles.analyticsCard}>
            <div className={styles.analyticsTitle}>
              On-Time Delivery
              {productFilter !== 'all' && ` (${productFilter})`}
            </div>
            <div className={styles.analyticsValue}>{currentAnalytics.onTimeDeliveryRate}%</div>
            <div className={styles.analyticsSubtext}>Last 30 days</div>
          </div>
          <div className={styles.analyticsCard}>
            <div className={styles.analyticsTitle}>
              Quality Rating
              {productFilter !== 'all' && ` (${productFilter})`}
            </div>
            <div className={styles.analyticsValue}>{currentAnalytics.averageQualityRating}</div>
            <div className={styles.analyticsSubtext}>Average at arrival</div>
          </div>
          <div className={styles.analyticsCard}>
            <div className={styles.analyticsTitle}>
              Total Quantity
              {productFilter !== 'all' && ` (${productFilter})`}
            </div>
            <div className={styles.analyticsValue}>{currentAnalytics.totalQuantity}</div>
            <div className={styles.analyticsSubtext}>Kilograms ordered</div>
          </div>
        </div>

        <div className={styles.notificationsSection}>
          {alertDetails.delayed.length > 0 && (
            <div 
              className={`${styles.alert} ${styles.alertDanger} ${expandedAlert === 'delayed' ? styles.alertExpanded : ''}`}
              onClick={() => toggleAlertDetails('delayed')}
            >
              ⚠️ Delayed Orders: {alertDetails.delayed.length}
              {expandedAlert === 'delayed' && (
                <div className={styles.alertDetailsList}>
                  {alertDetails.delayed.map(item => (
                    <div key={item.batchNumber} className={styles.alertDetailItem}>
                      #{item.batchNumber}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {alertDetails.arrivingToday.length > 0 && (
            <div 
              className={`${styles.alert} ${styles.alertSuccess} ${expandedAlert === 'arriving' ? styles.alertExpanded : ''}`}
              onClick={() => toggleAlertDetails('arriving')}
            >
              🚛 Arriving Today: {alertDetails.arrivingToday.length}
              {expandedAlert === 'arriving' && (
                <div className={styles.alertDetailsList}>
                  {alertDetails.arrivingToday.map(item => (
                    <div key={item.batchNumber} className={styles.alertDetailItem}>
                      #{item.batchNumber}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {alertDetails.arrivingSoon.length > 0 && (
            <div 
              className={`${styles.alert} ${styles.alertWarning} ${expandedAlert === 'soon' ? styles.alertExpanded : ''}`}
              onClick={() => toggleAlertDetails('soon')}
            >
              📦 Arriving Soon: {alertDetails.arrivingSoon.length}
              {expandedAlert === 'soon' && (
                <div className={styles.alertDetailsList}>
                  {alertDetails.arrivingSoon.map(item => (
                    <div key={item.batchNumber} className={styles.alertDetailItem}>
                      #{item.batchNumber}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Order Status Breakdown</h3>
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', marginTop: '0.5rem' }}>
            <div style={{ flex: '0 0 120px' }}>
              <div className={styles.donutChart} style={{ width: '120px', height: '120px' }}>
                <div className={styles.donutHole}></div>
                <div className={styles.donutSegment} style={{
                  backgroundColor: '#22C55E', // Vibrant green for Delivered
                  transform: `rotate(0deg) skew(${deliveredPercentage < 50 ? 0 : (deliveredPercentage - 50) * 3.6}deg)`,
                  zIndex: 3,
                  opacity: deliveredPercentage > 0 ? 1 : 0
                }}></div>
                
                <div className={styles.donutSegment} style={{
                  backgroundColor: '#3B82F6', // Vibrant blue for In Transit
                  transform: `rotate(${deliveredPercentage * 3.6}deg) skew(${inTransitPercentage < 50 ? 0 : (inTransitPercentage - 50) * 3.6}deg)`,
                  zIndex: 2,
                  opacity: inTransitPercentage > 0 ? 1 : 0
                }}></div>
                
                <div className={styles.donutSegment} style={{
                  backgroundColor: '#EF4444', // Vibrant red for Delayed
                  transform: `rotate(${(deliveredPercentage + inTransitPercentage) * 3.6}deg) skew(${delayedPercentage < 50 ? 0 : (delayedPercentage - 50) * 3.6}deg)`,
                  zIndex: 1,
                  opacity: delayedPercentage > 0 ? 1 : 0
                }}></div>
              </div>
            </div>
            
            <div className={styles.chartLegend} style={{ marginLeft: '1rem', flex: 1 }}>
              <div className={styles.legendItem}>
                <span className={styles.legendColor} style={{ backgroundColor: '#22C55E' }}></span>
                <div className={styles.legendText}>
                  <span>Delivered</span>
                  <span className={styles.legendValue}>{deliveredCount} ({deliveredPercentage}%)</span>
                </div>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendColor} style={{ backgroundColor: '#3B82F6' }}></span>
                <div className={styles.legendText}>
                  <span>In Transit</span>
                  <span className={styles.legendValue}>{inTransitCount} ({inTransitPercentage}%)</span>
                </div>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendColor} style={{ backgroundColor: '#EF4444' }}></span>
                <div className={styles.legendText}>
                  <span>Delayed</span>
                  <span className={styles.legendValue}>{delayedCount} ({delayedPercentage}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Product Distribution</h3>
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', marginTop: '0.5rem' }}>
            <div className={styles.barChart} style={{ flex: 1, marginTop: 0 }}>
              {filteredProducts.map((product, index) => {
                const height = product.count > 0 ? (product.count / maxProductCount) * 100 : 0;
                
                // Use a simpler approach for colors based on product name
                let barColor = '#4F46E5'; // Default indigo
                if (product.label === 'Raspberries') barColor = '#EC4899'; // Pink
                if (product.label === 'Blackberries') barColor = '#8B5CF6'; // Purple
                
                return (
                  <div key={product.label} className={styles.barGroup}>
                    <div className={styles.barContainer}>
                      <div 
                        className={styles.bar} 
                        style={{ 
                          height: `${height}%`, 
                          backgroundColor: barColor
                        }}
                      >
                        <span className={styles.barCount}>{product.count}</span>
                      </div>
                    </div>
                    <div className={styles.barLabel}>{product.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Orders Over Time</h3>
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', marginTop: '0.5rem' }}>
            <div className={styles.lineChart} style={{ flex: 1, marginTop: 0 }}>
              <div className={styles.lineChartGrid}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={styles.lineChartGridLine} style={{ bottom: `${(i / 3) * 80}%` }} />
                ))}
              </div>
              <div className={styles.lineChartLines}>
                {monthlyOrderData.map((data, index) => {
                  if (index === 0) return null;
                  
                  const currentHeight = (data.orders / maxMonthlyOrders) * 80;
                  const prevHeight = (monthlyOrderData[index - 1].orders / maxMonthlyOrders) * 80;
                  const x1 = `${(index - 1) * (100 / (monthlyOrderData.length - 1))}%`;
                  const y1 = `${100 - prevHeight}%`;
                  const x2 = `${index * (100 / (monthlyOrderData.length - 1))}%`;
                  const y2 = `${100 - currentHeight}%`;
                  
                  return (
                    <svg key={index} className={styles.lineChartSvg}>
                      <line 
                        x1={x1} y1={y1} 
                        x2={x2} y2={y2} 
                        stroke="#0F52BA" 
                        strokeWidth="2"
                      />
                    </svg>
                  );
                })}
              </div>
              <div className={styles.lineChartData}>
                {monthlyOrderData.map((data, index) => {
                  const height = (data.orders / maxMonthlyOrders) * 80;
                  
                  return (
                    <div key={data.month} className={styles.lineChartPoint} style={{ left: `${index * (100 / (monthlyOrderData.length - 1))}%` }}>
                      <div className={styles.lineChartDot} style={{ bottom: `${height}%` }}>
                        <span className={styles.lineChartValue}>{data.orders}</span>
                      </div>
                      <div className={styles.lineChartLabel}>{data.month}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.searchSection}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search by batch number, farm name, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>
        </div>

        <div className={styles.contentLayout}>
          <div className={styles.tableWrapper}>
            <div className={styles.tableHeader}>
              <div className={styles.tableHeaderLeft}>
                <h2>Orders</h2>
                {(productFilter !== 'all' || statusFilter !== 'all' || dateRange.start || dateRange.end) && (
                  <div className={styles.activeFilters}>
                    {productFilter !== 'all' && (
                      <span className={styles.filterTag}>
                        {productFilter}
                        <button onClick={() => setProductFilter('all')} className={styles.clearFilter}>×</button>
                      </span>
                    )}
                    {statusFilter !== 'all' && (
                      <span className={styles.filterTag}>
                        {statusFilter}
                        <button onClick={() => setStatusFilter('all')} className={styles.clearFilter}>×</button>
                      </span>
                    )}
                    {(dateRange.start || dateRange.end) && (
                      <span className={styles.filterTag}>
                        {dateRange.start && new Date(dateRange.start).toLocaleDateString()} 
                        {dateRange.start && dateRange.end && ' - '} 
                        {dateRange.end && new Date(dateRange.end).toLocaleDateString()}
                        <button onClick={() => setDateRange({ start: '', end: '' })} className={styles.clearFilter}>×</button>
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className={styles.tableFilters}>
                <div className={styles.dateFilter}>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className={styles.dateInput}
                    placeholder="Start Date"
                  />
                  <span className={styles.dateSeparator}>to</span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className={styles.dateInput}
                    placeholder="End Date"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`${styles.tableStatusFilter} ${statusFilter !== 'all' ? styles.activeFilter : ''}`}
                >
                  <option value="all">All Status</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="delayed">Delayed</option>
                </select>
              </div>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.batchColumn}>Batch Number</th>
                    <th>Farm Name</th>
                    <th>Location</th>
                    <th>Product</th>
                    <th className={styles.quantityColumn}>Quantity (kg)</th>
                    <th>Status</th>
                    <th>Expected Arrival</th>
                    <th className={styles.actionColumn}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.batchNumber} className={styles.tableRow}>
                      <td className={styles.batchColumn}>#{order.batchNumber}</td>
                      <td>{order.farmName}</td>
                      <td>{order.location}</td>
                      <td>{order.product}</td>
                      <td className={styles.quantityColumn}>{order.quantity}</td>
                      <td>
                        <span className={styles[`status${order.status.replace(' ', '')}`]}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.expectedArrival).toLocaleDateString()}</td>
                      <td className={styles.actionColumn}>
                        <a href={`/report/${order.batchNumber}`} className={styles.viewDetails}>
                          View Details
                          <span className={styles.arrowIcon}>→</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.newOrderSection}>
            <div className={styles.newOrderCard}>
              <h3>Place New Order</h3>
              <form onSubmit={handleNewOrderSubmit} className={styles.newOrderForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="product">Product</label>
                  <select
                    id="product"
                    name="product"
                    value={newOrder.product}
                    onChange={handleNewOrderChange}
                    className={styles.formInput}
                  >
                    <option value="blueberries">Blueberries</option>
                    <option value="raspberries">Raspberries</option>
                    <option value="blackberries">Blackberries</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="quantity">Quantity (kg)</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={newOrder.quantity || ''}
                    onChange={handleNewOrderChange}
                    className={styles.formInput}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="location">Delivery Location</label>
                  <select
                    id="location"
                    name="location"
                    value={newOrder.location}
                    onChange={handleNewOrderChange}
                    className={styles.formInput}
                    required
                  >
                    <option value="">Select a location</option>
                    <option value="Oregon">Oregon</option>
                    <option value="California">California</option>
                    <option value="Washington">Washington</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="deliveryDate">Preferred Delivery Date</label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    value={newOrder.deliveryDate}
                    onChange={handleNewOrderChange}
                    className={styles.formInput}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <button type="submit" className={styles.newOrderButton}>
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 