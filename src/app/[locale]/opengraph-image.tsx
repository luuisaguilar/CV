import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Luis Aguilar — Engineer & Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === "es";

  const greeting = isEs ? "Ingeniero · Builder" : "Engineer · Builder";
  const tagline = isEs
    ? "Construyo productos inteligentes — SaaS, IA, automatización"
    : "I build intelligent products — SaaS, AI, automation";
  const cta = isEs ? "luisaguilaraguila.com" : "luisaguilaraguila.com";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background:
            "radial-gradient(ellipse 90% 70% at 25% -10%, rgba(124,58,237,0.45) 0%, transparent 70%)," +
            "radial-gradient(ellipse 60% 50% at 90% 110%, rgba(0,212,170,0.25) 0%, transparent 65%)," +
            "linear-gradient(135deg, #080810 0%, #0f0f1a 100%)",
          color: "#f0f0ff",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          position: "relative",
        }}
      >
        {/* Top row: monogram + locale chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            LA
            <span style={{ color: "#7C3AED" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 18px",
              borderRadius: 999,
              background: "rgba(0,212,170,0.12)",
              border: "1px solid rgba(0,212,170,0.4)",
              color: "#00D4AA",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#00D4AA",
              }}
            />
            {isEs ? "Disponible" : "Available"}
          </div>
        </div>

        {/* Middle: name + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 28,
              color: "#7C3AED",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {greeting}
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 1,
              backgroundImage:
                "linear-gradient(135deg, #f0f0ff 0%, #a78bfa 60%, #00D4AA 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Luis Aguilar
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#a0a0c0",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            {tagline}
          </div>
        </div>

        {/* Bottom: stack pills + url */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            {["Next.js", "Python", "Supabase", "Claude", "n8n"].map((s) => (
              <div
                key={s}
                style={{
                  padding: "10px 20px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: 22,
                  color: "#a0a0c0",
                }}
              >
                {s}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#606080",
              letterSpacing: "0.06em",
            }}
          >
            {cta}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
