import { siteConfig } from "@/lib/site";

export default function OgCard({
  eyebrow,
  title,
  description,
  footerLabel = "Visit the site →",
}: {
  eyebrow: string;
  title: string;
  description: string;
  footerLabel?: string;
}) {
  const shortTitle = title.length > 72 ? `${title.slice(0, 69)}…` : title;
  const shortDescription =
    description.length > 170 ? `${description.slice(0, 167)}…` : description;
  const titleSize = shortTitle.length > 46 ? 58 : 72;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0a",
        color: "#ece9e2",
        padding: "62px 72px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          fontSize: "21px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#8e96cc",
        }}
      >
        <span>{siteConfig.author}</span>
        <span style={{ color: "#4a4842" }}>/</span>
        <span style={{ color: "#94918a" }}>{eyebrow}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        <div
          style={{
            maxWidth: "980px",
            fontSize: `${titleSize}px`,
            lineHeight: 1.06,
            letterSpacing: "-0.035em",
          }}
        >
          {shortTitle}
        </div>
        {shortDescription && (
          <div
            style={{
              maxWidth: "800px",
              fontSize: "25px",
              lineHeight: 1.5,
              color: "#94918a",
            }}
          >
            {shortDescription}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(236, 233, 226, 0.12)",
          paddingTop: "22px",
          fontSize: "19px",
          color: "#78756e",
        }}
      >
        <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
        <span style={{ color: "#8e96cc" }}>{footerLabel}</span>
      </div>
    </div>
  );
}
