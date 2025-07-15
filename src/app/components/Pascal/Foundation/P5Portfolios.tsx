"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./css/P4Portfolio.module.css";

// Sample projects data
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link?: string;
  github?: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
}
// const onPortfolio = "Discover how we've helped businesses achieve their technology goals";
// const , subtitle = onPortfolio

export function S5Portfolios({ projects }: ProjectShowcaseProps) {
  // export function S5Portfolios({ projects, title = "Our Portfolio", subtitle = onPortfolio }: ProjectShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // console.log(title.length, subtitle.length);

  // Get all unique tags from projects
  const allTags = ["All", ...new Set(projects.flatMap((project) => project.tags))];
  // Filter projects based on active filter
  const filteredProjects = activeFilter === "All" ? projects : projects.filter((project) => project.tags.includes(activeFilter));

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    //  <section className={styles.showcaseContainer}>
    <section>
      {/* </section> */}
      {/* <div className={styles.showcaseHeader}> */}
      {/* <h2 className={styles.showcaseTitle}>{title}</h2> */}
      {/* <p className={styles.showcaseSubtitle}>{subtitle}</p> */}
      {/* </div> */}

      {/* Filter buttons */}
      <div className={styles.filterContainer}>
        {allTags.map((tag) => (
          <button key={tag} className={`${styles.filterButton} ${activeFilter === tag ? styles.active : ""}`} onClick={() => setActiveFilter(tag)}>
            {tag}
          </button>
        ))}
      </div>
      {/* Projects grid */}
      <div className={styles.projectsGrid}>
        {filteredProjects.map((project) => (
          <div key={project.id} className={styles.projectCard} onClick={() => openModal(project)}>
            <div className={styles.imageContainer}>
              <Image src={project.imageUrl} alt={project.title} fill className={styles.projectImage} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className={styles.imageOverlay} />
            </div>
            <div className={styles.projectInfo}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <div className={styles.tagsContainer}>
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Project Modal */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              &times;
            </button>

            <div className={styles.modalImageContainer}>
              <Image src={selectedProject.imageUrl} alt={selectedProject.title} fill className={styles.modalImage} />
            </div>

            <div className={styles.modalDetails}>
              <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
              <p className={styles.modalDescription}>{selectedProject.description}</p>

              <div className={styles.modalTags}>
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className={styles.modalTag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.modalLinks}>
                {selectedProject.link && (
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className={styles.modalLink}>
                    View Live
                  </a>
                )}
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className={styles.modalLinkSecondary}>
                    View tests
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
