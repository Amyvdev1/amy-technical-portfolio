import { Link } from "wouter";
import "@/pages/review-paths.css";

const reviewPaths = [
  {
    slug: "api-documentation",
    number: "01",
    title: "API Documentation",
    question: "Can a reader get from setup to a result they understand?",
  },
  {
    slug: "security-writing",
    number: "02",
    title: "Security Writing",
    question: "Can a security claim survive a closer look?",
  },
  {
    slug: "developer-education",
    number: "03",
    title: "Developer Education",
    question: "Does the explanation help someone decide what to do next?",
  },
];

export default function ReviewPaths() {
  return (
    <section className="review-paths" aria-labelledby="review-paths-heading">
      <div className="path-section-heading">
        <p className="path-eyebrow">THREE WAYS INTO THE WORK</p>
        <h2 id="review-paths-heading">
          Choose the question.
          <br />
          <em>Follow the evidence.</em>
        </h2>
        <p>
          Curated routes through code, documentation and working examples. Start
          with the discipline you want to explore.
        </p>
      </div>
      <div className="path-grid">
        {reviewPaths.map(path => (
          <Link
            key={path.slug}
            href={`/explore/${path.slug}`}
            className="path-card"
          >
            <span className="path-eyebrow">PATH / {path.number}</span>
            <h3>{path.title}</h3>
            <p>{path.question}</p>
            <span className="path-card-action">
              Explore this path <span aria-hidden="true">↗</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
