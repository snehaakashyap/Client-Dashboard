'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './summary.module.css';

export default function SummaryPage() {
  const { batchNumber } = useParams();
  
  // Dummy order data
  const orderData = {
    orderInfo: {
      batchId: batchNumber || 'BT001',
      clientName: 'Whole Foods Market',
      orderDate: '2023-06-15',
      expectedDeliveryDate: '2023-06-28',
      status: 'In Transit',
      orderType: 'Wholesale'
    },
    productDetails: [
      {
        name: 'Premium Blueberries',
        variety: 'Vaccinium corymbosum',
        quantity: '2,500 kg',
        qualityGrade: 'Premium (A)',
        packaging: 'Eco-friendly plastic containers (125g)'
      },
      {
        name: 'Organic Blackberries',
        variety: 'Rubus fruticosus',
        quantity: '1,200 kg',
        qualityGrade: 'Premium (A)',
        packaging: 'Eco-friendly plastic containers (125g)'
      }
    ],
    labInfo: {
      reportId: 'LAB-2023-0784',
      complianceStatus: 'Compliant',
      averageQualityScore: 96
    },
    farmInfo: {
      sourceFarm: 'Blue Valley Organic Farms',
      harvestDate: '2023-06-10',
      batchIds: ['FRM-2023-1122', 'FRM-2023-1123']
    },
    logisticsInfo: {
      courierPartner: 'FastFresh Logistics',
      trackingId: 'TRACK-FF-89675',
      currentLocation: 'Cold Storage Facility, Chicago',
      estimatedDelivery: '2023-06-28',
      deliveryAddress: 'Whole Foods Distribution Center\n123 Warehouse Avenue\nChicago, IL 60007\nUnited States'
    }
  };

  const handleDownload = () => {
    // Generate text report content
    const reportContent = `Berry Order Summary - ${orderData.orderInfo.batchId}`;
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Order_Summary_${orderData.orderInfo.batchId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Compact card style for less scrolling
  const compactCardStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: 'white'
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
    borderBottom: '1px solid #f3f4f6'
  };

  const sectionStyle = {
    marginBottom: '16px'
  };

  const sectionTitleStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#1E40AF'
  };

  const statusBadgeStyle = {
    display: 'inline-block',
    backgroundColor: '#DBEAFE',
    color: '#2563EB',
    padding: '2px 8px',
    borderRadius: '99px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  };

  return (
    <div style={{ padding: '12px', margin: '0 auto' }}>
      <header style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href={`/report/${batchNumber}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1E40AF' }}>
            ← {orderData.orderInfo.batchId}
          </span>
        </Link>
        <button onClick={handleDownload} style={{ 
          backgroundColor: '#2563EB', 
          color: 'white', 
          border: 'none', 
          padding: '6px 12px', 
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.8rem'
        }}>
          📥 Download
        </button>
      </header>

      <div style={compactCardStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
          {/* Order Info */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Order Info</div>
            <div style={rowStyle}>
              <span>Client:</span>
              <span>{orderData.orderInfo.clientName}</span>
            </div>
            <div style={rowStyle}>
              <span>Order Date:</span>
              <span>{orderData.orderInfo.orderDate}</span>
            </div>
            <div style={rowStyle}>
              <span>Expected Delivery:</span>
              <span>{orderData.orderInfo.expectedDeliveryDate}</span>
            </div>
            <div style={rowStyle}>
              <span>Status:</span>
              <span style={statusBadgeStyle}>{orderData.orderInfo.status}</span>
            </div>
            <div style={{...rowStyle, borderBottom: 'none'}}>
              <span>Type:</span>
              <span>{orderData.orderInfo.orderType}</span>
            </div>
          </div>

          {/* Logistics Info */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Logistics Info</div>
            <div style={rowStyle}>
              <span>Current Location:</span>
              <span>{orderData.logisticsInfo.currentLocation}</span>
            </div>
            <div style={rowStyle}>
              <span>Courier:</span>
              <span>{orderData.logisticsInfo.courierPartner}</span>
            </div>
            <div style={rowStyle}>
              <span>Tracking ID:</span>
              <span>{orderData.logisticsInfo.trackingId}</span>
            </div>
            <div style={{...rowStyle, borderBottom: 'none'}}>
              <span>Address:</span>
              <span style={{fontSize: '0.8rem'}}>{orderData.logisticsInfo.deliveryAddress.split('\n')[0]}</span>
            </div>
          </div>

          {/* Farm Information */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Farm Information</div>
            <div style={rowStyle}>
              <span>Source Farm:</span>
              <span>{orderData.farmInfo.sourceFarm}</span>
            </div>
            <div style={rowStyle}>
              <span>Harvest Date:</span>
              <span>{orderData.farmInfo.harvestDate}</span>
            </div>
            <div style={{...rowStyle, borderBottom: 'none'}}>
              <span>Farm Batch IDs:</span>
              <span style={{fontSize: '0.8rem'}}>{orderData.farmInfo.batchIds.join(', ')}</span>
            </div>
          </div>

          {/* Lab Information */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Lab Information</div>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563EB' }}>
                {orderData.labInfo.averageQualityScore}<span style={{ fontSize: '1rem', opacity: 0.7 }}>/100</span>
              </div>
              <div style={{ fontSize: '0.8rem' }}>Quality Score</div>
            </div>
            <div style={rowStyle}>
              <span>Compliance:</span>
              <span style={{
                backgroundColor: '#D1FAE5',
                color: '#065F46',
                padding: '2px 8px',
                borderRadius: '99px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                ✓ {orderData.labInfo.complianceStatus}
              </span>
            </div>
            <div style={{...rowStyle, borderBottom: 'none'}}>
              <span>Report ID:</span>
              <span>{orderData.labInfo.reportId}</span>
            </div>
          </div>
        </div>

        {/* Products */}
        <div style={{ marginTop: '10px' }}>
          <div style={sectionTitleStyle}>Products</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
            {orderData.productDetails.map((product, index) => (
              <div key={index} style={{ 
                border: '1px solid #f3f4f6', 
                borderRadius: '4px', 
                padding: '8px',
                backgroundColor: '#f9fafb' 
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{product.name}</div>
                <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: '#6B7280', marginBottom: '4px' }}>{product.variety}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>Quantity:</span>
                  <span>{product.quantity}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>Quality:</span>
                  <span>{product.qualityGrade}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>Packaging:</span>
                  <span style={{ fontSize: '0.8rem' }}>{product.packaging}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 