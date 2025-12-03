import { redirect } from "next/navigation";

export default function Page() {
  // Redirect server-side to the login page so the app starts there.
  redirect("/auth/login");
}
