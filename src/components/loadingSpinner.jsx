export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center h-full w-full">
      <div className="relative">
        {/* Main spinner - green incomplete circle */}
        <div className="w-20 h-20 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        
        {/* Optional: Add a subtle glow effect */}
        <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-400 rounded-full animate-spin opacity-50 blur-sm"></div>
      </div>
    </div>
    )
}