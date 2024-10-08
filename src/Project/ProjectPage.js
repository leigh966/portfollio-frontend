import ProjectBannerImage from "../ProjectBannerImage";
import "./ProjectPage.css";
import { useParams } from "react-router-dom";
import { getProjects } from "../apiFixings";
import { useEffect, useState } from "react";
import PortfollioErrorHandler from "../PortfollioErrorhandler";
import ReactMarkdown from "react-markdown";

export default function ProjectPage({ projects, setProjects }) {
  const { id } = useParams();
  const [error, setError] = useState(null);
  useEffect(() => {
    getProjects(setProjects, setError);
  }, []);
  if (error) {
    return <PortfollioErrorHandler error={error} />;
  }
  if (projects.length === 0) return "Fetching projects";
  const project = projects.find((proj) => proj.id === id);
  if (project === undefined) {
    return <h1>404: No such project</h1>;
  }
  return (
    <>
      <ProjectBannerImage
        filename={project.image_filename}
        className={"project-page-banner-img"}
      />
      <h1>{project.name}</h1>
      <h3>{project.tagline}</h3>
      <ReactMarkdown>
        {project.description.replaceAll("<br/>", "\n")}
      </ReactMarkdown>
    </>
  );
}
