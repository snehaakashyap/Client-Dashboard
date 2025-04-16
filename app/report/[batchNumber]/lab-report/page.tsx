'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './lab-report.module.css';

// Define interfaces for type safety
interface TestResult {
  parameter: string;
  value: string | number;
  unit?: string;
  limit?: string; // Limit is optional
}

interface TestData {
  name: string;
  status: string;
  results: TestResult[];
  method: string;
}

interface LabReport {
  reportId: string;
  batchId: string | string[];
  productName: string;
  reportDate: string;
  complianceStatus: string;
  overallQualityScore: number;
  labName: string;
  labContact: string;
  tests: TestData[];
}

export default function LabReportPage() {
  const { batchNumber } = useParams();

  // Dummy lab report data (conforms to LabReport interface)
  const labReportData: LabReport = {
    reportId: 'LAB-2023-0784',
    batchId: batchNumber || 'BTC-2023-0568',
    productName: 'Premium Blueberries',
    reportDate: '2023-06-20',
    complianceStatus: 'Compliant',
    overallQualityScore: 96,
    labName: 'AgriTest Labs',
    labContact: 'info@agritestlabs.com',
    tests: [
      {
        name: 'Pesticide Residue Analysis',
        status: 'Pass',
        results: [
          { parameter: 'Chlorpyrifos', value: '<0.01', unit: 'mg/kg', limit: '0.05' },
          { parameter: 'Deltamethrin', value: '<0.01', unit: 'mg/kg', limit: '0.02' },
          { parameter: 'Glyphosate', value: '<0.01', unit: 'mg/kg', limit: '0.1' },
          { parameter: 'Imidacloprid', value: '0.02', unit: 'mg/kg', limit: '0.05' },
        ],
        method: 'LC-MS/MS & GC-MS/MS'
      },
      {
        name: 'Heavy Metals Screening',
        status: 'Pass',
        results: [
          { parameter: 'Lead (Pb)', value: '0.03', unit: 'mg/kg', limit: '0.1' },
          { parameter: 'Cadmium (Cd)', value: '0.01', unit: 'mg/kg', limit: '0.05' },
          { parameter: 'Mercury (Hg)', value: '<0.005', unit: 'mg/kg', limit: '0.01' },
          { parameter: 'Arsenic (As)', value: '0.02', unit: 'mg/kg', limit: '0.1' },
        ],
        method: 'ICP-MS'
      },
      {
        name: 'Microbial Contamination Test',
        status: 'Pass',
        results: [
          { parameter: 'E. coli (O157:H7)', value: 'Not Detected', unit: 'CFU/g', limit: 'Not Detected' },
          { parameter: 'Salmonella spp.', value: 'Not Detected', unit: 'CFU/25g', limit: 'Not Detected' },
          { parameter: 'Listeria monocytogenes', value: 'Not Detected', unit: 'CFU/25g', limit: 'Not Detected' },
          { parameter: 'Total Aerobic Plate Count', value: '1.5 x 10³', unit: 'CFU/g', limit: '10⁵' },
        ],
        method: 'Real-Time PCR & Plating'
      },
      {
        name: 'Nutritional Analysis',
        status: 'Pass',
        results: [
          { parameter: 'Vitamin C', value: '14.4', unit: 'mg/100g' },
          { parameter: 'Fiber', value: '3.6', unit: 'g/100g' },
          { parameter: 'Total Sugars', value: '9.96', unit: 'g/100g' },
          { parameter: 'Antioxidant Capacity (ORAC)', value: '4669', unit: 'µmol TE/100g' },
        ],
        method: 'HPLC & AOAC Official Methods'
      },
      {
        name: 'Berry Quality Metrics',
        status: 'Pass',
        results: [
          { parameter: 'Brix (Sugar Content)', value: '12.5', unit: '°Bx' },
          { parameter: 'Firmness', value: '195', unit: 'g/mm' },
          { parameter: 'Acidity (as Citric Acid)', value: '0.85', unit: '%' },
          { parameter: 'Average Berry Weight', value: '1.8', unit: 'g' },
        ],
        method: 'Refractometry, FirmTech & Titration'
      }
    ]
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pass': return styles.statusPass;
      case 'fail': return styles.statusFail;
      default: return styles.statusPending;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <header className={styles.header}>
          <Link href={`/report/${batchNumber}/summary`} className={styles.backLink}>
            <span>← Back to Summary</span>
          </Link>
          <h1 className={styles.reportTitle}>Lab Analysis Report</h1>
        </header>

        <section className={styles.reportMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Report ID</span>
            <span className={styles.metaValue}>{labReportData.reportId}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Batch ID</span>
            <span className={styles.metaValue}>{labReportData.batchId}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Product</span>
            <span className={styles.metaValue}>{labReportData.productName}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Report Date</span>
            <span className={styles.metaValue}>{labReportData.reportDate}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Tested By</span>
            <span className={styles.metaValue}>{labReportData.labName}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Compliance Status</span>
            <span className={`${styles.complianceBadge} ${labReportData.complianceStatus === 'Compliant' ? styles.compliant : styles.nonCompliant}`}>
              {labReportData.complianceStatus}
            </span>
          </div>
        </section>

        {labReportData.tests.map((test, index) => (
          <section key={index}>
            <h2 className={styles.sectionTitle}>{test.name}</h2>
            <div className={styles.testCard}>
              <div className={styles.testHeader}>
                <h3>Method: {test.method}</h3>
                <span className={`${styles.statusBadge} ${getStatusClass(test.status)}`}>
                  {test.status}
                </span>
              </div>
              <div className={styles.testBody}>
                <div className={styles.testResultsGrid}>
                  {test.results.map((result, resultIndex) => (
                    <div key={resultIndex} className={styles.resultItem}>
                      <div className={styles.resultLabel}>{result.parameter}</div>
                      <div className={styles.resultValue}>
                        {result.value}
                        {result.unit && <span className={styles.resultUnit}>{result.unit}</span>}
                      </div>
                      {result.limit && (
                        <div className={styles.resultNote}>Limit: {result.limit} {result.unit}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className={styles.overallScoreSection}>
          <div className={styles.scoreLabel}>Overall Quality Score</div>
          <div>
            <span className={styles.scoreValue}>{labReportData.overallQualityScore}</span>
            <span className={styles.scoreMax}>/100</span>
          </div>
        </section>
      </div>
    </div>
  );
} 