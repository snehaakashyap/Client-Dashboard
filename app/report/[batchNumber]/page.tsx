'use client';

import { useState, use } from 'react';
import styles from './report.module.css';

interface StageData {
  title: string;
  icon: string;
  location: string;
  completed: boolean;
  phase?: string;
  summary: {
    [key: string]: {
      value: string | number;
      unit?: string;
      note?: string;
    };
  };
  qualityChecks: {
    [key: string]: {
      value: string | number;
      unit?: string;
      note?: string;
    };
  };
}

export default function ReportPage({ params }: { params: Promise<{ batchNumber: string }> }) {
  const { batchNumber } = use(params);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  const handlePrevious = () => {
    setVisibleStartIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setVisibleStartIndex(prev => Math.min(stages.length - 3, prev + 1));
  };

  const stages: StageData[] = [
    {
      title: 'Farm Inspection',
      icon: '🫐',
      location: 'Coastal Blueberry Farm, Maine',
      completed: true,
      phase: 'Origin Phase',
      summary: {
        'Farm Area Inspected': { value: '35', unit: 'acres' },
        'PUC Code Verification': { value: 'ME-781', note: 'Lot - BLU2024' },
        'Soil pH Level': { value: '4.8-5.2', note: 'Optimal for blueberries' },
        'Soil Acidity Test': { value: 'Passed', note: 'High acid content verified' }
      },
      qualityChecks: {
        'Brix Level': { value: '12.8', unit: '°Bx', note: 'Target: >12°Bx' },
        'Berry Firmness': { value: '1.8', unit: 'N', note: 'Standard: 1.6-2.0N' },
        'Size Uniformity': { value: '92', unit: '%', note: 'within spec' }
      }
    },
    {
      title: 'Harvest',
      icon: '🌾',
      location: 'Coastal Blueberry Farm, Maine',
      completed: true,
      phase: 'Harvesting',
      summary: {
        'Total Harvested': { value: '5.2', unit: 'tons' },
        'Cooling Temperature': { value: '4', unit: '°C', note: 'Ideal: 2-6°C' },
        'Packaging': { value: '2,600', unit: 'pints', note: 'in clamshells' }
      },
      qualityChecks: {
        'Size Grade': { value: '95', unit: '%', note: 'Premium (>14mm)' },
        'Moisture Content': { value: '82', unit: '%', note: 'Target: 80-85%' },
        'Bloom Rating': { value: '4.8', unit: '/5', note: 'Natural wax intact' }
      }
    },
    {
      title: 'Pre-Shipment',
      icon: '📦',
      location: 'MaineBerry Packing, Portland',
      completed: true,
      phase: 'Quality Control',
      summary: {
        'Quality Inspection': { value: '100', unit: '%', note: 'batches verified' },
        'Cold Chain Verified': { value: '4.2', unit: '°C', note: 'maintained' },
        'Pack Integrity': { value: '99.9', unit: '%', note: 'seal check passed' }
      },
      qualityChecks: {
        'Sugar Content': { value: '13.2', unit: '°Bx', note: 'increased sweetness' },
        'Shelf Life Estimate': { value: '14', unit: 'days', note: 'at 4°C' },
        'Color Rating': { value: '98', unit: '%', note: 'deep blue verified' }
      }
    },
    {
      title: 'Transit',
      icon: '🚢',
      location: 'Oregon → Dubai',
      completed: false,
      phase: 'Transit Phase',
      summary: {
        'Shipment Loaded': { value: '48', unit: 'pallets', note: 'Date: 03/15/2024' },
        'Sea Freight Duration': { value: '8', unit: 'days' },
        'Tracking Frequency': { value: 'Hourly', note: 'Live Updates' },
        'Container': { value: 'MSCU7542198', note: 'AWB: 023-84742545' }
      },
      qualityChecks: {
        'Temperature Range': { value: '4.8-6.2', unit: '°C', note: 'Target: 4-7°C' },
        'Humidity Levels': { value: '85-92', unit: '%', note: 'throughout transit' }
      }
    },
    {
      title: 'Port Arrival',
      icon: '🚢',
      location: 'Dubai Port',
      completed: false,
      phase: 'Arrival Phase',
      summary: {
        'Arrival Date': { value: '03/23/2024' },
        'Total Pallets Received': { value: '48', unit: 'pallets' },
        'Customs Clearance': { value: '✅ Cleared' },
        'Inspection Duration': { value: '6', unit: 'hours' }
      },
      qualityChecks: {
        'Temperature at Arrival': { value: '5.2', unit: '°C' },
        'Berry Integrity Check': { value: '98', unit: '%', note: 'pass rate' },
        'Mold or Spoilage Rate': { value: '0.5', unit: '%', note: 'Target: <1%' }
      }
    },
    {
      title: 'Warehouse Storage',
      icon: '🏭',
      location: 'Dubai Distribution Center',
      completed: false,
      phase: 'Storage Phase',
      summary: {
        'Storage Capacity Used': { value: '65', unit: '%' },
        'Temperature Compliance': { value: '99.9', unit: '%', note: 'adherence to conditions' },
        'Inventory Turnover': { value: '3', unit: 'days' }
      },
      qualityChecks: {
        'Berry Firmness': { value: '7.8', unit: 'kg/cm²' },
        'Quality Inspection': { value: '100', unit: '%', note: 'pass rate' }
      }
    },
    {
      title: 'Distribution',
      icon: '🏪',
      location: 'Dubai Retailers',
      completed: false,
      phase: 'Final Phase',
      summary: {
        'Distributed Batches': { value: '24', unit: 'batches' },
        'Delivery Timeline': { value: '2', unit: 'days' },
        'Last-Mile Tracking': { value: '✅ Enabled' },
        'Customer Feedback': { value: '4.8', unit: '/5' }
      },
      qualityChecks: {
        'Final Inspection': { value: '✅ Passed' },
        'Shelf Life': { value: '5', unit: 'days', note: 'remaining' }
      }
    }
  ];

  const visibleStages = stages.slice(visibleStartIndex, visibleStartIndex + 3);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <a href="/dashboard" className={styles.backButton}>
            ← Back
          </a>
          <div className={styles.logo}>AGROVISION</div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.batchInfo}>
            <h1>Batch #{batchNumber}</h1>
            <span className={styles.timestamp}>Last Updated: March 18, 2024</span>
          </div>
          <a href="/support" className={styles.supportLink}>
            <span className={styles.supportIcon}>👤</span>
            Customer Service
          </a>
        </div>
      </header>

      <div className={styles.supplyChainTracker}>
        {[
          { name: 'Farm Inspection', emoji: '🌱' },
          { name: 'Harvest', emoji: '🫐' },
          { name: 'Pre-Shipment', emoji: '📦' },
          { name: 'Transit', emoji: '🚢' },
          { name: 'Port Arrival', emoji: '🏗️' },
          { name: 'Warehouse', emoji: '🏭' },
          { name: 'Distribution', emoji: '🚚' }
        ].map((stage, index) => (
          <div 
            key={index} 
            className={`${styles.trackerStage} 
              ${index >= visibleStartIndex && index < visibleStartIndex + 3 ? styles.active : ''}
              ${index < visibleStartIndex ? styles.completed : ''}`}
          >
            <div className={styles.trackerIcon}>
              {stage.emoji}
            </div>
            <div className={styles.trackerTitle}>{stage.name}</div>
            {index < 6 && <div className={styles.trackerLine} />}
          </div>
        ))}
      </div>

      <main className={styles.main}>
        <div className={styles.stageCards}>
          {visibleStages.map((stage, index) => (
            <div key={index} className={styles.stageCard}>
              <div className={styles.stagePhase}>{stage.phase}</div>
              <div className={styles.stageHeader}>
                <div className={styles.stageIcon}>{stage.icon}</div>
                <div className={styles.stageInfo}>
                  <h2>{stage.title}</h2>
                  <div className={styles.location}>📍 {stage.location}</div>
                </div>
              </div>

              <div className={styles.section}>
                <h3>SUMMARY</h3>
                <div className={styles.summaryGrid}>
                  {Object.entries(stage.summary).map(([key, data]) => (
                    <div key={key} className={styles.summaryItem}>
                      <div className={styles.label}>{key}</div>
                      <div className={styles.value}>
                        <strong>{data.value}</strong>
                        {data.unit && <span className={styles.unit}> {data.unit}</span>}
                        {data.note && <span className={styles.note}> {data.note}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h3>QUALITY CHECKS</h3>
                <div className={styles.checksGrid}>
                  {Object.entries(stage.qualityChecks).map(([key, data]) => (
                    <div key={key} className={styles.checkItem}>
                      <div className={styles.label}>{key}</div>
                      <div className={styles.value}>
                        <strong>{data.value}</strong>
                        {data.unit && <span className={styles.unit}> {data.unit}</span>}
                        {data.note && <span className={styles.note}> {data.note}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.navigation}>
          <button 
            className={styles.navButton}
            onClick={handlePrevious}
            disabled={visibleStartIndex === 0}
          >
            ←
          </button>
          <button 
            className={styles.navButton}
            onClick={handleNext}
            disabled={visibleStartIndex >= stages.length - 3}
          >
            →
          </button>
        </div>

        {visibleStartIndex >= stages.length - 3 && (
          <div className={styles.summaryLinkContainer}>
            <a 
              href={`/report/${batchNumber}/summary`} 
              className={styles.summaryLinkButton}
            >
              View Summary Report 📜
            </a>
          </div>
        )}
      </main>
    </div>
  );
} 