import styles from "./Dashboard.module.css";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Skeleton from "@mui/material/Skeleton";
import WithAuthHOC from "../../utils/HOC/withAuthHOC";
import { useState, useContext } from "react";
import axios from "../../utils/axios";
import { AuthContext } from "../../utils/AuthContext";

const Dashboard = () => {
  const [uploadFiletext, setUploadFileText] = useState("Upload your resume");

  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

  const { userInfo } = useContext(AuthContext);

  // PDF select hone par
  const handleOnChangeFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setResumeFile(file);
    setUploadFileText(file.name);
  };

  // Analyze button
  const handleUpload = async () => {
    if (!resumeFile) {
      alert("Please upload your resume");
      return;
    }

    if (!jobDesc.trim()) {
      alert("Please enter the job description");
      return;
    }

    if (!userInfo?._id) {
      alert("User information not found. Please login again.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();

      formData.append("resume", resumeFile);
      formData.append("job_desc", jobDesc);
      formData.append("user", userInfo._id);

      const response = await axios.post("/resume/addResume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Resume response:", response.data);

      setResult(response.data);
    } catch (err) {
      console.log("Resume upload error:", err);

      alert(
        err.response?.data?.message ||
          "Something went wrong while analyzing resume",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.Dashboard}>
      {/* ================= LEFT SIDE ================= */}

      <div className={styles.DashboardLeft}>
        {/* HEADER */}
        <div className={styles.DashboardHeader}>
          <div className={styles.DashboardHeaderTitle}>
            Smart Resume Screening
          </div>

          <div className={styles.DashboardHeaderLargeTitle}>
            Welcome, {userInfo?.name || "User"}
          </div>
        </div>

        {/* INFORMATION */}
        <div className={styles.alertInfo}>
          <CreditScoreIcon />

          <span className={styles.dashboardInstruction}>
            Upload your resume and paste the job description to analyze your
            resume using AI.
          </span>
        </div>

        {/* RESUME UPLOAD */}
        <div className={styles.DashboardUploadResume}>
          <div className={styles.DashboardResumeBlock}>
            <div className={styles.DashboardInputField}>
              <label htmlFor="resumeUpload">📄 {uploadFiletext}</label>

              <input
                id="resumeUpload"
                type="file"
                accept=".pdf"
                onChange={handleOnChangeFile}
              />
            </div>
          </div>

          <label htmlFor="resumeUpload" className={styles.analyzeAIBtn}>
            Upload PDF
          </label>
        </div>

        {/* JOB DESCRIPTION */}
        <div className={styles.jobDesc}>
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            className={styles.textArea}
            placeholder="Paste Your Job Description"
            rows={10}
            cols={50}
          />

          <div className={styles.AnalyzeBtn} onClick={handleUpload}>
            Analyze
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}

      <div className={styles.DashboardRight}>
        {/* USER CARD */}
        <div className={styles.DashboardRightTopCard}>
          <div>Analyze With AI</div>

          {userInfo?.photoUrl && (
            <img
              className={styles.profileImg}
              src={userInfo.photoUrl}
              alt="Profile"
            />
          )}

          <h2>{userInfo?.name}</h2>
        </div>

        {/* LOADING */}
        {loading && (
          <Skeleton
            variant="rectangular"
            sx={{
              borderRadius: "20px",
            }}
            width={280}
            height={280}
          />
        )}

        {/* RESULT */}
        {result && !loading && (
          <div className={styles.DashboardRightTopCard}>
            <div>Result</div>

            <h2>Score: {result.data?.score || "N/A"}</h2>

            <p>
              {result.data?.feedback ||
                result.message ||
                "Resume analyzed successfully."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithAuthHOC(Dashboard);
