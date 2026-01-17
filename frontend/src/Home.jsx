import Layout from "./Layout";
import { useState, useEffect } from "react";
import "./Home.css";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: "⚖️",
      title: "IPC–BNS Charge Mapping",
      description: "Automated comparative interpretation framework generating legal mapping, differences in offenses, and punishment structures."
    },
    {
      icon: "🧠",
      title: "AI-Based Legal Prediction",
      description: "Predict relevant charges under IPC and BNS from natural-language case descriptions with high accuracy."
    },
    {
      icon: "🔍",
      title: "Explainable Reasoning Layer",
      description: "Transparent AI decisions with detailed explanations for each prediction and legal interpretation."
    },
    {
      icon: "📚",
      title: "Academic & Research Support",
      description: "Open academic resources supporting legal education, research, and domain-expert validation."
    },
    {
      icon: "⚡",
      title: "Real-time Analysis",
      description: "Process case descriptions instantly and provide comprehensive legal analysis within seconds."
    },
    {
      icon: "🔒",
      title: "Secure & Confidential",
      description: "Enterprise-grade security ensuring all case data remains private and protected."
    }
  ];

  return (
    <Layout>
      <div className={`hero-section ${isVisible ? 'visible' : ''}`}>
        <h1 className="hero-title">
          <span className="hero-highlight">AI-Powered</span> Criminal Law Analysis System
        </h1>
        <p className="subtitle">
          Advanced artificial intelligence system for predicting IPC & BNS charges from 
          natural language case descriptions with explainable legal reasoning and 
          comparative law framework.
        </p>
        
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">99%</span>
            <span className="stat-label">Prediction Accuracy</span>
          </div>
          <div className="stat">
            <span className="stat-number">5000+</span>
            <span className="stat-label">Legal Cases Analyzed</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Real-time Analysis</span>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="section-title">
          <h2>Core Features</h2>
          <p>Comprehensive AI legal analysis platform</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Transform Legal Analysis?</h2>
        <p>Join legal professionals and researchers using AI to enhance legal decision-making</p>
        <div className="cta-buttons">
          <button className="cta-btn primary">Try Demo Analysis</button>
          <button className="cta-btn secondary">Request Research Access</button>
        </div>
      </div>
    </Layout>
  );
}