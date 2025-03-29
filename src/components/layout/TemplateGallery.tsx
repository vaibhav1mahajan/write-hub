"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "",
  },
  {
    id: "software-proposal",
    label: "Software Development Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
        <h1>Software Development Proposal</h1>
    <h2>1. Project Overview</h2>
    <p>Brief description of the project, goals, and objectives.</p>
    
    <h2>2. Scope of Work</h2>
    <ul>
        <li>Features and functionalities</li>
        <li>Technical requirements</li>
        <li>Deliverables</li>
    </ul>

    <h2>3. Timeline & Milestones</h2>
    <p>Estimated phases and completion dates.</p>

    <h2>4. Budget</h2>
    <p>Cost estimation and payment terms.</p>

    <h2>5. Terms & Conditions</h2>
    <p>Legal terms and project guidelines.</p>

    <h2>6. Contact Information</h2>
    <p>Company name, email, and phone number.</p>
      `,
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
        <h1>Project Proposal</h1>
    <h2>1. Title</h2>
    <p>[Project Title]</p>

    <h2>2. Objective</h2>
    <p>Define the purpose and goals of the project.</p>

    <h2>3. Methodology</h2>
    <p>Explain the methods and strategies to achieve the goals.</p>

    <h2>4. Timeline</h2>
    <p>List the project phases with deadlines.</p>

    <h2>5. Resources Required</h2>
    <p>Specify personnel, technology, and financial requirements.</p>

    <h2>6. Expected Outcomes</h2>
    <p>Define the deliverables and success metrics.</p>

    <h2>7. Contact Information</h2>
    <p>Details of the project proposer.</p>
      `,
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
        <p>[Your Name]</p>
    <p>[Your Address]</p>
    <p>[City, State, ZIP Code]</p>
    <p>[Email]</p>
    <p>[Phone Number]</p>
    <p>[Date]</p>

    <p>[Recipient’s Name]</p>
    <p>[Recipient’s Title]</p>
    <p>[Company Name]</p>
    <p>[Company Address]</p>

    <h2>Subject: [Letter Subject]</h2>
    
    <p>Dear [Recipient’s Name],</p>

    <p>Introduction paragraph: State the purpose of the letter.</p>

    <p>Body paragraph: Explain the details or offer supporting information.</p>

    <p>Closing paragraph: Mention next steps or thank the recipient.</p>

    <p>Sincerely,</p>
    <p>[Your Name]</p>
      `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
           <h1>[Your Name]</h1>
    <p>[Email] | [Phone] | [LinkedIn/GitHub]</p>

    <h2>Summary</h2>
    <p>Brief introduction highlighting your skills and experience.</p>

    <h2>Experience</h2>
    <h3>[Job Title]</h3>
    <p>[Company Name] | [Date]</p>
    <ul>
        <li>Responsibility 1</li>
        <li>Responsibility 2</li>
        <li>Achievement or skill gained</li>
    </ul>

    <h2>Education</h2>
    <p>[Degree] - [Institution]</p>
    <p>[Year of Graduation]</p>

    <h2>Skills</h2>
    <ul>
        <li>Skill 1</li>
        <li>Skill 2</li>
        <li>Skill 3</li>
    </ul>
        `,
  },
  {
    id: "cover-letter",
    label: "Cover letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
           <p>[Your Name]</p>
    <p>[Your Address]</p>
    <p>[City, State, ZIP Code]</p>
    <p>[Email]</p>
    <p>[Phone Number]</p>
    <p>[Date]</p>

    <p>[Hiring Manager’s Name]</p>
    <p>[Company Name]</p>
    <p>[Company Address]</p>

    <h2>Subject: Application for [Job Title]</h2>
    
    <p>Dear [Hiring Manager's Name],</p>

    <p>Introductory paragraph: State the job you are applying for and why you are interested.</p>

    <p>Body paragraph: Highlight relevant skills and experiences.</p>

    <p>Closing paragraph: Express enthusiasm and request for an interview.</p>

    <p>Thank you for your consideration.</p>
    
    <p>Sincerely,</p>
    <p>[Your Name]</p>
        `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
           <p>[Your Name]</p>
    <p>[Your Address]</p>
    <p>[City, State, ZIP Code]</p>
    <p>[Email]</p>
    <p>[Phone Number]</p>
    <p>[Date]</p>

    <p>[Recipient’s Name]</p>
    <p>[Recipient’s Address]</p>

    <h2>Subject: [Letter Subject]</h2>
    
    <p>Dear [Recipient’s Name],</p>

    <p>Opening paragraph: Introduce the purpose of the letter.</p>

    <p>Body paragraph: Provide details, context, or relevant information.</p>

    <p>Closing paragraph: Conclude with a call to action or final thoughts.</p>

    <p>Thank you,</p>
    <p>[Your Name]</p>
        `,
  },
];

const TemplateGallery = () => {
  const router = useRouter();
  const create = useMutation(api.documents.create);

  const [isCreating, setIsCreating] = useState(false);

  const onTemplateClick = (title: string, initialContent: string) => {
    setIsCreating(true);
    create({ title, initialContent })
      .catch(() => toast.error("Something went wrong"))
      .then((documentId) => {
        toast.success("Document created");
        router.push(`/documents/${documentId}`);
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  return (
    <div className="bg-[#F1F3F4]">
      <div className="flex flex-col max-w-screen-xl px-16 py-6 mx-auto gap-y-4">
        <h3 className="font-medium">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4 ">
            {templates.map(({ label, imageUrl, id, initialContent }) => (
              <CarouselItem
                key={id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
              >
                <div
                  className={cn(
                    "flex flex-col gap-y-2.5 aspect-[3/4]",
                    isCreating && "pointer-events-none opacity-50"
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={() => {
                      onTemplateClick(label, initialContent);
                    }}
                    className="flex flex-col items-center justify-center transition bg-white border rounded-sm size-full hover:border-blue-500 hover:bg-blue-50 gap-y-4 "
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <p className="text-sm font-medium truncate">{label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default TemplateGallery;
