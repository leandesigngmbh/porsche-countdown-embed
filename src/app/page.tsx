import Countdown from "@/lib/components/countdown";

export default function Home() {
  // Target: 09.09 at 12:00 local time (current year)
  const now = new Date();
  const target = new Date(now.getFullYear(), 8, 9, 12, 0, 0, 0); // Month is 0-indexed: 8 = September

  return <Countdown targetTime={target} />;
}
