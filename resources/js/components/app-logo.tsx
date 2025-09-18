

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-red-600 text-white">
                <span className="text-xs font-bold">📹</span>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">KILANG PERTAMINA</span>
                <span className="truncate text-xs text-muted-foreground">CCTV Monitoring</span>
            </div>
        </>
    );
}
