import { getProductRoadmap } from '@/lib/sanity';
import ProductRoadmapClient from '@/components/innovation/ProductRoadmapClient';

export const revalidate = 60;

// Static fallback data representing Evon Medics products
const STATIC_ROADMAP = [
  { _id: 'emrast', projectName: 'EMRAST', fullTitle: "Early Multi-Modal Alzheimer's Risk Assessment & Sensing Technology", status: 'Clinical Phase II', phase: 'Phase II', nihGrant: 'R44AG082621', fundingAmount: 2947375, description: 'Multimodal diagnostic platform combining psychophysical olfactory stimulation with ML-based classification for pre-clinical Alzheimer\'s detection. Randomized feasibility trial published in Alzheimer\'s & Dementia.', marketStatus: 'Clinical Validation', photos: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80'] },
  { _id: 'editor', projectName: 'EDITOR', fullTitle: 'Early Detection & Intervention Tool for Opioid Recovery', status: 'Phase II Active', phase: 'Phase II', nihGrant: 'R44DA056156', fundingAmount: 2704509, description: 'Connected RPM ecosystem with a novel non-infrared pupillometer enabling objective neurological assessment for opioid use disorder monitoring and MAT efficacy evaluation.', marketStatus: 'Active Development', photos: ['https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80'] },
  { _id: 'cbotp', projectName: 'CBOT-P', fullTitle: 'Chronic Pain Neurosensory Therapeutic Platform', status: 'Pre-FDA Submission', phase: 'Phase II', nihGrant: 'R44AG061981', fundingAmount: 2791180, description: 'FDA Breakthrough Device designated electromechanical neurostimulation platform for chronic pain. ISO 13485 QMS compliant. Real-time neural feedback with electromechanical precision actuation.', marketStatus: 'Pre-FDA Submission', photos: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'] },
  { _id: 'memorydriver', projectName: 'MemoryDriver', fullTitle: 'AI-Powered Digital Therapeutic for Cognitive Longevity', status: 'Market Ready', phase: 'DTx', nihGrant: 'Patent #63/783,072', fundingAmount: null, description: 'Patented iOS digital therapeutic combining AI-driven cognitive assessments with personalized brain training. HIPAA-compliant, AWS-hosted, with longitudinal performance tracking.', marketStatus: 'Market Ready', photos: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'] },
  { _id: 'cannula', projectName: 'Smart Nasal Cannula', fullTitle: 'Connected Respiratory Monitoring Platform', status: 'Active Development', phase: 'R&D', nihGrant: 'Internal R&D', fundingAmount: null, description: 'BLE 5.0 + AWS IoT Core connected wearable with 0.1 L/min micro-flow sensing, SpO₂, PPG, and edge AI for 48+ hour remote respiratory monitoring.', marketStatus: 'Active Development', photos: ['https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=600&q=80'] },
  { _id: 'cot', projectName: 'COT', fullTitle: "Cognitive Optimization Therapy — Disease-Modifying Alzheimer's Intervention", status: 'Phase II Active', phase: 'Phase II', nihGrant: 'R44NS125745', fundingAmount: 3129999, description: 'End-to-end hardware lifecycle for Alzheimer\'s disease-modifying intervention device with full ISO 13485/IEC 62304 compliance, usability engineering per IEC 62366.', marketStatus: 'Active Development', photos: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80'] },
];

export default async function InnovationPipelinePage() {
  const sanityData = await getProductRoadmap();
  const products = sanityData.length > 0 ? sanityData : STATIC_ROADMAP;
  return <ProductRoadmapClient products={products} />;
}
