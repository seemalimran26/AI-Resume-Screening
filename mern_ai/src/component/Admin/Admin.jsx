import React, { useState, useEffect } from "react";
import styles from "./Admin.module.css";
import { Skeleton } from "@mui/material";
import WithAuthHOC from "../../utils/HOC/withAuthHOC";
import axios from "../../utils/axios";

const Admin = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoader(true);

        const response = await axios.get("/resume/get");

        console.log("Admin Data:", response.data);

        setData(response.data.data || []);
      } catch (error) {
        console.error("Admin Error:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className={styles.Admin}>
      <div className={styles.AdminContainer}>
        {/* HEADER */}
        <div className={styles.PageHeader}>
          <div>
            <div className={styles.TitleRow}>
              <span className={styles.TitleDot}></span>
              <p className={styles.Overline}>ADMIN DASHBOARD</p>
            </div>

            <h1>Resume Screening</h1>

            <p className={styles.Subtitle}>
              Track, review and analyze candidate resume performance.
            </p>
          </div>

          <div className={styles.TotalCard}>
            <div className={styles.TotalIcon}>
              <span>⌁</span>
            </div>

            <div className={styles.TotalContent}>
              <span>Total Screenings</span>
              <strong>{data.length}</strong>
            </div>
          </div>
        </div>

        {/* STATS */}
        {!loader && data.length > 0 && (
          <div className={styles.StatsRow}>
            <div className={styles.StatCard}>
              <div className={styles.StatIcon}>◉</div>
              <div>
                <span>Screenings</span>
                <strong>{data.length}</strong>
              </div>
            </div>

            <div className={styles.StatCard}>
              <div className={styles.StatIcon}>%</div>
              <div>
                <span>Average Score</span>
                <strong>
                  {Math.round(
                    data.reduce(
                      (total, item) => total + Number(item.score || 0),
                      0,
                    ) / data.length,
                  )}
                  %
                </strong>
              </div>
            </div>

            <div className={styles.StatCard}>
              <div className={styles.StatIcon}>✓</div>
              <div>
                <span>Latest Screening</span>
                <strong>
                  {data[0]?.createdAt
                    ? new Date(data[0].createdAt).toLocaleDateString()
                    : "N/A"}
                </strong>
              </div>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loader && (
          <div className={styles.AdminBlock}>
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={item}
                variant="rectangular"
                width="100%"
                height={430}
                sx={{ borderRadius: "22px" }}
              />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loader && data.length === 0 && (
          <div className={styles.EmptyState}>
            <div className={styles.EmptyIcon}>📄</div>

            <h2>No Screening Results</h2>

            <p>
              Resume screening results will appear here once candidates submit
              their resumes.
            </p>
          </div>
        )}

        {/* SCREENING CARDS */}
        {!loader && data.length > 0 && (
          <>
            <div className={styles.SectionHeading}>
              <div>
                <h2>Screening Records</h2>
                <p>Recent candidate analysis</p>
              </div>

              <span>{data.length} Records</span>
            </div>

            <div className={styles.AdminBlock}>
              {data.map((item) => (
                <div className={styles.AdminCard} key={item._id}>
                  {/* CARD TOP */}
                  <div className={styles.CardHeader}>
                    <div className={styles.ResumeFile}>
                      <div className={styles.ResumeIcon}>📄</div>

                      <div>
                        <span>RESUME</span>
                        <h3>{item.resume_name}</h3>
                      </div>
                    </div>

                    <div className={styles.ScoreBadge}>
                      <strong>{item.score}%</strong>
                      <span>Match</span>
                    </div>
                  </div>

                  {/* CANDIDATE */}
                  <div className={styles.CandidateBox}>
                    <div className={styles.Avatar}>
                      {(item.user?.name || item.user?.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className={styles.CandidateInfo}>
                      <span>CANDIDATE</span>

                      <strong>
                        {item.user?.name || item.user?.email || "Unknown User"}
                      </strong>
                    </div>
                  </div>

                  {/* JOB DESCRIPTION */}
                  <div className={styles.InfoSection}>
                    <div className={styles.SectionTitle}>
                      <span className={styles.SectionIcon}>💼</span>

                      <h4>Job Description</h4>
                    </div>

                    <p>{item.job_desc}</p>
                  </div>

                  {/* FEEDBACK */}
                  <div className={styles.FeedbackSection}>
                    <div className={styles.SectionTitle}>
                      <span className={styles.SectionIcon}>✦</span>

                      <h4>AI Screening Feedback</h4>
                    </div>

                    <p>{item.feedback}</p>
                  </div>

                  {/* FOOTER */}
                  <div className={styles.CardFooter}>
                    <div>
                      <span>SCREENED ON</span>

                      <strong>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "N/A"}
                      </strong>
                    </div>

                    <div className={styles.Status}>
                      <span></span>
                      Analyzed
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WithAuthHOC(Admin);
