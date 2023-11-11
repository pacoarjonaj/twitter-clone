import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// evitamos que cachee de forma estática la ruta
// siempre se ejecuta en el servidor
export const dynamic = 'force-dynamic'

export async function GET (request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const supabase = createRouteHandlerClient({ cookies })
        // obtenemos la sesión del usuario mediante el código que nos devuelve en la url
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(requestUrl.origin)
} 