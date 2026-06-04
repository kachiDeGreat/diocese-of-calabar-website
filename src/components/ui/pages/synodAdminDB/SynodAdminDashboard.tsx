import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import styles from "./SynodAdminDashboard.module.css";
import { db } from "../../../../firebase";
import SEO from "../../page-components/SEO";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";

interface Delegate {
  id: string;
  title: string;
  fullName: string;
  email: string;
  phone?: string;
  archdeaconry: string;
  church: string;
  designation: string;
  delegateId: string;
  photoUrl: string;
  amountPaid: number;
  completedAt: string;
}

export default function SynodAdminDashboard() {
  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDelegate, setSelectedDelegate] = useState<Delegate | null>(
    null,
  );

  const [chartMetric, setChartMetric] = useState<"revenue" | "delegates">(
    "revenue",
  );
  const [timeFilter, setTimeFilter] = useState<number>(30);

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

    const toastId = toast.loading("Generating CR80 ID Card...");

    try {
      const canvas = await html2canvas(cardElement, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        scrollY: -window.scrollY,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById("delegate-id-card");
          if (el) {
            el.style.transform = "none";
            el.style.margin = "0";
          }
        },
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [2.125, 3.375],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, 2.125, 3.375);
      pdf.save(`Synod_2026_ID_${selectedDelegate.delegateId}.pdf`);

      toast.success("ID Card downloaded successfully!", { id: toastId });
    } catch (error) {
      toast.error("Failed to generate PDF. Please try again.", { id: toastId });
    }
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

  const PIE_COLORS = [
    "#c52810",
    "#f59e0b",
    "#1f0805",
    "#3b82f6",
    "#10b981",
    "#8b5cf6",
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{label}</p>
          <p className={styles.tooltipData}>
            {chartMetric === "revenue" ? "₦" : ""}
            {payload[0].value.toLocaleString()}{" "}
            {chartMetric === "revenue" ? "" : "Delegates"}
          </p>
        </div>
      );
    }
    return null;
  };

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
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Secure Logout
        </button>
      </header>

      {isLoading ? (
        <div className={styles.loadingState}>Loading encrypted data...</div>
      ) : (
        <main className={styles.mainContent}>
          {/* ANALYTICS CHARTS SECTION */}
          <div className={styles.dashboardGrid}>
            {/* Left: Interactive Bar Chart */}
            <div className={styles.chartCard}>
              <div className={styles.chartControlsRow}>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(Number(e.target.value))}
                  className={styles.chartSelect}
                >
                  <option value={7}>Last 7 days</option>
                  <option value={30}>Last 30 days</option>
                  <option value={90}>Last 90 days</option>
                </select>

                <select
                  value={chartMetric}
                  onChange={(e) =>
                    setChartMetric(e.target.value as "revenue" | "delegates")
                  }
                  className={styles.chartSelectBold}
                >
                  <option value="revenue">Revenue NGN</option>
                  <option value="delegates">Registered Delegates</option>
                </select>
              </div>

              <div className={styles.chartTotalDisplay}>
                {chartMetric === "revenue" ? "₦" : ""}
                {currentChartTotal.toLocaleString()}
              </div>

              <div className={styles.barChartWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis
                      dataKey="displayDate"
                      tick={{ fontSize: 12, fill: "#888" }}
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#888" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) =>
                        chartMetric === "revenue" && value >= 1000
                          ? `${value / 1000}k`
                          : value
                      }
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(0,0,0,0.04)" }}
                    />
                    <Bar
                      dataKey={chartMetric}
                      fill={chartMetric === "revenue" ? "#dcfce7" : "#dbeafe"}
                      stroke={chartMetric === "revenue" ? "#22c55e" : "#3b82f6"}
                      strokeWidth={1}
                      radius={[4, 4, 0, 0]}
                      barSize={timeFilter === 7 ? 40 : 15}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={styles.pieCard}>
              <h3 className={styles.pieTitle}>Archdeaconry Breakdown</h3>

              {pieData.length > 0 ? (
                <div className={styles.pieChartWrapper}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="45%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: any) => [
                          `${value || 0} Delegates`,
                          "Registrations",
                        ]}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ fontSize: "12px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className={styles.emptyPie}>No data available yet.</div>
              )}
            </div>
          </div>

          {/* TABLE SECTION */}
          <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
              <h2>Recent Registrations</h2>
              <div className={styles.headerActions}>
                <button onClick={fetchDelegates} className={styles.refreshBtn}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                  Refresh
                </button>
                <button
                  onClick={handleDeleteAll}
                  className={styles.deleteAllBtn}
                  disabled={delegates.length === 0}
                >
                  Danger: Delete All
                </button>
              </div>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Unique ID</th>
                    <th>Full Name</th>
                    <th>Designation</th>
                    <th>Archdeaconry</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {delegates.length === 0 ? (
                    <tr>
                      <td colSpan={6} className={styles.emptyState}>
                        No delegates registered yet.
                      </td>
                    </tr>
                  ) : (
                    delegates.map((del) => (
                      <tr key={del.id}>
                        <td>
                          <img
                            src={
                              del.photoUrl || "https://via.placeholder.com/150"
                            }
                            alt="Profile"
                            className={styles.tableAvatar}
                          />
                        </td>
                        <td>
                          <span className={styles.tagId}>{del.delegateId}</span>
                        </td>
                        <td>
                          <strong>
                            {del.title} {del.fullName}
                          </strong>
                          <br />
                          <span className={styles.subEmail}>{del.email}</span>
                          <br />
                          <span className={styles.subEmail}>
                            {del.phone || "No phone provided"}
                          </span>
                        </td>
                        <td>{del.designation}</td>
                        <td>{del.archdeaconry}</td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button
                              onClick={() => setSelectedDelegate(del)}
                              className={styles.viewBtn}
                            >
                              View ID
                            </button>
                            <button
                              onClick={() => handleDelete(del.id, del.fullName)}
                              className={styles.deleteBtn}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {selectedDelegate && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedDelegate(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeModal}
              onClick={() => setSelectedDelegate(null)}
            >
              ✕
            </button>

            <div className={styles.idCardPreviewContainer}>
              <div className={styles.idCard} id="delegate-id-card">
                <div className={styles.watermarkLogo}></div>

                <div className={styles.idCardHeader}>
                  <span className={styles.idCardDiocese}>
                    DIOCESE OF CALABAR
                  </span>
                  <span className={styles.idCardCommunion}>
                    (ANGLICAN COMMUNION)
                  </span>
                  <h3 className={styles.idCardTitle}>SYNOD 2026</h3>
                </div>

                <div className={styles.idCardProfileWrapper}>
                  <img
                    crossOrigin="anonymous"
                    src={
                      selectedDelegate.photoUrl ||
                      "https://via.placeholder.com/150"
                    }
                    alt="Delegate"
                    className={styles.idCardPhoto}
                  />
                </div>

                <div className={styles.idCardBody}>
                  <h2 className={styles.idCardName}>
                    {selectedDelegate.title} {selectedDelegate.fullName}
                  </h2>
                  <p className={styles.idCardRole}>
                    {selectedDelegate.designation}
                  </p>

                  <div className={styles.idThemeCard}>
                    <div className={styles.idThemeTop}>
                      <span className={styles.idLabel}>THEME</span>
                      <div className={styles.idUnderlineCenter}></div>
                      <strong className={styles.idThemeTitle}>
                        "Not Offended In Me"
                      </strong>
                      <span className={styles.idThemeSub}>Matthew 11:6</span>
                    </div>
                    <div className={styles.idThemeBottom}>
                      <div className={styles.idThemeBottomLeft}>
                        <span className={styles.idLabel}>DATES</span>
                        <div className={styles.idUnderlineLeft}></div>
                        <strong className={styles.idValue}>
                          8th - 12th
                          <br />
                          July, 2026
                        </strong>
                      </div>
                      <div className={styles.idThemeBottomRight}>
                        <span className={styles.idLabel}>VENUE</span>
                        <div className={styles.idUnderlineLeft}></div>
                        <strong className={styles.idValue}>
                          Cathedral Church of Holy Trinity,
                          <br />
                          Calabar, CRS.
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className={styles.idDetailsGrid}>
                    <div className={styles.idDetailBox}>
                      <span className={styles.idDetailLabel}>ARCHDEACONRY</span>
                      <strong className={styles.idDetailValue}>
                        {selectedDelegate.archdeaconry}
                      </strong>
                    </div>
                    <div className={styles.idDetailBox}>
                      <span className={styles.idDetailLabel}>
                        CHURCH/PARISH
                      </span>
                      <strong className={styles.idDetailValue}>
                        {selectedDelegate.church}
                      </strong>
                    </div>
                    <div className={styles.idDetailBox}>
                      <span className={styles.idDetailLabel}>PHONE NUMBER</span>
                      <strong className={styles.idDetailValue}>
                        {selectedDelegate.phone || "N/A"}
                      </strong>
                    </div>
                    <div className={styles.idDetailBox}>
                      <span className={styles.idDetailLabel}>UNIQUE ID</span>
                      <strong
                        className={`${styles.idDetailValue} ${styles.idDetailHighlight}`}
                      >
                        {selectedDelegate.delegateId}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* <div className={styles.idCardFooter}>
                  {selectedDelegate.archdeaconry} •{" "}
                  {selectedDelegate.delegateId}
                </div> */}
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.printBtn} onClick={downloadIDCard}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                Print / Save CR80 ID Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
