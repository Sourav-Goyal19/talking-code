"use client";

import { useGetAllProjects } from "@/features/apis/use-get-projects";
import { useProjectStore } from "@/zustand/project-store";
import { ArrowRight, Loader2 } from "lucide-react";
// import { useProjectsStore } from "@/zustand/project-store";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ProjectsList = () => {
  const session = useSession();
  const email = session.data?.user?.email;
  const { setProject } = useProjectStore();
  const projectQuery = useGetAllProjects(email!);

  const projects = projectQuery.data || [];
  const isDisabled = projectQuery.isLoading || projectQuery.isPending;

  return (
    <div className="mt-4">
      <h2 className="text-secondary-foreground/70 text-3xl font-semibold mb-4">
        Projects
      </h2>
      <div className="space-y-4">
        {isDisabled ? (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin size-8" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-secondary-foreground/70 text-center">
            No Projects Found
          </div>
        ) : (
          projects.map((project) => (
            <Link
              href={`dashboard/projects/${project.id}`}
              key={project.id}
              className="bg-custom2 rounded-md p-2 px-4 text-lg hover:opacity-80 cursor-pointer flex items-center justify-between"
              onClick={() => setProject(project)}
            >
              {project.name}
              <ArrowRight className="size-6" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
