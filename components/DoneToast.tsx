
interface DoneToastProps {
  visible: boolean;
}

export const DoneToast: React.FC<DoneToastProps> = ({ visible }) => {
  return (
    <div
      className={`
        fixed bottom-6 right-6 z-[9999]
        flex items-center gap-2.5
        px-4 py-3
        rounded-xl
        bg-card text-card-foreground
        border border-border
        shadow-lg
        pointer-events-none
        text-sm font-medium
        transition-all duration-300 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 flex-shrink-0">
        <svg
          width="11"
          height="11"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 6.5L5.2 9.5L11 3.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      Done
    </div>
  );
};