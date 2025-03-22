import Image from "next/image";

export function SupabaseLogo() {
  return (
    <a href="https://supabase.com/docs" target="_blank">
      <Image src="/supabase-icon.svg" width={25} height={25} alt="supabase" />
    </a>
  );
}
