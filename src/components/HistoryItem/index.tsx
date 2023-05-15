import React from "react"

interface HistoryItemProps {
  mainContent: string
  subContent: string
  time: string
  win: boolean
}

const HistoryItem: React.FC<HistoryItemProps> = ({ mainContent, subContent, time, win }) => {
  return (
    <div className="relative w-full flex items-center gap-9 py-3 pr-[100px] px-4 bg-white rounded-md">
      <img src="/images/small-icon.png" className="w-14 h-14" />
      <div className="flex gap-2 text-2xl">
        <span>{mainContent}</span>
        <span className={`${win ? "text-[#7DD955]" : "text-[#E33030]"}`}>{subContent}</span>
      </div>
      <span className="absolute right-5 bottom-1 text-xs">{time}</span>
    </div>
  )
}

export default HistoryItem