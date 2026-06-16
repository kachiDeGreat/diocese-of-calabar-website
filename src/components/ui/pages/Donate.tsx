import React, { useState, useRef } from "react";
import { PaystackButton } from "react-paystack";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import styles from "../styles/Donate.module.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import SEO from "../page-components/SEO";

const SUGGESTED_AMOUNTS = [5000, 10000, 20000, 50000];

export default function Donate() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    purpose: "General Donation",
  });

  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);

  const scrollToFormTop = () => {
    setTimeout(() => {
      const yOffset = -20;
      const element = formRef.current;
      if (element) {
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  const nextStep = () => {
    if (step === 1) {
      if (!amount || amount < 100) {
        toast.error("Please enter a valid amount (minimum ₦100).");
        return;
      }
      setStep(2);
      scrollToFormTop();
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    scrollToFormTop();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setCustomAmount(val);
    setAmount(val ? parseInt(val, 10) : "");
  };

  const paystackConfig = {
    reference: `DONATION_${new Date().getTime().toString()}`,
    email: formData.email,
    amount: (amount as number) * 100,
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY as string,
  };

  const handlePaystackSuccessAction = async (reference: any) => {
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "donations"), {
        ...formData,
        amount,
        reference: reference.reference,
        date: new Date().toISOString(),
      });
      toast.success("Thank you for your generous donation! God bless you.");
      setStep(3);
      scrollToFormTop();
    } catch (error) {
      console.error("Error saving donation:", error);
      toast.error(
        "Payment successful, but failed to save record. Please contact admin.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaystackCloseAction = () => {
    toast.error("Donation process was cancelled.");
  };

  const componentProps = {
    ...paystackConfig,
    text: "Give Now securely →",
    onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  // Step 2 Validation to prevent Paystack popup if details are missing
  const isStep2Valid =
    formData.fullName.trim() !== "" && formData.email.includes("@");

  const progressPercentage = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <div className={styles.pageWrapper}>
      <SEO
        title="Donate | Diocese of Calabar"
        description="Support the Diocese of Calabar"
      />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: { fontWeight: 600 },
          success: {
            style: { background: "#22c55e", color: "#fff" },
            iconTheme: { primary: "#fff", secondary: "#22c55e" },
          },
          error: {
            style: { background: "#c52810", color: "#fff" },
            iconTheme: { primary: "#fff", secondary: "#c52810" },
          },
        }}
      />

      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>SUPPORT THE DIOCESE</span>
          <h1 className={styles.title}>Give to the Work of God</h1>
          <p className={styles.subtitle}>
            "Every man according as he purposeth in his heart, so let him give;
            not grudgingly, or of necessity: for God loveth a cheerful giver." -
            2 Corinthians 9:7
          </p>
        </div>
      </section>

      <section className={styles.donateSection}>
        <div className={styles.donateContainer} ref={formRef}>
          <div className={styles.card}>
            <div className={styles.progressHeader}>
              <div className={styles.progressTitleRow}>
                <h2>Donation</h2>
                <span className={styles.progressPercentage}>
                  {progressPercentage}%
                </span>
              </div>

              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <div className={styles.stepIndicators}>
                <div
                  className={`${styles.stepIndicator} ${step === 1 ? styles.active : step > 1 ? styles.completed : ""}`}
                >
                  <div className={styles.stepNum}>1</div>
                  <span className={styles.stepText}>Amount</span>
                </div>
                <div
                  className={`${styles.stepIndicator} ${step === 2 ? styles.active : step > 2 ? styles.completed : ""}`}
                >
                  <div className={styles.stepNum}>2</div>
                  <span className={styles.stepText}>Payment</span>
                </div>
                <div
                  className={`${styles.stepIndicator} ${step === 3 ? styles.active : ""}`}
                >
                  <div className={styles.stepNum}>3</div>
                  <span className={styles.stepText}>Done</span>
                </div>
              </div>
            </div>

            {step === 1 && (
              <div className={styles.stepContent}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={styles.formHeader}>
                    <h3>Donation Details</h3>
                    <p>Choose an amount and purpose for your giving.</p>
                  </div>

                  <div className={styles.formSection}>
                    <div
                      className={styles.customAmountWrapper}
                      style={{ marginBottom: "20px" }}
                    >
                      <label>Enter a custom amount (₦):</label>
                      <div className={styles.inputWithIcon}>
                        <span className={styles.currencySymbol}>₦</span>
                        <input
                          type="text"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          placeholder="Enter amount"
                          className={styles.customInput}
                        />
                      </div>
                    </div>

                    <div className={styles.customAmountWrapper}>
                      <label>Or select a suggested amount:</label>
                    </div>
                    <div className={styles.amountGrid}>
                      {SUGGESTED_AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          className={`${styles.amountBtn} ${amount === amt && !customAmount ? styles.active : ""}`}
                          onClick={() => handleAmountClick(amt)}
                        >
                          ₦{amt.toLocaleString()}
                        </button>
                      ))}
                    </div>

                    <div
                      className={styles.inputGroup}
                      style={{ marginTop: "20px" }}
                    >
                      <label>Purpose of Giving</label>
                      <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleInputChange}
                      >
                        <option value="General Donation">
                          General Donation
                        </option>
                        <option value="Tithe">Tithe</option>
                        <option value="Offering">Offering</option>
                        <option value="Project Fund">Project Support</option>
                        <option value="Synod Support">Synod Support</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.buttonContainer}>
                    <div></div>
                    <button className={styles.nextBtn} onClick={nextStep}>
                      Next Step →
                    </button>
                  </div>
                </motion.div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.stepContent}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={styles.formHeader}>
                    <h3>Personal Information & Payment</h3>
                    <p>
                      Provide your details for our records and complete your
                      donation.
                    </p>
                  </div>

                  <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="receipts@example.com"
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="08012345678"
                      />
                    </div>
                  </div>

                  <div
                    className={styles.paymentSummary}
                    style={{ marginTop: "2.5rem" }}
                  >
                    <h4>Donation Summary</h4>
                    <h3>{formData.purpose}</h3>

                    <div className={styles.paymentRow}>
                      <span>Name</span>
                      <span style={{ textAlign: "right", fontWeight: "600" }}>
                        {formData.fullName || "Anonymous"}
                      </span>
                    </div>
                    <div className={styles.paymentRow}>
                      <span>Email</span>
                      <span style={{ textAlign: "right", fontWeight: "600" }}>
                        {formData.email || "-"}
                      </span>
                    </div>

                    <div
                      className={styles.paymentRow}
                      style={{ borderBottom: "none", paddingTop: "0" }}
                    >
                      <span>Total to give</span>
                      <strong style={{ color: "#c52810", fontSize: "2rem" }}>
                        ₦{amount ? amount.toLocaleString() : "0"}
                      </strong>
                    </div>
                  </div>

                  <div className={styles.trustBanner}>
                    <div className={styles.trustIcon}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0ba4db"
                        strokeWidth="2"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div className={styles.trustText}>
                      <strong>Secured by Paystack</strong>
                      <p>
                        Paystack is a secure, multi-million dollar payment
                        gateway trusted by thousands of businesses across
                        Africa.
                      </p>
                    </div>
                  </div>

                  <div className={styles.buttonContainer}>
                    <button className={styles.backBtn} onClick={prevStep}>
                      Back
                    </button>
                    {isSubmitting ? (
                      <button
                        className={styles.payBtn}
                        disabled
                        style={{ opacity: 0.7 }}
                      >
                        Processing...
                      </button>
                    ) : isStep2Valid ? (
                      <PaystackButton
                        className={styles.payBtn}
                        {...componentProps}
                      />
                    ) : (
                      <button
                        className={styles.payBtn}
                        disabled
                        style={{ opacity: 0.5, cursor: "not-allowed" }}
                      >
                        Fill Details to Pay
                      </button>
                    )}
                  </div>
                </motion.div>
              </div>
            )}

            {step === 3 && (
              <div className={styles.successContainer}>
                <motion.div
                  className={styles.successIcon}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <motion.svg
                    width="45"
                    height="45"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.polyline
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                      points="20 6 9 17 4 12"
                    />
                  </motion.svg>
                </motion.div>
                <h2>Donation Successful!</h2>
                <p>
                  Thank you for your generous support. God bless you abundantly.
                </p>

                <div className={styles.successActions}>
                  <button
                    onClick={() => {
                      setStep(1);
                      setAmount("");
                      setCustomAmount("");
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        purpose: "General Donation",
                      });
                      scrollToFormTop();
                    }}
                    className={styles.homeBtn}
                  >
                    Make Another Donation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
