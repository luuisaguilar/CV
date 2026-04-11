import { redirect } from "next/navigation";

// Redirect root "/" to "/en" so the middleware handles locale detection
export default function RootPage() {
  redirect("/en");
}
