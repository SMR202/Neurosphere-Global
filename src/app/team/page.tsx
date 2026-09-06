import Image from "next/image";
import { PageIntro, EnquiryBand } from "@/components/editorial";
import { team } from "@/data/team";
import { explore } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Our Team",
  explore[3].description,
  "/team",
);
export default function TeamPage() {
  return (
    <>
      <PageIntro
        title={
          <>
            The people behind
            <br />
            NeuroSphere Global
          </>
        }
      >
        <p>{explore[3].description}</p>
      </PageIntro>
      <div className="container team-list">
        {team.map((member) => (
          <article className="team-profile" key={member.slug}>
            <div className="profile-identity">
              {member.role ? <p>{member.role}</p> : null}
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={360}
                />
              ) : (
                <span className="initials" aria-hidden="true">
                  {member.initials}
                </span>
              )}
            </div>
            <div className="profile-body">
              <h2>{member.name}</h2>
              {member.bio ? (
                <div className="profile-bio">
                  {member.bio
                    .split(/(?<=\.) (?=PhD |210\+ |Research spans)/)
                    .map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
              ) : (
                <dl className="missing-profile">
                  <div>
                    <dt>Role</dt>
                    <dd>TBD</dd>
                  </div>
                  <div>
                    <dt>Expertise summary</dt>
                    <dd>TBD — client to provide 1–2 sentences</dd>
                  </div>
                  <div>
                    <dt>Background / bio</dt>
                    <dd>TBD — client to provide 2–3 sentences</dd>
                  </div>
                </dl>
              )}
            </div>
          </article>
        ))}
      </div>
      <EnquiryBand />
    </>
  );
}
