    "use client"

    import { useEffect } from "react"
    import { createClient } from "@/utils/supabase/client"
    import { useRouter } from "next/navigation"

    export default function ConfirmPage() {
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        async function run() {
        const { error } = await supabase.auth.exchangeCodeForSession(
            window.location.href
        )

        if (error) {
            console.error(error)
            router.push("/error")
            return
        }

        router.push("/")
        }

        run()
    }, [])

    return (
        <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Confirming your session…</p>
        </div>
    )
    }
