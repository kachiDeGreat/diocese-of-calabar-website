import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import styles from "./SynodAdminDashboard.module.css";
import { db } from "../../../../firebase";
import SEO from "../../page-components/SEO";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
import { Delegate } from "./types";
import DashboardCharts from "./DashboardCharts";
import DelegatesTable from "./DelegatesTable";
import DelegateIDCardModal from "./DelegateIDCardModal";
import BatchIDDownloader from "./BatchIDDownloader";

export default function SynodAdminDashboard() {
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [selectedDelegate, setSelectedDelegate] = useState<Delegate | null>(
    null,
  );

  const [chartMetric, setChartMetric] = useState<"revenue" | "delegates">(
    "revenue",
  );
  const [timeFilter, setTimeFilter] = useState<number>(30);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 500;

  const navigate = useNavigate();

  const fetchDelegates = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(
        collection(db, "synod_registrations"),
      );
      const data: Delegate[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Delegate);
      });
      data.sort(
        (a, b) =>
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
      );
      setDelegates(data);
    } catch (error) {
      toast.error("Failed to load dashboard data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDelegates();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${name}? This cannot be undone.`,
      )
    ) {
      try {
        await deleteDoc(doc(db, "synod_registrations", id));
        setDelegates(delegates.filter((d) => d.id !== id));
        toast.success("Delegate deleted successfully.");
      } catch (error) {
        toast.error("Error deleting delegate.");
      }
    }
  };

  const handleDeleteAll = async () => {
    const confirmText = prompt(
      "Type 'DELETE ALL' to confirm wiping the entire registration database.",
    );
    if (confirmText === "DELETE ALL") {
      try {
        setIsLoading(true);
        for (const delegate of delegates) {
          await deleteDoc(doc(db, "synod_registrations", delegate.id));
        }
        setDelegates([]);
        toast.success("All registrations have been deleted.");
      } catch (error) {
        toast.error("Error wiping database.");
      } finally {
        setIsLoading(false);
      }
    } else if (confirmText) {
      toast.error("Action cancelled: Text did not match.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("synodAdminAuth");
      navigate("/synod-2026-admin");
    } catch (error) {
      toast.error("Error logging out.");
    }
  };

  const downloadIDCard = async () => {
    const cardElement = document.getElementById("delegate-id-card");
    if (!cardElement || !selectedDelegate) return;

    setIsGeneratingPDF(true);
    const toastId = toast.loading("Generating CR80 ID Card...");

    // Yield to the browser main thread to allow React to update the UI
    setTimeout(async () => {
      try {
        // 1. Grab the exact on-screen pixel dimensions before doing anything
        const { width, height } = cardElement.getBoundingClientRect();

        const canvas = await html2canvas(cardElement, {
          scale: 4, // High resolution
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          // 2. Force the canvas to respect these exact dimensions
          width: width,
          height: height,
          windowWidth: document.documentElement.offsetWidth,
          windowHeight: document.documentElement.offsetHeight,
          scrollY: -window.scrollY,
          onclone: (clonedDoc) => {
            const el = clonedDoc.getElementById("delegate-id-card");
            if (el) {
              el.style.transform = "none";
              el.style.margin = "0";
              // 3. Lock the cloned DOM node so flexbox/grid cannot compress it
              el.style.width = `${width}px`;
              el.style.height = `${height}px`;
              el.style.maxWidth = `${width}px`;
              el.style.maxHeight = `${height}px`;

              // Find the image container and manually emulate object-fit: cover
              // to avoid pixelation issues with background images in html2canvas.
              const originalImageContainer = document.getElementById(
                "id-card-delegate-photo",
              );
              const originalImg = originalImageContainer?.querySelector("img");
              const imageContainer = clonedDoc.getElementById(
                "id-card-delegate-photo",
              );

              if (
                imageContainer &&
                originalImageContainer &&
                originalImg &&
                originalImg.naturalWidth
              ) {
                const imgElement = imageContainer.querySelector("img");
                if (imgElement) {
                  const containerW = originalImageContainer.offsetWidth;
                  const containerH = originalImageContainer.offsetHeight;
                  const containerRatio = containerW / containerH;
                  const imgRatio =
                    originalImg.naturalWidth / originalImg.naturalHeight;

                  imgElement.style.objectFit = "fill";
                  imgElement.style.position = "absolute";
                  imgElement.style.maxWidth = "none";
                  imgElement.style.maxHeight = "none";

                  if (imgRatio > containerRatio) {
                    const imgW = containerH * imgRatio;
                    imgElement.style.height = `${containerH}px`;
                    imgElement.style.width = `${imgW}px`;
                    imgElement.style.top = "0px";
                    imgElement.style.left = `${(containerW - imgW) / 2}px`;
                    imgElement.style.transform = "none";
                  } else {
                    const imgH = containerW / imgRatio;
                    imgElement.style.width = `${containerW}px`;
                    imgElement.style.height = `${imgH}px`;
                    imgElement.style.left = "0px";
                    imgElement.style.top = `${(containerH - imgH) / 2}px`;
                    imgElement.style.transform = "none";
                  }
                }
              }
            }
          },
        });

        const imgData = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = imgData;
        link.download = `Synod_2026_ID_${selectedDelegate.delegateId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("ID Card downloaded successfully!", { id: toastId });
      } catch (error) {
        toast.error("Failed to generate image. Please try again.", {
          id: toastId,
        });
      } finally {
        setIsGeneratingPDF(false);
      }
    }, 100);
  };

  const generateChartData = () => {
    const daysArray: {
      fullDate: string;
      displayDate: string;
      revenue: number;
      delegates: number;
    }[] = [];
    const now = new Date();

    for (let i = timeFilter - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const displayStr = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      daysArray.push({
        fullDate: dateStr,
        displayDate: displayStr,
        revenue: 0,
        delegates: 0,
      });
    }

    delegates.forEach((del) => {
      if (!del.completedAt) return;
      const delDate = new Date(del.completedAt).toISOString().split("T")[0];
      const dayIndex = daysArray.findIndex((d) => d.fullDate === delDate);
      if (dayIndex !== -1) {
        daysArray[dayIndex].revenue += del.amountPaid || 0;
        daysArray[dayIndex].delegates += 1;
      }
    });

    return daysArray;
  };

  const chartData = generateChartData();

  const totalPages = Math.ceil(delegates.length / itemsPerPage);

  useEffect(() => {
    if (delegates.length === 0) {
      setCurrentPage(1);
    } else if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [delegates.length, totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDelegates = delegates.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const currentChartTotal = chartData.reduce(
    (sum, day) =>
      sum + (chartMetric === "revenue" ? day.revenue : day.delegates),
    0,
  );

  const archBreakdown = delegates.reduce(
    (acc, del) => {
      acc[del.archdeaconry] = (acc[del.archdeaconry] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const pieData = Object.entries(archBreakdown).map(([name, value]) => ({
    name: name || "Unknown",
    value,
  }));

  return (
    <div className={styles.adminWrapper}>
      <SEO title="Dashboard | Synod Admin" description="Admin Dashboard" />
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#0e9f6e",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#c52810",
              color: "#fff",
            },
          },
        }}
      />

      <header className={styles.adminHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.logoBox}>Diocese of Calabar</div>
          <h1>Synod 2026 Operations</h1>
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          {/* New Button Here! */}
          <button
            onClick={() => setIsBatchModalOpen(true)}
            className={styles.payBtn}
            style={{ margin: 0, padding: "8px 16px" }}
          >
            Batch ID Download
          </button>

          <button onClick={handleLogout} className={styles.logoutBtn}>
            Secure Logout
          </button>
        </div>
      </header>

      {isLoading ? (
        <div className={styles.loadingState}>Loading encrypted data...</div>
      ) : (
        <main className={styles.mainContent}>
          <DashboardCharts
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            chartMetric={chartMetric}
            setChartMetric={setChartMetric}
            currentChartTotal={currentChartTotal}
            chartData={chartData}
            pieData={pieData}
          />

          <DelegatesTable
            delegates={delegates}
            currentDelegates={currentDelegates}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            fetchDelegates={fetchDelegates}
            handleDeleteAll={handleDeleteAll}
            handleDelete={handleDelete}
            setSelectedDelegate={setSelectedDelegate}
          />
        </main>
      )}

      {selectedDelegate && (
        <DelegateIDCardModal
          selectedDelegate={selectedDelegate}
          setSelectedDelegate={setSelectedDelegate}
          downloadIDCard={downloadIDCard}
          isGeneratingPDF={isGeneratingPDF}
        />
      )}
      {isBatchModalOpen && (
        <BatchIDDownloader
          delegates={delegates}
          onClose={() => setIsBatchModalOpen(false)}
        />
      )}
    </div>
  );
}
