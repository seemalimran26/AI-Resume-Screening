import styles from "./History.module.css";
import { Skeleton } from "@mui/material";
import WithAuthHOC from "../../utils/HOC/withAuthHOC";
import { useState, useEffect, useContext } from "react";
import axios from "../../utils/axios";
import { AuthContext } from "../../utils/AuthContext";

const History = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoader(true);

        console.log("User Info:", userInfo);

        const user = userInfo?._id || userInfo?.id || userInfo?.email;

        if (!user) {
          console.log("User information not found");
          return;
        }

        const response = await axios.get(`/resume/get/${user}`);

        console.log("History Data:", response.data);

        setData(response.data.data || []);
      } catch (error) {
        console.error("History Error:", error);
      } finally {
        setLoader(false);
      }
    };

    if (userInfo) {
      fetchUserData();
    }
  }, [userInfo]);

  return (
    <div className={styles.History}>
      <div className={styles.HistoryContainer}>
        {/* HEADER */}
        <div className={styles.HistoryHeader}>
          <div>
            <p className={styles.Overline}>MY ACTIVITY</p>

            <h1>Screening History</h1>

            <p className={styles.Subtitle}>
              View your previous resume screening results.
            </p>
          </div>

          <div className={styles.TotalCard}>
            <span>Total Screenings</span>
            <strong>{data.length}</strong>
          </div>
        </div>

        {/* LOADING */}
        {loader && (
          <div className={styles.HistoryCardBlock}>
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={item}
                variant="rectangular"
                width="100%"
                height={300}
                sx={{ borderRadius: "20px" }}
              />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loader && data.length === 0 && (
          <div className={styles.EmptyState}>
            <div className={styles.EmptyIcon}>📄</div>

            <h2>No Screening History</h2>

            <p>
              Your resume screening results will appear here after you analyze a
              resume.
            </p>
          </div>
        )}

        {/* HISTORY CARDS */}
        {!loader && data.length > 0 && (
          <div className={styles.HistoryCardBlock}>
            {data.map((item) => (
              <div key={item._id} className={styles.HistoryCard}>
                {/* CARD HEADER */}
                <div className={styles.CardHeader}>
                  <div className={styles.ResumeIcon}>📄</div>

                  <div className={styles.ScoreBadge}>{item.score}%</div>
                </div>

                {/* RESUME NAME */}
                <h2 className={styles.ResumeName}>{item.resume_name}</h2>

                {/* SCORE LABEL */}
                <div className={styles.MatchText}>Resume Match Score</div>

                {/* FEEDBACK */}
                <div className={styles.FeedbackBox}>
                  <div className={styles.FeedbackTitle}>
                    <span>🤖</span>
                    <h3>AI Feedback</h3>
                  </div>

                  <p>{item.feedback}</p>
                </div>

                {/* DATE */}
                <div className={styles.CardFooter}>
                  <span>Screened on</span>

                  <strong>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "N/A"}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WithAuthHOC(History);
