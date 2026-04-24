import React, { useState, useRef, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import styles from "../styles/SynodReg.module.css";
import SEO from "../page-components/SEO";
import LazyImage from "../page-components/LazyImage";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export default function SynodReg() {
  const formRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("synodRegFormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          title: "",
          fullName: "",
          email: "",
          phone: "",
          archdeaconry: "",
          church: "",
          designation: "",
          photoUrl: "",
        };
  });

  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [delegateId, setDelegateId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const uploadAbortControllerRef = useRef<AbortController | null>(null);

  const [startedAt] = useState(() => {
    const saved = localStorage.getItem("synodRegStartedAt");
    if (saved) return saved;
    const now = new Date().toISOString();
    localStorage.setItem("synodRegStartedAt", now);
    return now;
  });

  useEffect(() => {
    localStorage.setItem("synodRegFormData", JSON.stringify(formData));
  }, [formData]);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 1.5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File is too large! Maximum size is 1.5MB.");
      return;
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      toast.error("Only JPG or PNG images are allowed.");
      return;
    }

    setIsUploadingPhoto(true);

    if (uploadAbortControllerRef.current) {
      uploadAbortControllerRef.current.abort();
    }
    uploadAbortControllerRef.current = new AbortController();

    try {
      const imageFormData = new FormData();
      imageFormData.append("file", file);
      imageFormData.append("upload_preset", "synod_preset");

      const cloudName = "dt2gk3gcn";

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: imageFormData,
          signal: uploadAbortControllerRef.current.signal,
        },
      );

      const uploadedImageData = await uploadResponse.json();

      setFormData((prev: any) => ({
        ...prev,
        photoUrl: uploadedImageData.secure_url,
      }));

      toast.success("Photo uploaded successfully!");
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Photo upload aborted by user.");
        return;
      }
      console.error("Photo upload error:", error);
      toast.error("Failed to upload photo. Please try again.");
    } finally {
      setIsUploadingPhoto(false);
      uploadAbortControllerRef.current = null;
    }
  };

  const removePhoto = () => {
    if (uploadAbortControllerRef.current) {
      uploadAbortControllerRef.current.abort();
      uploadAbortControllerRef.current = null;
    }
    setFormData((prev: any) => ({ ...prev, photoUrl: "" }));
  };

  const generateCustomId = () => {
    const namePart =
      formData.fullName.substring(0, 3).charAt(0).toUpperCase() +
      formData.fullName.substring(1, 3).toLowerCase();
    const archPart =
      formData.archdeaconry.substring(0, 3).charAt(0).toUpperCase() +
      formData.archdeaconry.substring(1, 3).toLowerCase();
    const randomNum = Math.floor(Math.random() * 900) + 100;
    return `${namePart}-${archPart}-${randomNum}`;
  };

  const nextStep = () => {
    if (step === 1) {
      if (
        !formData.title ||
        !formData.fullName ||
        !formData.email ||
        !formData.phone ||
        !formData.archdeaconry ||
        !formData.church ||
        !formData.designation
      ) {
        toast.error("Please fill in all personal details to proceed.");
        return;
      }
      setStep(2);
      scrollToFormTop();
    } else if (step === 2) {
      if (isUploadingPhoto) {
        toast.error("Please wait for your photo to finish uploading.");
        return;
      }
      if (!formData.photoUrl) {
        toast.error("Please upload a profile photo to proceed.");
        return;
      }
      setStep(3);
      scrollToFormTop();
    }
  };

  const prevStep = () => {
    if (step === 5) {
      setStep(3);
    } else {
      setStep(step - 1);
    }
    scrollToFormTop();
  };

  const amount = 10350;

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: amount * 100,
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY as string,
  };

  const handlePaystackSuccessAction = async (reference: any) => {
    try {
      setIsSubmitting(true);
      const newDelegateId = generateCustomId();

      await addDoc(collection(db, "synod_registrations"), {
        ...formData,
        delegateId: newDelegateId,
        paymentReference: reference.reference,
        amountPaid: amount,
        startedAt,
        completedAt: new Date().toISOString(),
      });

      const emailPayload = {
        fullName: formData.fullName,
        email: formData.email,
        delegateId: newDelegateId,
        archdeaconry: formData.archdeaconry,
        designation: formData.designation,
        amountPaid: amount.toLocaleString(),
      };

      fetch("/api/send_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      })
        .then((res) => res.json())
        .then((data) => console.log("Email API Response:", data))
        .catch((err) => console.error("Email API Failed:", err));

      setDelegateId(newDelegateId);
      setStep(4);
      scrollToFormTop();

      localStorage.removeItem("synodRegFormData");
      localStorage.removeItem("synodRegStartedAt");
      toast.success("Payment successful! Registration complete.");
    } catch (error) {
      console.error("Error saving registration details: ", error);
      toast.error(
        "Payment was successful but we failed to save some details. Please contact support.",
      );
      setStep(5);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaystackCloseAction = () => {
    toast.error("Payment was not completed.");
  };

  const componentProps = {
    ...paystackConfig,
    text: "Proceed to Payment →",
    onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  const progressPercentage =
    step === 1 ? 25 : step === 2 ? 50 : step === 3 || step === 5 ? 75 : 100;

  return (
    <div className={styles.pageWrapper}>
      <SEO
        title="Synod Registration"
        description="Register for the 3rd Session of the 12th Synod."
      />
      <Toaster
        position="bottom-center"
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

      <section className={styles.heroWrapper}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeDot}></span>
              CHURCH OF NIGERIA (ANGLICAN COMMUNION)
            </div>

            <div className={styles.heroEdition}> Diocese of Calabar</div>

            <h1 className={styles.heroTitle}>
              3rd Session of <br />
              <span className={styles.titleHighlight}>The 12th Synod</span>
            </h1>

            <p className={styles.heroDesc}>
              A gathering of clergy and lay delegates united under the theme
              <strong> "Not Offended In Me" (Matthew 11:6)</strong> to live
              boldly for Christ and transform our communities through faith and
              divine calling.
            </p>

            <div className={styles.infoGrid}>
              <div className={styles.themeCard}>
                <div className={styles.themeIcon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <div className={styles.themeText}>
                  <span className={styles.cardLabel}>THEME</span>
                  <h4>"Not Offended In Me"</h4>
                  <p>Matthew 11:6</p>
                </div>
              </div>

              <div className={styles.dateVenueRow}>
                <div className={styles.smallCard}>
                  <div className={styles.cardHeader}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>DATES</span>
                  </div>
                  <strong>8th - 12th July, 2026</strong>
                </div>

                <div className={styles.smallCard}>
                  <div className={styles.cardHeader}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>VENUE</span>
                  </div>
                  <strong>
                    Cathedral Church of Holy Trinity, 81 Calabar Rd
                    <br />
                    Calabar, Cross River State
                  </strong>
                </div>
              </div>
            </div>

            <button onClick={scrollToFormTop} className={styles.beginBtn}>
              Begin Registration →
            </button>
          </div>

          <div className={styles.heroImageCol}>
            <div className={styles.imageCard}>
              <LazyImage
                src="https://dropimg.onyekachi.dev/ht6wzjquxxibzidswokz"
                alt="Bishop image"
                className={styles.personImage}
              />
              <div className={styles.imageOverlay}>
                <span className={styles.imageRole}>DIOCESAN BISHOP</span>
                <h3 className={styles.imageName}>Rt. Revd Prof. Nneoyi Egbe</h3>
                <p className={styles.imageTitle}>Bishop of Calabar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.progressHeader}>
            <div className={styles.progressTitleRow}>
              <h2>Registration</h2>
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
                <span className={styles.stepText}>Personal</span>
              </div>
              <div
                className={`${styles.stepIndicator} ${step === 2 ? styles.active : step > 2 ? styles.completed : ""}`}
              >
                <div className={styles.stepNum}>2</div>
                <span className={styles.stepText}>Photo</span>
              </div>
              <div
                className={`${styles.stepIndicator} ${step === 3 ? styles.active : step === 5 ? styles.completed : step > 3 ? styles.completed : ""}`}
              >
                <div className={styles.stepNum}>3</div>
                <span className={styles.stepText}>Payment</span>
              </div>
              <div
                className={`${styles.stepIndicator} ${step === 4 ? styles.active : ""}`}
              >
                <div className={styles.stepNum}>4</div>
                <span className={styles.stepText}>Done</span>
              </div>
            </div>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className={styles.stepContent}>
              <div className={styles.formHeader}>
                <h3>Delegate Information</h3>
                <p>Provide accurate details for your tag.</p>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Rev, Rev. Can, Ven, Chief, Mr."
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="For your receipt"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    placeholder="e.g. 08012345678"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Archdeaconry *</label>
                  <select
                    name="archdeaconry"
                    value={formData.archdeaconry}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Archdeaconry</option>
                    <option value="Akampka Archdeaconry">
                      Akampka Archdeaconry
                    </option>
                    <option value="Ascension Deanery">Ascension Deanery</option>
                    <option value="Cathedral Archdeaconry">
                      Cathedral Archdeaconry
                    </option>
                    <option value="Christ-church Deanery">
                      Christ-church Deanery
                    </option>
                    <option value="Efut Deanery">Efut Deanery</option>
                    <option value="Diocese">Diocese</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label>Church / Parish Name *</label>
                  <input
                    type="text"
                    name="church"
                    value={formData.church}
                    onChange={handleInputChange}
                    placeholder="e.g. Holy Trinity"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Designation *</label>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                  >
                    <option value="">Select your role</option>
                    <option value="Clergy">Clergy</option>
                    <option value="Lay Synod Delegate">
                      Lay Synod Delegate
                    </option>
                    <option value="Diocesan Official">Diocesan Official</option>
                    <option value="Bishop's Nominee">Bishop's Nominee</option>
                    <option value="Guest Speaker">Guest Speaker</option>
                    <option value="Mama Calabar">Mama Calabar</option>
                  </select>
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <span className={styles.requiredNote}>
                  * All fields required
                </span>
                <button className={styles.nextBtn} onClick={nextStep}>
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className={styles.stepContent}>
              <div className={styles.uploadBox}>
                {isUploadingPhoto ? (
                  <div className={styles.previewContainer}>
                    <div className={styles.spinner}></div>
                    <h4>Uploading to secure storage...</h4>
                    <p className={styles.uploadSubText}>
                      Please wait while we process your image.
                    </p>
                  </div>
                ) : formData.photoUrl ? (
                  <div className={styles.previewContainer}>
                    <span className={styles.doneBadge}>✓ Upload Complete</span>
                    <img
                      src={formData.photoUrl}
                      alt="Delegate Cloudinary Upload"
                      className={styles.previewImageLarge}
                    />
                    <p className={styles.previewText}>
                      Image secured successfully to database.
                    </p>
                    <button
                      type="button"
                      onClick={removePhoto}
                      className={styles.removeBtn}
                    >
                      Remove & Replace Photo
                    </button>
                  </div>
                ) : (
                  <>
                    <div className={styles.uploadIcon}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#c52810"
                        strokeWidth="2"
                      >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                    </div>
                    <h4>Upload Profile Photo</h4>
                    <p className={styles.uploadSubText}>
                      Select your image. It will be securely uploaded
                      immediately.
                    </p>
                    <p className={styles.reqText}>
                      <span>Requirement:</span> Upload a clear, forward-facing
                      photo for your delegate badge.
                    </p>

                    <input
                      type="file"
                      id="photoUpload"
                      accept="image/jpeg, image/png"
                      onChange={handlePhotoUpload}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="photoUpload"
                      className={styles.uploadBtnLabel}
                    >
                      Select Photo
                    </label>
                    <p className={styles.fileHint}>JPG, PNG UP TO 1.5MB</p>
                  </>
                )}
              </div>

              <div className={styles.buttonContainer}>
                <button className={styles.backBtn} onClick={prevStep}>
                  Back
                </button>
                <button
                  className={styles.nextBtn}
                  onClick={nextStep}
                  disabled={isUploadingPhoto}
                  style={{ opacity: isUploadingPhoto ? 0.7 : 1 }}
                >
                  {isUploadingPhoto ? "Uploading..." : "Next Step →"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 - Payment Details Now Inline */}
          {step === 3 && (
            <div className={styles.stepContent}>
              <div className={styles.paymentSummary}>
                <h4>Registration Fee</h4>
                <h3>Synod 2026 Delegate Access</h3>

                <div className={styles.paymentRow}>
                  <span>Role</span>
                  <span style={{ textAlign: "right", fontWeight: "600" }}>
                    {formData.designation}
                  </span>
                </div>

                {/* Inline Fee Breakdown added here */}
                <ul className={styles.feeBreakdown}>
                  <li>
                    <span>Synod Registration:</span> <span>₦10,000</span>
                  </li>
                  <li>
                    <span>Processing Fee:</span> <span>₦350</span>
                  </li>
                </ul>

                <div
                  className={styles.paymentRow}
                  style={{ borderBottom: "none", paddingTop: "0" }}
                >
                  <span>Total Due</span>
                  <strong style={{ color: "#c52810", fontSize: "2rem" }}>
                    ₦{amount.toLocaleString()}
                  </strong>
                </div>
              </div>

              {/* Trust Banner moved here */}
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
                    Paystack is a secure, multi-million dollar payment gateway
                    trusted by thousands of businesses across Africa.{" "}
                    <a
                      href="https://paystack.com/what-is-paystack"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn more
                    </a>
                    .
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
                    Saving details...
                  </button>
                ) : (
                  // Paystack triggers straight from here now
                  <PaystackButton
                    className={styles.payBtn}
                    {...componentProps}
                  />
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Success Complete */}
          {step === 4 && (
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
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    points="20 6 9 17 4 12"
                  />
                </motion.svg>
              </motion.div>
              <h2>Registration Successful!</h2>
              <p>
                Your payment was successful. Details have been sent to your
                email.
              </p>

              <div className={styles.receiptDetails}>
                <div className={styles.receiptRow}>
                  <span>Unique ID:</span>
                  <strong style={{ color: "#c52810" }}>{delegateId}</strong>
                </div>
                <div className={styles.receiptRow}>
                  <span>Name:</span>
                  <strong>
                    {formData.title} {formData.fullName}
                  </strong>
                </div>
              </div>

              <div className={styles.successActions}>
                <a href="/synod-2026" className={styles.homeBtn}>
                  Return Home
                </a>
              </div>
            </div>
          )}

          {/* STEP 5: Payment Failed */}
          {step === 5 && (
            <div
              className={`${styles.successContainer} ${styles.failedContainer}`}
            >
              <motion.div
                className={`${styles.successIcon} ${styles.failedIcon}`}
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
                  <motion.line
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                  />
                  <motion.line
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                  />
                </motion.svg>
              </motion.div>
              <h2>Payment Failed</h2>
              <p>
                We could not complete your transaction. Please check your card
                details and try again, or use a different payment method.
              </p>

              <div
                className={styles.buttonContainer}
                style={{ justifyContent: "center", border: "none" }}
              >
                <button
                  className={styles.backBtn}
                  onClick={prevStep}
                  style={{ width: "100%", maxWidth: "300px" }}
                >
                  Back to Payment Options
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
