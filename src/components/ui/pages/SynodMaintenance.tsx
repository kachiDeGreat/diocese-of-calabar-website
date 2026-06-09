import { Link } from "react-router-dom";
import SEO from "../page-components/SEO";

export default function SynodMaintenance() {
  return (
    <div className="maintenance-wrapper">
      <SEO
        title="Synod Registration - Maintenance"
        description="The Synod registration portal is currently undergoing maintenance."
      />

      <style>{`
        .maintenance-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          padding: 20px;
          background-color: #f9fafb;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .maintenance-content {
          max-width: 600px;
          text-align: center;
          background: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .maintenance-icon {
          width: 80px;
          height: 80px;
          color: #c52810; /* Diocese theme color */
          margin: 0 auto 24px;
          animation: spin 4s linear infinite;
        }
        .maintenance-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 16px;
        }
        .maintenance-desc {
          font-size: 1.125rem;
          color: #4b5563;
          margin-bottom: 32px;
          line-height: 1.6;
        }
        .maintenance-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-primary {
          background-color: #c52810;
          color: #ffffff;
          border: none !important;
        }
        .btn-primary:hover {
          background-color: #a0200d;
        }
        .btn-secondary {
          background-color: #e5e7eb;
          color: #374151;
        }
        .btn-secondary:hover {
          background-color: #d1d5db;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @media (max-width: 600px) {
          .maintenance-content {
            padding: 30px 20px;
          }
          .maintenance-title {
            font-size: 2rem;
          }
          .maintenance-desc {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="maintenance-content">
        <svg
          className="maintenance-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        <h1 className="maintenance-title">We'll be right back!</h1>
        <p className="maintenance-desc">
          The Synod Registration portal is currently undergoing scheduled
          maintenance, please check back soon.
        </p>

        <div className="maintenance-actions">
          <Link to="/" className="btn btn-primary">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
